import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams } from 'react-router-dom';
import './Config.css';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Config() {
  const { subdirectory } = useParams()

  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / %{subdirectory}</h1>
      <hr />
      <div>
        <h3>edit app tile</h3>
        <form>
          <label htmlFor="app-title">title</label>
          <input type="text" id="app-title"></input>

          <label htmlFor="app-description">description</label>
          <input type="text" id="app-description"></input>

          <button>submit</button>
        </form>
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
    </div>
  )

}