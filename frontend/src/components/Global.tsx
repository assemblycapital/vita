import Urbit from '@urbit/http-api';
import React, { createContext, useEffect, useState } from 'react';

export interface DeskMetrics {
  downloads: number;
  downloadsShips: Array<string> | null;
  activity: number;
  activityShips: Array<string> | null;
}
export interface Desk {
  desk: string;
  metrics: DeskMetrics | null;
}
export type Desks = {
  [key: string]: Desk;
};

export interface GlobalState {
  desks: Desks;
}

const buntGlobalState = {
  desks: {},
}

export const GlobalStateContext = createContext<GlobalState>(buntGlobalState);

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>(buntGlobalState);

  useEffect(() => {
    async function init() {

      api.subscribe({
        app: "vita-deploy",
        path: "/frontend",
        event: handleSub,
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

    api.poke({
      app: "vita",
      mark: "vita-action",
      json: {
        'get-all': null
      },
    });

    api.scry<any>({
      app: 'vita',
      path: '/json/metrics/summary',
    }).then((result) => {
      console.log('metrics scry result ', result);
      let newState = { ...state };

      for (let i = 0; i < result.length; i++) {
        const row = result[i];
        // let alreadyDesk = newState.desks[row.desk];
        // let alreadyDeskMetrics = alreadyDesk ? alreadyDesk.metrics : null;

        // if no desk, create desk
        let alreadyDesk = newState.desks[row.desk];
        if (!alreadyDesk) {
          alreadyDesk = {
            desk: row.desk,
            metrics: null
          }
        }

        // if no metrics, create metrics
        if (!alreadyDesk.metrics) {
          alreadyDesk.metrics = {
            downloads: 0,
            downloadsShips: null,
            activity: 0,
            activityShips: null,
          }
        }

        // set downloads and activity
        alreadyDesk.metrics!.downloads = row.downloads;
        alreadyDesk.metrics!.activity = row.activity;

        newState.desks[row.desk] = alreadyDesk;

      }
      setState(newState);


    });

    init();
  }, []);

  useEffect(() => {
  }, []);

  function handleSub(data: any) {
    console.log('got update', data)
    const desks = 'desks'
    if (data[desks] !== undefined) {
      const newDesks: Array<string> = data[desks]
      let newState = { ...state };

      for (let i = 0; i < newDesks.length; i++) {
        const desk = newDesks[i];
        if (state.desks[desk]) continue;
        newState.desks[desk] = {
          desk: desk,
          metrics: null
        }
      }
      setState(newState);
    }
  }


  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};
