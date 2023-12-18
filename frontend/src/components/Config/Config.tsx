import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams, useNavigate } from 'react-router-dom';
import './Config.css';
import { Footer } from '../Footer';
import { GlobalStateContext } from '../Global';
import { ConfigUploadFrontend } from './ConfigUploadFrontend';
import { ConfigDocketForm } from './ConfigDocketForm';
import { ConfigHrefForm } from './ConfigHrefForm';
import { loadDeskDownloads } from '../../lib/lib';
import { AppTile } from '../misc/AppTile';

export function Config() {
  const { subdirectory } = useParams()
  const navigate = useNavigate();
  const [downloaders, setDownloaders] = useState<string[]>([]);

  const { desks, removeDeskFromLocal, contextPoke } = useContext(GlobalStateContext);

  const deskName = subdirectory
  if (!deskName) {
    return (
      <div>oops, nothing here</div>
    )
  }


  useEffect(() => {

    async function init() {

      if (!deskName) return;
      let res = await loadDeskDownloads(deskName);
      if (!res) return;
      setDownloaders(res);
    }

    init()
  }, []);

  const hasDesk = desks.indexOf(deskName) > -1


  if (!hasDesk) {
    return (
      <div>
        <Link to="/"> home</Link>
        {/* todo this displays initially on load */}
        <div>oops, nothing here</div>
      </div>
    )
  }

  function deleteApp(deskName: string) {

    console.log('delete app', deskName)
    contextPoke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        'delete-app': deskName
      },
    });
  }

  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / %{deskName}</h1>
      <hr />
      <div>
        <h3>edit app tile</h3>
        {/* <AppTile deskName={deskName} /> */}
        <ConfigDocketForm deskName={deskName} />
      </div>
      <hr />

      <ConfigUploadFrontend deskName={deskName} />

      <hr />

      <ConfigHrefForm deskName={deskName} />
      <hr />
      <form>
        <button onClick={(e) => {
          e.preventDefault();
          let confirmed = confirm(`Are you sure you want to delete %${deskName}? The desk will stil exist, but it will be unpublished and uninstalled.`)
          if (!confirmed) return;

          deleteApp(deskName);
          removeDeskFromLocal(deskName);
          // redirect to home
          navigate('/');

        }}>
          delete %{deskName}
        </button>
      </form>

      <hr />
      <div>
        <h5
          style={{
            margin: '10px 0',
          }}
        >
          downloaders
        </h5>
        <div
          style={{
            fontSize: '0.8rem',
          }}
        >
          {downloaders.length === 0 ? (
            <div>no one yet!</div>
          ) : (
            downloaders.map((downloader: string) => {
              return (
                <div key={downloader}
                  style={{
                    display: 'inline-block',
                    margin: '0 5px',
                  }}
                >
                  {downloader}{', '}
                </div>
              )
            })
          )}

        </div>
      </div>


      <Footer />
    </div>
  )

}