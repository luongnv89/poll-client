import React from 'react';
import '../App.css';
import MainPage from '../components/MainPage';

const HomePage = () => {
  const mainContent = (
    <div className="page-header">
      <h1>
        Welcome to PINB application
      </h1>
    </div>
  );

  return <MainPage mainContent={mainContent} title="Home Page" />;
};

export default HomePage;
