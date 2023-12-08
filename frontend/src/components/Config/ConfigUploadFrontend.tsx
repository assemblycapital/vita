
import React, { useContext, useEffect, useState } from 'react';
import { IToast, Toast } from '../misc/Toast';

export function ConfigUploadFrontend({ deskName }: { deskName: string }) {

  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<IToast>({ text: '', time: 0 });


  function uploadFiles() {

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
      setIsUploading(true);
      fetch('/docket/upload', {
        method: 'POST',
        body: formData,
      })
        .then(data => {
          setIsUploading(false);
          // response body is html...
          if (data.status === 200) {
            setToast({ text: 'upload success', time: 3000 });
            console.log('upload success')
          }
        })
        .catch((error) => {
          setToast({ text: 'upload error', time: 3000 });
          console.error('Error:', error);
        });
    } else {
      console.log('No files selected');
    }

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
            margin: '0 1rem',

          }}
        >
          {/* {isUploading && <div>uploading...</div>} */}
        </div>


      </form>
      <Toast {...toast} />
    </div >
  )
}