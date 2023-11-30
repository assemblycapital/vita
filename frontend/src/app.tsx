import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';

// a type of an array of {desk=string, existsinclay:boolean}
interface DeskMetadata {
  desk: string;
  existsInClay: boolean;
  isInstalled: boolean;
  isPublished: boolean;
}

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  // @ts-ignore
  const [desks, setDesks] = useState<Array<DeskMetadata>>();

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
    const allMetadata = 'all-metadata'
    if (data[allMetadata] !== undefined) {
      const newDesks: Array<DeskMetadata> = data[allMetadata]
      setDesks(newDesks);
    }
  }

  function fetchDeskMetadata(deskName: string) {
    api.poke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        'fetch-desk-metadata': deskName
      },
    });
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
        'new-desk': deskName
      },
    });

    //set timer to call fetchDeskMetadata
    setTimeout(() => {
      fetchDeskMetadata(deskName);
    }, 1000);

  }

  return (
    <main>
      <div>
        <a href="/apps/vita"> &lt;- app metrics </a>
        <h1>vita app deployer</h1>
        <div>
          <div>
            <div>new desk</div>

            {/* text input and submit button onclick=newDesk function */}

            <div>

              <input type="text" id="new-desk-name"

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
                create
              </button>
            </div>
          </div>


          <div>
            {/* created desks */}
            {desks?.map((desk: DeskMetadata) => (
              <div key={desk.desk} >
                <div>
                  {'%'}{desk.desk}
                </div>
                <div>
                  <div> exists in clay: </div>
                  <div>
                    {desk.existsInClay ? 'yes' : 'no'}
                  </div>
                </div>
                <div>
                  {!desk.isInstalled &&
                    <div>
                      <button
                        onClick={() => {
                          //todo install
                        }}
                      >
                        install
                      </button>
                    </div>
                  }

                  {desk.isPublished ?
                    <button
                      onClick={() => {
                        //todo unpublish
                      }}
                    >
                      unpublish
                    </button>
                    :
                    <div>
                      <button
                        onClick={() => {
                          //todo publish
                        }}
                      >
                        publish
                      </button>
                    </div>
                  }

                </div>
              </div>
            ))}
          </div>


        </div>

      </div >
    </main >
  );
}
