import React from 'react';
import '../App.css';
import MainPage from '../components/MainPage';

const HomePage = () => {
  const mainContent = (
    <div className="jumbotron">
      <h1>Welcome to PINB</h1>
      <p>Poll Is Not Bad :D</p>
      <p><a className="btn btn-primary btn-lg" href="/questions/q1" role="button">Learn more</a></p>
    </div>
  );

  return <MainPage mainContent={mainContent} title="Home Page" />;
};

export default HomePage;
