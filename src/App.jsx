import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailView from './DetailView';
import Sidebar from './Sidebar';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/city/:cityName" element={<DetailView />} />
      </Routes>
    </div>
  );
}
