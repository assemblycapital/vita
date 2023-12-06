import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams } from 'react-router-dom';
import './Config.css';
import { GlobalStateContext } from './Global';


// deskname string is passed in from the parent component

export function ConfigDocketForm({ deskName }: { deskName: string }) {

  const { desks, charges, loadCharges } = useContext(GlobalStateContext);

  useEffect(() => {
    loadCharges();
  }, [desks, charges, deskName]);


  if (!deskName) {
    return (
      <div>
      </div>
    )
  }


  if (charges[deskName] === undefined) {
    return (
      <div>
        <div>loading %{deskName} docket...</div>
      </div>
    )
  }
  const docket = charges[deskName];

  return (
    <form>
      <div>
        <div>
          <label htmlFor="app-title">title</label>
          <input type="text" id="app-title"
            defaultValue={docket.title}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="app-info">info</label>
          <input type="text" id="app-info"
            defaultValue={docket.info}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="app-color">color</label>
          <input type="text" id="app-color"
            defaultValue={docket.color}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="app-website">website</label>
          <input type="text" id="app-website"
            defaultValue={docket.website}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="app-license">license</label>
          <input type="text" id="app-license"
            defaultValue={docket.license}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="app-version">version</label>
          <input type="text" id="app-version"
            defaultValue={docket.version}
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="app-image">image</label>
          <input type="text" id="app-image"
            defaultValue={docket.image ? docket.image : ''}
          />
        </div>
      </div>

      <br />
      <button>submit</button>
    </form>
  )
}