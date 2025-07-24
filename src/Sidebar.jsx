import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>City Weather</h2>
      <Link to="/">Dashboard</Link>
    </div>
  );
}
