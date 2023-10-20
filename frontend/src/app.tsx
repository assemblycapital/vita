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
    <main className="flex p-3">
      <div className="">
        <a href="/apps/vita" className="text-blue-500 underline"> &lt;- app metrics </a>
        <h1 className="text-3xl font-bold mb-3">vita app deployer</h1>
        <div className="flex flex-col gap-3">
          <div className="border border-black p-3">
            <div>new desk</div>

            {/* text input and submit button onclick=newDesk function */}

            <div className="flex flex-row gap-2">

              <input type="text" id="new-desk-name"
                className="border border-black"
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
              <div key={desk.desk}
                className="border border-black m-1 p-1 flex flex-col">
                <div className="font-bold">
                  {'%'}{desk.desk}
                </div>
                <div className="flex flex-row gap-1">
                  <div> exists in clay: </div>
                  <div>
                    {desk.existsInClay ? 'yes' : 'no'}
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  {!desk.isInstalled &&
                    <div>
                      <button className="border border-black p-1"
                        onClick={() => {
                          //todo install
                        }}
                      >
                        install
                      </button>
                    </div>
                  }

                  {desk.isPublished ?
                    <button className="border border-black p-1"
                      onClick={() => {
                        //todo unpublish
                      }}
                    >
                      unpublish
                    </button>
                    :
                    <div>
                      <button className="border border-black p-1"
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
