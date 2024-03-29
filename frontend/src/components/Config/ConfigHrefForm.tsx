import React, { useContext, useEffect, useState } from 'react';
import './Config.css';
import { GlobalStateContext } from '../Global';
import { IToast, Toast } from '../misc/Toast';
import { Docket, DocketHref } from '../../lib/lib';
import { LoadingSpinner } from '../misc/LoadingSpinner';

const initialIsGlobHttp = (docket: Docket) => {
  if ('site' in docket.href) return false;
  let x = 'http' in docket.href.glob['glob-reference'].location;
  return x
}
export function ConfigHrefForm({ deskName }: { deskName: string }) {

  const { charges, loadCharges, contextPoke } = useContext(GlobalStateContext);
  const [selectedSite, setSelectedSite] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isGlobHttp, setIsGlobHttp] = useState(false);

  const [toast, setToast] = useState<IToast>({ text: '', time: 0 });

  function showToast(text: string) {
    setToast({ text: '', time: 0 });
    setToast({ text: text, time: 3000 });
  }

  function setDocket(deskName: string, docket: Docket) {
    docket.color = docket.color.slice(1);

    contextPoke({
      app: "vita-deploy",
      mark: "vita-deploy-action",
      json: {
        'set-docket': {
          "desk-name": deskName,
          docket: docket
        }
      },
    }).then(() => {
      showToast('success');
    });
  }

  useEffect(() => {
    const docket = charges[deskName];
    if (!docket) return;
    const docketHasSite = 'site' in docket.href;
    setSelectedSite(docketHasSite)
    setIsGlobHttp(initialIsGlobHttp(docket))

  }, [charges]);


  if (!deskName) {
    return (
      <div>
      </div>
    )
  }


  if (charges[deskName] === undefined) {
    return (
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <LoadingSpinner />
        <div>loading %{deskName} docket...</div>
      </div>
    )
  }

  const docket = charges[deskName];
  const docketHasSite = 'site' in docket.href;

  function handleSiteOrGlobChange(e: any) {
    let isSite = e.target.value === 'site'
    setSelectedSite(isSite)
  }


  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };


  function globHttpDefaultValue() {
    const bunt = "http://example.com/file.glob";
    if ('site' in docket.href) return bunt;
    if (!('http' in docket.href.glob['glob-reference'].location)) {
      return bunt
    }
    return docket.href.glob['glob-reference'].location.http;
  }

  function globAmesDefaultValue() {
    return "~" + window.ship;
  }

  return (
    <div
      style={{
        margin: '1rem 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold' }}>href settings</div>
          (advanced)
        </div>
        <button
          style={{
            // margin: '0 0.5rem',
            width: '1.5rem',
            height: '1.5rem',
            // verticalAlign: 'bottom'
          }}
          onClick={() => {
            toggleMinimize();
            setSelectedSite(docketHasSite);
            setIsGlobHttp(initialIsGlobHttp(docket));
          }
          }>
          {isMinimized ? '+' : '-'}
        </button>
      </div>

      {!isMinimized && (
        <div
          style={{
            margin: '1rem 0',
          }}
        >
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
                      id="app-site"
                      name="app-site"
                      defaultValue={"site" in docket.href ? docket.href.site : ''}
                      placeholder='/path/to/site'
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
                          id="app-glob-base"
                          name="app-glob-base"
                          defaultValue={"glob" in docket.href ? docket.href.glob.base : ''}
                        />
                      </div>
                      <div className="labeled-text">
                        <label> hash </label>
                        <input
                          type="text"
                          id="app-glob-ref-hash"
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
                          id="glob-http-or-ames"
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
                          id="glob-http-or-ames"
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
                                id="app-glob-ref-url"
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


                function setHref(href: DocketHref) {
                  let newDocket: Docket = {
                    title: docket.title,
                    info: docket.info,
                    color: docket.color,
                    website: docket.website,
                    license: docket.license,
                    version: docket.version,
                    image: docket.image,
                    href: href
                  }

                  return newDocket
                }

                let newDocket;
                if (selectedSite) {
                  const site = (document.getElementById('app-site') as HTMLInputElement).value;
                  newDocket = setHref({ site: site })
                } else {

                  const base = (document.getElementById('app-glob-base') as HTMLInputElement).value;
                  const hash = (document.getElementById('app-glob-ref-hash') as HTMLInputElement).value;

                  if (isGlobHttp) {
                    // glob http
                    const http = (document.getElementById('app-glob-ref-url') as HTMLInputElement).value;
                    newDocket = setHref({ glob: { base: base, "glob-reference": { hash: hash, location: { http: http } } } })

                  } else {
                    // glob ames
                    const ship = (document.getElementById('app-glob-ref-ship') as HTMLInputElement).value;
                    newDocket = setHref({ glob: { base: base, "glob-reference": { hash: hash, location: { ames: ship } } } })
                  }
                }

                setDocket(deskName, newDocket)
              }}
            >
              submit
            </button>

            <div
              style={{
                margin: '0 0.5rem',
              }}
            >
              <Toast {...toast} />
            </div>
          </form >
        </div>
      )
      }
    </div >
  )
}
