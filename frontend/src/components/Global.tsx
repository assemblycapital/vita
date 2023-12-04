import Urbit from '@urbit/http-api';
import React, { createContext, useEffect, useState } from 'react';
import { scryCharges } from '@urbit/api';

export interface DeskMetrics {
  downloads: number;
  downloadsShips: Array<string> | null;
  activity: number;
  activityShips: Array<string> | null;
}
export interface Desk {
  desk: string;
  metrics: DeskMetrics | null;
  charge: Charge | null;
}
export type Desks = {
  [key: string]: Desk;
};

export type Charges = {
  [key: string]: Charge;
};
export interface ChargeUpdateInitial {
  initial: {
    [desk: string]: Charge;
  }
}

export type DocketHref = DocketHrefSite | DocketHrefGlob;

export interface DocketHrefGlob {
  glob: {
    base: string;
  }
}

export interface DocketHrefSite {
  site: string;
}

export type Chad = HungChad | GlobChad | SiteChad | InstallChad | SuspendChad;

export interface HungChad {
  hung: string;
}

export interface GlobChad {
  glob: null;
}
export interface SiteChad {
  site: null;
}
export interface InstallChad {
  install: null;

}
export interface SuspendChad {
  suspend: null;
}

export interface Docket {
  title: string;
  info?: string;
  color: string;
  href: DocketHref;
  website: string;
  license: string;
  version: string;
  image?: string;
}

export interface Charge extends Docket {
  chad: Chad;
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
      const charges: Charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;
      console.log('charges', charges)
      let newState = { ...state };
      // if no desk, create desk
      let keys = Object.keys(charges);
      for (let i = 0; i < keys.length; i++) {
        const deskName = keys[i];
        let alreadyDesk = newState.desks[deskName];

        if (!alreadyDesk) {
          alreadyDesk = {
            desk: deskName,
            metrics: null,
            charge: null,
          }
        }

        alreadyDesk.charge = charges[deskName];


        newState.desks[deskName] = alreadyDesk;
      }

    }

    init();
  }, []);

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

        // if no desk, create desk
        let alreadyDesk = newState.desks[row.desk];
        if (!alreadyDesk) {
          alreadyDesk = {
            desk: row.desk,
            metrics: null,
            charge: null,
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
          metrics: null,
          charge: null,
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
