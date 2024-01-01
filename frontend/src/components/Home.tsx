import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from './Global';
import { Link } from 'react-router-dom';
import './Home.css';
import { Footer } from './Footer';
import { LoadingSpinner } from './misc/LoadingSpinner';
import { IToast, Toast } from './misc/Toast';

export function Home() {

  const { desks, metrics, contextPoke, isCreatingApp, setIsCreatingApp } = useContext(GlobalStateContext);


  const [toast, setToast] = useState<IToast>({ text: '', time: 0 });
  function showToast(text: string) {
    let time = 3000;
    if (toast.time <= 3000) {
      time++;
    } else if (toast.time > 3000) {
      time--;
    }
  
    setToast({ text: text, time: time});
  }

  function isValidDeskName(deskName: string) {
    if (deskName.length < 4) return false;
    return /^[a-z][a-z0-9-]*$/.test(deskName);
  }
  const invalidDeskNames = ['base', 'landscape', 'groups', 'talk', 'realm', 'vita', 'lemur', 'pals', 'radio', 'rumors', 'trill']
  function newDesk(deskName: string) {
    if (invalidDeskNames.includes(deskName)) {
      showToast(`%${deskName} is reserved`);
      return;
    }
    if (!isValidDeskName(deskName)) {
      showToast(`invalid desk name`);
      return;
    }
    contextPoke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        'create-app': deskName
      },
    });
    setIsCreatingApp(true);
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
              autoComplete='off'

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
          
          <Toast {...toast} />
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
              {desks.length == 0 &&
                <tr>
                  <td>
                    <LoadingSpinner />
                  </td>
                  <td>
                    <LoadingSpinner />
                  </td>
                  <td>
                    <LoadingSpinner />
                  </td>
                </tr>
              }
              {desks.map((desk: string) => {

                const mets = metrics[desk]
                return (
                  <tr key={desk} >
                    <td>
                      <Link to={`/config/${desk}`} >
                        {'%'}{desk}
                      </Link>
                    </td>
                    <td>
                      {mets ? mets.downloads : '-'}
                    </td>
                    <td>
                      {mets && mets.activity > 0 ? mets.activity : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>


        <div>
          {isCreatingApp && <LoadingSpinner />}
        </div>

        <div>
          <p>
            <Link to="/metrics"> /metrics </Link>
          </p>
        </div>

      </div>

      <Footer />
    </div >
  );
}
