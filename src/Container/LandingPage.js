import React, { Component } from "react";
import Form from "../Components/Form/Form";
// import classes from "*.module.sass";
import classes from "./LandingPage.module.css";
class LandingPage extends Component {
  componentDidMount() {
    console.log(document.querySelector(".g-recaptcha #g-recaptcha-response"));
  }
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Row}>
          <div className={classes.Column}>
            <div className={classes.LeftText}>
              <div>
                <h1 style={{ padding: "0px", margin: "0px", color: "white" }}>
                  domain.tld
                </h1>
                <h4>For Sale</h4>
              </div>
            </div>
          </div>
          <div className={classes.Column}>
            <div className={classes.FormContainer}>
              <Form />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
