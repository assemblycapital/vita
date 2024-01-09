import Urbit from '@urbit/http-api';
import React, { createContext, useEffect, useState } from 'react';
import { scryCharges } from '@urbit/api';
import { BulkMetrics, ChargeUpdateInitial, Charges, DeskMetrics, ShipsByDeskHistory, ShipsByDeskHistoryMoment, hexColorFromPatUxString } from '../lib/lib';

export interface GlobalContext {
  desks: Array<string> | null;
  metrics: DeskMetrics;
  bulkMetrics: BulkMetrics | null;
  charges: Charges;
  isCreatingApp: boolean;
  setIsCreatingApp: (a:boolean) => any;
  loadCharges: () => void;
  loadMetrics: () => void;
  removeDeskFromLocal: (deskName: string) => void;
  contextPoke: (params: any) => any,
}
const globalContextBunt: GlobalContext = {
  desks: null,
  metrics: {},
  bulkMetrics: null,
  charges: {},
  isCreatingApp: false,
  setIsCreatingApp: () => { },
  loadCharges: () => { },
  loadMetrics: () => { },
  removeDeskFromLocal: (deskName: string) => { },
  contextPoke: (params: any) => { },
};

export const GlobalStateContext = createContext<GlobalContext>(globalContextBunt);

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [desks, setDesks] = useState<Array<string> | null>(null);
  const [metrics, setMetrics] = useState<DeskMetrics>({});
  const [bulkMetrics, setBulkMetrics] = useState<BulkMetrics | null>(null);
  const [charges, setCharges] = useState<Charges>({});
  const [isCreatingApp, setIsCreatingApp] = useState(false);



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
      scryDeployDesks();
      loadMetrics();
      loadCharges();
      loadBulkMetrics();
    });
  }, []);


  function handleDesksUpdate(data: any) {
    console.log('got update', data)
    const desks = 'desks'
    if (data[desks] !== undefined) {
      const newDesks: Array<string> = data[desks]
      setDesks(newDesks);
    }

    setIsCreatingApp(false);
  }


  async function scryDeployDesks() {
    api.scry<any>({
      app: 'vita-deploy',
      path: '/desks',
    }).then((result) => {
      const newDesks: Array<string> = result['desks']
      setDesks(newDesks);
    });
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
        let newMetrics = { ...metrics};

        for (let i = 0; i < result.length; i++) {
          const row = result[i];
          newMetrics[row.desk] = { downloads: row.downloads, activity: row.activity };
        }
        setMetrics(newMetrics);

      });
    });

  }

  async function loadCharges() {
    const loadedCharges: Charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;

    console.log('loaded charges', loadedCharges)

    let newCharges = { ...charges};
    let keys = Object.keys(loadedCharges);

    for (let i = 0; i < keys.length; i++) {
      const deskName = keys[i];

      let charge = loadedCharges[deskName];
      charge.color = hexColorFromPatUxString(charge.color);

      newCharges[deskName] = charge;
    }

    setCharges(newCharges);
  }

  function removeDeskFromLocal(deskName: string) {
    if (!desks) return;
    const index = desks.indexOf(deskName);
  
    if (index === -1) return;
  
    let newDesks = [...desks];
  
    newDesks.splice(index, 1);
  
    setDesks(newDesks);
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
      const date = new Date(entry['time'] * 1000); // Assuming the timestamp is in seconds

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

    let sortedPrunedDataSet = Array.from(maxPerDay.values())
    sortedPrunedDataSet.sort((a, b) => a.time - b.time);

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

  const value: GlobalContext = {
    desks: desks,
    metrics: metrics,
    bulkMetrics: bulkMetrics, 
    charges: charges, 
    isCreatingApp: isCreatingApp,
    setIsCreatingApp: setIsCreatingApp,
    loadCharges, 
    loadMetrics, 
    removeDeskFromLocal, 
    contextPoke
    };
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider >
  );
};


