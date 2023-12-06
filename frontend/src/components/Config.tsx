import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams, useNavigate } from 'react-router-dom';
import './Config.css';
import { Footer } from './Footer';
import { GlobalStateContext } from './Global';
import { ConfigDocketForm } from './ConfigDocketForm';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Config() {
  const { subdirectory } = useParams()
  const navigate = useNavigate();


  const { loadCharges, removeDeskFromLocal } = useContext(GlobalStateContext);

  useEffect(() => {
    loadCharges();
  }, []);

  const deskName = subdirectory
  if (!deskName) {
    return (
      <div>oops, nothing here</div>
    )
  }

  const { desks } = useContext(GlobalStateContext);

  const desk = desks[deskName];


  if (!desk) {
    return (
      <div>
        <Link to="/"> home</Link>
        {/* todo this displays initially on load */}
        <div>oops, nothing here</div>
      </div>
    )
  }

  const docket = desk.charge;

  function deleteApp(deskName: string) {

    console.log('delete app', deskName)
    api.poke({
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
      <div>
        <h3>upload frontend</h3>
        <form>
          <input type="file" id="app-files"></input>
          <button>upload</button>
        </form>
      </div>
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