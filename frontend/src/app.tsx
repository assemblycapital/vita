import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';

// a type of an array of {desk=string, existsinclay:boolean}
interface DeskMetadata {
  desk: string;
}

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  // @ts-ignore
  const [desks, setDesks] = useState<Array<string>>();

  useEffect(() => {
    async function init() {

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
    const desks = 'desks'
    if (data[desks] !== undefined) {
      const newDesks: Array<string> = data[desks]
      setDesks(newDesks);
    }
  }

  const invalidDeskNames = ['base', 'landscape', 'groups', 'talk', 'realm', 'vita', 'lemur', 'pals', 'radio', 'rumors', 'portal']
  function newDesk(deskName: string) {
    if (invalidDeskNames.includes(deskName)) {
      return;
    }
    api.poke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        'create-app': deskName
      },
    });

  }

  return (
    <main>
      <div>
        <a href="/apps/vita"> &lt;- app metrics </a>
        <h1>vita app deployer</h1>
        <div>
          <div>

            <div>

              <input type="text" id="new-desk-name"
                placeholder="unique-desk-name"

              />
              <button onClick={() => {
                const deskName = (document.getElementById('new-desk-name') as HTMLInputElement).value;

                let element = document.getElementById('new-desk-name') as HTMLInputElement;
                if (element) {
                  element.value = '';
                }

                newDesk(deskName)

              }}
              >
                create app
              </button>
            </div>
          </div>


          <div>
            <ul>
              {/* created desks */}
              {desks?.map((desk: string) => (
                <li key={desk} >
                  <div>
                    {'%'}{desk}
                  </div>
                  <div>
                    <a href="#">
                      edit app tile
                    </a>
                  </div>
                  <div>
                    <a href="#">
                      upload frontend
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>


        </div>

      </div >
    </main >
  );
}
