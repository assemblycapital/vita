import React, { useContext } from 'react';
import { GlobalStateContext } from '../Global';
export function AppTile({ deskName }: { deskName: string }) {

  const { charges } = useContext(GlobalStateContext);

  const docket = charges[deskName];

  return (
    <div
      style={{
        width: '5rem',
        height: '5rem',
        backgroundColor: docket.color,
      }}
    >
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        {docket.title}
      </div>
      <img
        src={docket.image}
      />
    </div>
  )
}