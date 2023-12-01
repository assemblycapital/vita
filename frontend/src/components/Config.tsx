import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Route, useParams } from 'react-router-dom';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function Config() {
  const { subdirectory } = useParams()

  return (
    <div>
      <a href="/apps/vita/"> &lt;- deployer </a>
      <h1>vita app CONFIG</h1>
      <p>{subdirectory}</p>
    </div>
  )

}