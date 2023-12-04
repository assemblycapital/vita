import { useContext } from 'react';
import './Footer.css';
import { GlobalStateContext } from './Global';
import React from 'react';
export function Footer() {



  const ship = window.ship;

  const time = new Date().toLocaleTimeString();
  const date = new Date().toDateString();

  return (
    <footer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          textAlign: 'center',
          alignItems: 'center',

        }}
      >
        <div>{ship ? `~${ship}` : "~zod"}</div>
        <div>{date} {time}</div>
        <svg width="32" height="32" viewBox="0 0 388 194" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M194 0H97V97H0V194H97V97H194H291V194H388V97H291V0H194Z" fill="black"></path></svg>
      </div>
    </footer>
  );
}