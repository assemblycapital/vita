import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { GlobalState, GlobalStateContext } from './Global';
import { Link } from 'react-router-dom';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Deployer() {

  const { desks } = useContext(GlobalStateContext);


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
    <div>
      <a href="/vita"> &lt;- app metrics </a>
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
            {desks.map((desk: string) => (
              <li key={desk} >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    padding: '0.5rem',
                    margin: '0.5rem 0'
                  }}
                >
                  <div>
                  </div>
                  <div>
                    <Link to={`/config/${desk}`} >
                      {'%'}{desk}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>


      </div>

    </div >
  );
}
