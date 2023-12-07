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


export function ConfigHrefForm({ deskName }: { deskName: string }) {

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


  const docketHasSite = 'site' in docket.href;

  const [selectedSite, setSelectedSite] = useState(docketHasSite);
  function handleSiteOrGlobChange(e: any) {
    let isSite = e.target.value === 'site'
    setSelectedSite(isSite)
  }

  const [isMinimized, setIsMinimized] = useState(true);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const initialIsGlobHttp = () => {
    if ('site' in docket.href) return false;
    let x = 'http' in docket.href.glob['glob-reference'].location;
    return x
  }

  const [isGlobHttp, setIsGlobHttp] = useState(initialIsGlobHttp);

  function globHttpDefaultValue() {
    const bunt = "http://example.com/file.glob";
    if ('site' in docket.href) return bunt;
    if (!('http' in docket.href.glob['glob-reference'].location)) {
      return bunt
    }
    return docket.href.glob['glob-reference'].location.http;
  }

  function globAmesDefaultValue() {
    //TODO
    return '~sampel-palnet'
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <div>href settings (advanced)</div>
        <button onClick={toggleMinimize}>
          {isMinimized ? '+' : '-'}
        </button>
      </div>

      {!isMinimized && (

        <div>
          <form>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <label>
                %site
                <input
                  type="radio"
                  name="href-site-or-glob"
                  value="site"
                  defaultChecked={docketHasSite}
                  onChange={handleSiteOrGlobChange}
                />
              </label>
              <label>
                %glob
                <input
                  type="radio"
                  name="href-site-or-glob"
                  value="glob"
                  defaultChecked={!docketHasSite}
                  onChange={handleSiteOrGlobChange}
                />
              </label>
            </div>
            <div>
              {selectedSite ?
                (
                  <div className="labeled-text">
                    <label>site</label>
                    <input
                      type="text"
                      name="app-site"
                      defaultValue={"site" in docket.href ? docket.href.site : ''}
                    />
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <div className="labeled-text">
                        <label>base</label>
                        <input
                          type="text"
                          name="app-glob-base"
                          defaultValue={"glob" in docket.href ? docket.href.glob.base : ''}
                        />
                      </div>
                      <div className="labeled-text">
                        <label> hash </label>
                        <input
                          type="text"
                          name="app-glob-ref-hash"
                          defaultValue={"glob" in docket.href ? docket.href.glob['glob-reference'].hash : ''}
                        />
                      </div>
                    </div>
                    <div
                      // http or ames
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1rem',
                      }}
                    >
                      <label>
                        %http
                        <input
                          type="radio"
                          name="glob-http-or-ames"
                          value="http"
                          defaultChecked={isGlobHttp}
                          onChange={(e: any) => {
                            setIsGlobHttp(e.target.value === 'http')
                          }}
                        />
                      </label>
                      <label>
                        %ames
                        <input
                          type="radio"
                          name="glob-http-or-ames"
                          value="ames"
                          defaultChecked={!isGlobHttp}
                          onChange={(e: any) => {
                            setIsGlobHttp(e.target.value === 'http')
                          }}
                        />
                      </label>
                    </div>

                    <div>

                      {isGlobHttp ?
                        (
                          <div>
                            {/* extra div prevents react from overoptimizing when isglobhttp changes
                                (causing the new defaultValue to not update) */}
                            <div className="labeled-text">
                              <label> glob url </label>
                              <input
                                type="text"
                                name="app-glob-ref-url"
                                defaultValue={globHttpDefaultValue()}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="labeled-text">
                            <label> host @p </label>
                            <input
                              type="text"

                              id="app-glob-ref-ship"
                              name="app-glob-ref-ship"
                              defaultValue={globAmesDefaultValue()}
                            />
                          </div>
                        )}
                    </div>

                  </div>
                )}

            </div>

            <br />
            <button
              onClick={(e) => {
                e.preventDefault();

                const newDocket: Docket = {
                  title: docket.title,
                  info: docket.info,
                  color: docket.color,
                  website: docket.website,
                  license: docket.license,
                  version: docket.version,
                  image: docket.image,
                  href: docket.href
                }

                setDocket(deskName, newDocket)
              }}
            >
              submit
            </button>
          </form >
        </div>
      )
      }
    </div >
  )
}
