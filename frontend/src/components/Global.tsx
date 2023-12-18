import Urbit from '@urbit/http-api';
import React, { createContext, useEffect, useState } from 'react';
import { scryCharges } from '@urbit/api';
import { BulkMetrics, ChargeUpdateInitial, Charges, ChartBulkMetrics, DeskMetrics, ShipsByDeskHistory, ShipsByDeskHistoryMoment, hexColorFromPatUxString } from '../lib/lib';



export interface GlobalState {
  desks: Array<string>;
  metrics: DeskMetrics;
  charges: Charges;
}

export const buntGlobalState = {
  desks: [],
  metrics: {},
  charges: {},
}

export interface GlobalContext {
  desks: Array<string>;
  metrics: DeskMetrics;
  bulkMetrics: BulkMetrics | null;
  charges: Charges;
  loadCharges: () => void;
  loadMetrics: () => void;
  removeDeskFromLocal: (deskName: string) => void;
  contextPoke: (params: any) => any,
}
const globalContextBunt: GlobalContext = {
  desks: [],
  metrics: {},
  bulkMetrics: null,
  charges: {},
  loadCharges: () => { },
  loadMetrics: () => { },
  removeDeskFromLocal: (deskName: string) => { },
  contextPoke: (params: any) => { },
};

export const GlobalStateContext = createContext<GlobalContext>(globalContextBunt);

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>(buntGlobalState);
  const [bulkMetrics, setBulkMetrics] = useState<BulkMetrics | null>(null);


  useEffect(() => {
    async function init() {

      api.subscribe({
        app: "vita-deploy",
        path: "/frontend",
        event: handleDesksUpdate,
        quit: () => alert("lost connection to your urbit. please refresh"),
        err: (e) => console.log("urbit http-api error:", e),
      }).then((subscriptionId) => {
        //
        window.addEventListener("beforeunload", () => {
          api.unsubscribe(subscriptionId);
          api.delete();
        });
      });
    }

    init().then(() => {
      loadMetrics();
      loadCharges();
      loadBulkMetrics();
    });
  }, []);


  function handleDesksUpdate(data: any) {
    // console.log('got update', data)
    const desks = 'desks'
    if (data[desks] !== undefined) {
      const newDesks: Array<string> = data[desks]
      let newState = { ...state };

      for (let i = 0; i < newDesks.length; i++) {
        const desk = newDesks[i];
        if (state.desks.indexOf(desk) === -1) {
          newState.desks.push(desk);
        }
      }
      setState(newState);
    }
  }


  async function loadMetrics() {

    api.poke({
      app: "vita",
      mark: "vita-action",
      json: {
        'get-all': null
      },
    }).then((result) => {

      api.scry<any>({
        app: 'vita',
        path: '/json/metrics/summary',
      }).then((result) => {
        console.log('metrics scry result ', result);
        let newState = { ...state };

        for (let i = 0; i < result.length; i++) {
          const row = result[i];
          newState.metrics[row.desk] = { downloads: row.downloads, activity: row.activity };
        }
        setState(newState);

      });
    });

  }

  async function loadCharges() {
    const charges: Charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;

    console.log('loaded charges', charges)

    let newState = { ...state };
    let keys = Object.keys(charges);
    for (let i = 0; i < keys.length; i++) {
      const deskName = keys[i];

      let charge = charges[deskName];
      charge.color = hexColorFromPatUxString(charge.color);
      charges[deskName] = charge;

      newState.charges[deskName] = charges[deskName];
    }

    setState(newState);
  }

  function removeDeskFromLocal(deskName: string) {
    let newState = { ...state };
    let i = state.desks.indexOf(deskName)

    if (i === -1) return;

    newState.desks.splice(i, 1);
    setState(newState);
  }

  async function contextPoke(params: any) {

    console.log("contextPoke", params)
    let result = api.poke({
      app: params.app,
      mark: params.mark,
      json: params.json,
    }).then((result) => {
      return result;
    })

    return result;

  }


  function pruneBulkMetricsHistory(dataSet: ShipsByDeskHistory): ShipsByDeskHistory {
    // Create a map to hold the maximum entry per day
    const maxPerDay: Map<string, ShipsByDeskHistoryMoment> = new Map();

    dataSet.forEach(entry => {
      // Convert the timestamp to a Date object
      const date = new Date(entry.time * 1000); // Assuming the timestamp is in seconds
      // Normalize to midnight
      date.setHours(0, 0, 0, 0);

      // Convert back to a timestamp for consistency
      const normalizedTimestamp = Math.floor(date.getTime() / 1000);
      const dateKey = date.toISOString().split('T')[0]; // Key by date string

      // Check if this is the max for the day or if the day hasn't been seen yet
      const currentMax = maxPerDay.get(dateKey);
      if (!currentMax || entry.size > currentMax.size) {
        maxPerDay.set(dateKey, { ...entry, time: normalizedTimestamp });
      }
    });


    const sortedPrunedDataSet = Array.from(maxPerDay.values()).sort((a, b) => a.time - b.time);
    // Convert the map values to an array
    return sortedPrunedDataSet;
  }

  async function loadBulkMetrics() {
    await fetch('/~/scry/vita/metrics.json')
      .then(response => {
        if (!response.ok) throw new Error();
        return response.text();
      })
      .then(data => {
        let bm: BulkMetrics = JSON.parse(data);

        for (let i = 0; i < bm.length; i++) {
          let row = bm[i];
          row.metrics.downloads.history = pruneBulkMetricsHistory(row.metrics.downloads.history);
          row.metrics.activity.history = pruneBulkMetricsHistory(row.metrics.activity.history);

        }
        setBulkMetrics(bm);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const value: GlobalContext = { desks: state.desks, metrics: state.metrics, bulkMetrics: bulkMetrics, charges: state.charges, loadCharges, loadMetrics, removeDeskFromLocal, contextPoke };
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider >
  );
};


