import React, { useContext, useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Link, Route, useParams, useNavigate } from 'react-router-dom';
import './Config.css';
import { Footer } from './Footer';
import { GlobalStateContext } from './Global';
import { ConfigDocketForm } from './ConfigDocketForm';
import { ConfigHrefForm } from './ConfigHrefForm';


const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Config() {
  const { subdirectory } = useParams()
  const navigate = useNavigate();


  const { desks, removeDeskFromLocal, charges } = useContext(GlobalStateContext);

  const deskName = subdirectory
  if (!deskName) {
    return (
      <div>oops, nothing here</div>
    )
  }


  useEffect(() => {

    console.log('config desks', desks)
  }, [desks]);

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
          <input type="file" id="app-files"
            // @ts-ignore
            directory="true"
            webkitdirectory="true"
            mozdirectory="true"
          />
          <button
            onClick={(e) => {
              // post request to /docket/upload
              e.preventDefault();

              const fileInput = document.getElementById('app-files') as HTMLInputElement;
              var files = fileInput.files;

              if (!files) {
                console.log('null files')
                return;
              }

              var formData = new FormData();
              // desk field required in docket agent
              formData.append('desk', deskName)
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // glob field required in docket agent
                formData.append('glob', file, file.webkitRelativePath || file.name);
              }

              if (files.length > 0) {
                fetch('/docket/upload', {
                  method: 'POST',
                  body: formData,
                })
                  .then(data => {
                    // response body is html...
                    if (data.status === 200) {
                      //TODO responsive success
                      console.log('upload success')
                    }
                  })
                  .catch((error) => {
                    //TODO responsive error
                    console.error('Error:', error);
                  });
              } else {
                console.log('No files selected');
              }
            }}
          >
            upload
          </button>
        </form>
      </div>
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