
import React, { useContext, useEffect, useState } from 'react';
import { IToast, Toast } from '../misc/Toast';
import { Docket, DocketHref, GlobalStateContext } from '../Global';
import Urbit from '@urbit/http-api';


export function ConfigUploadFrontend({ deskName }: { deskName: string }) {

  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<IToast>({ text: '', time: 0 });

  const { charges, contextPoke } = useContext(GlobalStateContext);

  function showToast(text: string) {
    setToast({ text: '', time: 0 });
    setToast({ text: text, time: 3000 });
  }

  function uploadFiles() {

    const fileInput = document.getElementById('app-files') as HTMLInputElement;
    var files = fileInput.files;

    if (!files) {
      console.log('null files')
      return;
    }
    setHrefAmes();

    var formData = new FormData();
    // desk field required in docket agent
    formData.append('desk', deskName)
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // glob field required in docket agent
      formData.append('glob', file, file.webkitRelativePath || file.name);
    }

    if (files.length > 0) {
      setIsUploading(true);
      fetch('/docket/upload', {
        method: 'POST',
        body: formData,
      })
        .then(data => {
          setIsUploading(false);
          // response body is html...
          if (data.status === 200) {
            showToast('success');
            fileInput.value = '';

          } else {
            showToast('error!');
          }
        })
        .catch((error) => {
          console.log('/docket/upload error', error);
          showToast('error!');
        });
    } else {
      console.log('No files selected');
    }

  }

  function setHrefAmes() {

    let docket = charges[deskName];
    if (!docket) return;

    if ('site' in docket.href) return;

    let newDocket: Docket = {
      title: docket.title,
      info: docket.info,
      color: docket.color.slice(1), // TODO this is dumb
      website: docket.website,
      license: docket.license,
      version: docket.version,
      image: docket.image,
      href: { glob: { base: docket.href.glob.base, "glob-reference": { hash: '0v0', location: { ames: '~' + window.ship } } } }
    }

    // return newDocket

    contextPoke({
      app: 'vita-deploy',
      mark: 'vita-deploy-action',
      json: {
        'set-docket': {
          'desk-name': deskName,
          docket: newDocket
        }
      }
    })

  }

  return (
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
            uploadFiles();
          }}

        >
          upload
        </button>

        <div
          style={{
            margin: '0 0.5rem',

          }}
        >
          <Toast {...toast} />
        </div>


      </form>
    </div >
  )
}