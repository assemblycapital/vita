

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
export type ChartBulkMetrics = Array<ChartBulkMetric>;
export type ChartBulkMetric = {
  [desk: string]: number;
  // edge case, deskname could be `time`.
  // should probably use uppercase `Time` for safety
  // TODO
  time: number;
};

export type BulkMetrics = Array<BulkMetric>;

export interface BulkMetric {
  desk: string;
  metrics: BulkMetricMetrics;
}

export interface BulkMetricMetrics {
  downloads: ShipsByDesk;
  activity: ShipsByDesk;
}

export interface ShipsByDesk {
  latest: Array<string>;
  cumulative: Array<string>;
  history: ShipsByDeskHistory;
}

export type ShipsByDeskHistory = Array<ShipsByDeskHistoryMoment>;
export interface ShipsByDeskHistoryMoment {
  time: number;
  size: number;
  set: null | Array<string>;
}


// 
// end types
// 

export function hexColorFromPatUxString(uxString: string) {
  return "#" + uxString.slice(2).replace(/\./g, "").padStart(6, "0");
}

export function processBulkMetrics(bulkMetrics: BulkMetrics): [ChartBulkMetrics, ChartBulkMetrics] {
  let activityMetrics: ChartBulkMetrics = [];
  let downloadMetrics: ChartBulkMetrics = [];

  // Create a set of all desks
  const allDesks = new Set<string>();
  bulkMetrics.forEach(bulkMetric => {
    allDesks.add(bulkMetric.desk);
  });

  bulkMetrics.forEach(bulkMetric => {
    bulkMetric.metrics.activity.history.forEach(historyMoment => {
      let metric = activityMetrics.find(m => m.time === historyMoment.time);
      if (!metric) {
        metric = { time: historyMoment.time };
        // @ts-ignore
        allDesks.forEach(desk => metric[desk] = 0); // Initialize all desks with zero
        activityMetrics.push(metric);
      }
      metric[bulkMetric.desk] = historyMoment.size;
    });

    bulkMetric.metrics.downloads.history.forEach(historyMoment => {
      let metric = downloadMetrics.find(m => m.time === historyMoment.time);
      if (!metric) {
        metric = { time: historyMoment.time };
        // @ts-ignore
        allDesks.forEach(desk => metric[desk] = 0); // Initialize all desks with zero
        downloadMetrics.push(metric);
      }
      metric[bulkMetric.desk] = historyMoment.size;
    });
  });

  activityMetrics.sort((a, b) => a.time - b.time);
  downloadMetrics.sort((a, b) => a.time - b.time);

  return [activityMetrics, downloadMetrics];
}


export async function loadDeskDownloads(desk: string) {

  let response: string | void = await fetch(`/~/scry/vita/json/downloads/latest/${desk}.json`)
    .then(response => {
      if (!response.ok) throw new Error();
      return response.text()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.error(error);
    });

  if (!response) return;
  return JSON.parse(response);
}
