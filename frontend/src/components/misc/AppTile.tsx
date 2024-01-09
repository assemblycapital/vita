import React, { useContext } from 'react';
import { GlobalStateContext } from '../Global';
export function AppTile({ deskName }: { deskName: string }) {

  const { charges } = useContext(GlobalStateContext);

  const docket = charges[deskName];
  if(!docket) return (<div />)

  const size = '50px'
  const imageSize = '40px'
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: docket.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2px',
      }}
    >
      {docket.image && 
        <img
          width={imageSize}
          height={imageSize}
          src={docket.image}
        />
      }
    </div>
  )
}