import React, { Component } from "react";
// import logo from './logo.svg';
// import "./App.css";
import LandingPage from "./Container/LandingPage";

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <h3>My awesome application</h3> */}
        <LandingPage />
      </div>
    );
  }
}

export default App;
