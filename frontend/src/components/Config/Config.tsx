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
import { LoadingSpinner } from '../misc/LoadingSpinner';

export function Config() {
  const { subdirectory } = useParams()
  const navigate = useNavigate();
  const [downloaders, setDownloaders] = useState<string[]>([]);
  const [hasLoadeddownloaders, setHasLoadedDownloaders] = useState(false);

  const { desks, removeDeskFromLocal, contextPoke, loadCharges } = useContext(GlobalStateContext);
  useEffect(() => {

    async function init() {

      if (!subdirectory) return;
      loadCharges();
      let res = await loadDeskDownloads(subdirectory);
      if (!res) return;
      setDownloaders(res);
      setHasLoadedDownloaders(true);
    }

    init()
  }, [subdirectory]);



  if (!subdirectory) {
    return (
      <div>
        <Link to="/"> home</Link>
        <p>invalid url</p>
      </div>
    )
  }

  const header = <div>
    <Link to="/"> home</Link>
    <h1>vita / %{subdirectory}</h1>
  </div>

  const deskName = subdirectory
  if (!desks) {
    return (
      <div>
        {header}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <LoadingSpinner />
          loading...
        </div>
      </div>
    )
  }

  const hasDesk = desks.indexOf(deskName) > -1
  if (!hasDesk && desks.length !== 0) {
    return (
      <div>
      {header}
      <hr />
        <p>could not find %{deskName}</p>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h1
          style={{
            display: 'inline-block',
            margin: '0 1rem 0 0',
          }}
        >
          vita / %{subdirectory}
        </h1>
        <AppTile deskName={deskName} />
      </div>
      <hr />
      <div>
        <h3>edit app tile</h3>
        <ConfigDocketForm deskName={deskName} />
      </div>
      <hr />

      <ConfigUploadFrontend deskName={deskName} />

      <hr />

      <ConfigHrefForm deskName={deskName} />
      <hr />
      <form>
        <button
          style={{
            margin: '10px 0',
          }}
          onClick={(e) => {
            e.preventDefault();
            let confirmed = confirm(`Are you sure you want to delete %${deskName}? The desk will stil exist, but it will be unpublished and uninstalled.`)
            if (!confirmed) return;

            deleteApp(deskName);
            removeDeskFromLocal(deskName);
            // redirect to home
            navigate('/');
          }}
        >
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
            margin:'1rem 0',
          }}
        >
          {downloaders.length === 0 ? (

            <div>
              {hasLoadeddownloaders ? (
                'no one yet... invite a friend!' 
                ):(
                  <div
                  style={{
                    display: 'flex',
                    gap:'1rem',
                  }}
                  >
                  <LoadingSpinner />
                  loading...
                  </div>
              )}
            </div>
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
          <Link to="/metrics"> /metrics </Link>
      </div>


      <Footer />
    </div>
  )

}