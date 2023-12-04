import { useContext } from 'react';
import './Footer.css';
import { GlobalStateContext } from './Global';
import React from 'react';
export function Footer() {



  const ship = window.ship;
  return (
    <footer>
      <p>{ship ? `~${ship}` : "~zod"}</p>
      <svg width="32" height="32" viewBox="0 0 388 194" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M194 0H97V97H0V194H97V97H194H291V194H388V97H291V0H194Z" fill="black"></path></svg>
    </footer>
  );
}