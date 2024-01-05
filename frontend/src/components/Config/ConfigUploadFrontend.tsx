
import React, { useContext, useEffect, useState } from 'react';
import { IToast, Toast } from '../misc/Toast';
import { GlobalStateContext } from '../Global';
import { Docket } from '../../lib/lib';
import { LoadingSpinner } from '../misc/LoadingSpinner';

export function ConfigUploadFrontend({ deskName }: { deskName: string }) {

  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<IToast>({ text: '', time: 0 });

  const { charges, contextPoke, loadCharges } = useContext(GlobalStateContext);

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
    
    // this appears to be counterproductive, causing subscribers to fail to load due to 0v0 expected hash.
    // TODO: investigate further. but for now, it looks like it works without this.
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
            loadCharges();

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
          {isUploading && <LoadingSpinner />}
          <Toast {...toast} />
        </div>


      </form>
    </div >
  )
}