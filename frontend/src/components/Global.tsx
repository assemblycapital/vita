import Urbit from '@urbit/http-api';
import React, { createContext, useEffect, useState } from 'react';
import { scryCharges } from '@urbit/api';


// export interface Desk {
//   desk: string;
//   metrics: DeskMetrics | null;
//   charge: Charge | null;
// }
// export type Desks = {
//   [key: string]: Desk;
// };

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
    "glob-reference": GlobReference;
  }
}

export interface DocketHrefSite {
  site: string;
}


export interface GlobReference {
  hash: string;
  location: GlobLocation;
}

export type GlobLocation = GlobLocationHttp | GlobLocationAmes;
export interface GlobLocationHttp {
  http: string;
}
export interface GlobLocationAmes {
  ames: string;
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

export type DeskMetrics = {
  [key: string]: { downloads: number; activity: number }
};
export interface BulkMetrics {
  downloadsCsv: string;
  activityCsv: string;
}


export interface GlobalState {
  desks: Array<string>;
  metrics: DeskMetrics;
  charges: Charges;
}

const buntGlobalState = {
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

    init().then(() => {
      loadMetrics();
      loadCharges();
      loadBulkMetrics();
    });
  }, []);


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

  function handleSub(data: any) {
    console.log('got update', data)
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

  function hexColorFromPatUxString(uxString: string) {
    return "#" + uxString.slice(2).replace(/\./g, "").padStart(6, "0");
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

  async function loadBulkMetrics() {

    let newBulkMetrics: BulkMetrics = { downloadsCsv: '', activityCsv: '' };
    await fetch('/~/scry/vita/downloads.csv')
      .then(response => {
        if (!response.ok) throw new Error();
        return response.text();
      })
      .then(data => {
        newBulkMetrics.downloadsCsv = data;
      })
      .catch(error => {
        console.error(error);
      });

    fetch('/~/scry/vita/activity.csv')
      .then(response => {
        if (!response.ok) throw new Error();
        return response.text();
      })
      .then(data => {
        newBulkMetrics.activityCsv = data;
        setBulkMetrics(newBulkMetrics);
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

export async function loadDeskDownloads(desk: string) {

  let response: string | void = await fetch(`/~/scry/vita/json/downloads/latest/${desk}.json`)
    .then(response => {
      if (!response.ok) throw new Error();
      return response.text()
    })
    .then(data => {
      // console.log('deskdownloads response', data)
      return data
    })
    .catch(error => {
      console.error(error);
    });

  if (!response) return;
  return JSON.parse(response);
}
