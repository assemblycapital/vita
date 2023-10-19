import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { AppTile } from './components/AppTile';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  // @ts-ignore
  const [apps, setApps] = useState<Charges>();

  useEffect(() => {
    async function init() {
      // @ts-ignore
      const charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;
      setApps(charges);

      api.subscribe({
        app: "vita-deploy",
        path: "/frontend",
        event: handleSub,
        quit: () => alert("lost connection to your urbit. please refresh"),
        err: (e) => console.log("error", e),
      }).then((subscriptionId) => {
        //
        window.addEventListener("beforeunload", () => {
          api.unsubscribe(subscriptionId);
          api.delete();
        });
      });
    }

    init();
  }, []);

  function handleSub(data: any) {
    console.log('got update', data)
  }

  function newDesk(deskName: string) {
    api.poke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        newDesk: {
          deskName: deskName
        },
      },
    });
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-6 py-20">
        <a href="/apps/vita" className="text-blue-500 underline"> &lt;- app metrics </a>
        <h1 className="text-3xl font-bold">vita app deployer</h1>
        <p>TODO</p>


      </div>
    </main>
  );
}
