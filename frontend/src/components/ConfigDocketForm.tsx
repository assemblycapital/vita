import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import './Config.css';
import { Charge, Docket, GlobalStateContext } from './Global';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

function setDocket(deskName: string, docket: Docket) {
  docket.color = docket.color.slice(1);

  api.poke({
    app: "vita-deploy",
    mark: "vita-deploy-action",
    json: {
      'set-docket': {
        "desk-name": deskName,
        docket: docket
      }
    },
  });
  console.log('set docket', deskName, docket)
}


export function ConfigDocketForm({ deskName }: { deskName: string }) {

  const [showExtraFields, setShowExtraFields] = useState(false);

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
          <label htmlFor="app-color">color</label>
          <input type="text" id="app-color"
            defaultValue={docket.color}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="app-image">image-url</label>
          <input type="text" id="app-image"
            defaultValue={docket.image ? docket.image : ''}
          />
        </div>
      </div>

      <button
        style={{
          margin: '0 1rem',
        }}
        onClick={(e) => {
          e.preventDefault();
          setShowExtraFields(!showExtraFields)
        }}>
        {showExtraFields ? '-' : '+'}
      </button>

      {showExtraFields &&
        <>
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
              <label htmlFor="app-website">website</label>
              <input type="text" id="app-website"
                defaultValue={docket.website}
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
        </>}

      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          const title = (document.getElementById('app-title') as HTMLInputElement).value;
          const color = (document.getElementById('app-color') as HTMLInputElement).value;
          const image = (document.getElementById('app-image') as HTMLInputElement).value;

          let info;
          let website;
          let license;
          let version;
          if (showExtraFields) {
            info = (document.getElementById('app-info') as HTMLInputElement).value;
            website = (document.getElementById('app-website') as HTMLInputElement).value;
            license = (document.getElementById('app-license') as HTMLInputElement).value;
            version = (document.getElementById('app-version') as HTMLInputElement).value;
          } else {
            info = docket.info
            website = docket.website
            license = docket.license
            version = docket.version
          }

          const newDocket: Docket = {
            title: title, info: info,
            // color: "ff", //TODO remove dots and `0x` prefix
            color: color,
            website: website, license: license, version: version,
            image: image,
            href: docket.href
          }

          setDocket(deskName, newDocket)
        }}
      >
        submit
      </button>
    </form >
  )
}