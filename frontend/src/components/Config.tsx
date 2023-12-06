import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams } from 'react-router-dom';
import './Config.css';
import { Footer } from './Footer';
import { GlobalStateContext } from './Global';
import { ConfigDocketForm } from './ConfigDocketForm';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Config() {
  const { subdirectory } = useParams()

  const { loadCharges } = useContext(GlobalStateContext);

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

  if (!docket) {
    return (
      <div>
        <Link to="/"> home</Link>
        <div>loading %{deskName} docket...</div>
      </div>
    )
  }

  console.log("config desk", desk)

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
        <button>delete %{subdirectory}</button>
      </form>
      <Footer />
    </div>
  )

}