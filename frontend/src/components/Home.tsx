import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Desk, GlobalState, GlobalStateContext } from './Global';
import { Link } from 'react-router-dom';
import './Home.css';
import { Footer } from './Footer';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Home() {

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
    <div className="vita-body">
      <h1>vita</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
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
          <table
          >
            <thead>
              <tr>
                <th>desk</th>
                <th>downloads</th>
                <th>activity</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(desks).map((deskName) => {
                const desk = desks[deskName];

                return (
                  <tr key={desk.desk} >
                    <td>
                      <Link to={`/config/${desk.desk}`} >
                        {'%'}{desk.desk}
                      </Link>
                    </td>
                    <td>
                      {desk.metrics ? desk.metrics.downloads : '-'}
                    </td>
                    <td>
                      {(() => {
                        if (desk.metrics) {
                          return (desk.metrics.activity > 0) ? desk.metrics.activity : '-';
                        } else {
                          return '-';
                        }
                      })()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>


      </div>

      <Footer />
    </div >
  );
}