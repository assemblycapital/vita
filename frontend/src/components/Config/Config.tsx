import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams, useNavigate } from 'react-router-dom';
import './Config.css';
import { Footer } from '../Footer';
import { GlobalStateContext } from '../Global';
import { ConfigUploadFrontend } from './ConfigUploadFrontend';
import { ConfigDocketForm } from './ConfigDocketForm';
import { ConfigHrefForm } from './ConfigHrefForm';

export function Config() {
  const { subdirectory } = useParams()
  const navigate = useNavigate();


  const { desks, removeDeskFromLocal, charges, contextPoke } = useContext(GlobalStateContext);

  const deskName = subdirectory
  if (!deskName) {
    return (
      <div>oops, nothing here</div>
    )
  }


  // useEffect(() => {

  //   console.log('config desks', desks)
  // }, [desks]);

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

  const docket = charges[deskName];

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


      <Footer />
    </div>
  )

}