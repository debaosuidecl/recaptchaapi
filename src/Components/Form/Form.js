import React, { Component } from "react";
import classes from "./Form.module.css";
import axios from "axios";
class Form extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    countryCode: "+44",
    comment: "",
    recaptcha: "",
    isLoading: false,
    message: ""
  };
  componentWillMount() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(this.showPosition));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    axios
      .get("/hello")
      .then(data => {
        console.log(data);
      })
      .catch(e => console.log(e));
  }
  shouldComponentUpdate(nextProp, nextState) {
    return (
      nextState.recaptcha !== this.state.recaptcha ||
      nextState.firstName !== this.state.firstName ||
      nextState.lastName !== this.state.lastName ||
      nextState.companyName !== this.state.companyName ||
      nextState.countryCode !== this.state.countryCode ||
      nextState.phoneNumber !== this.state.phoneNumber ||
      nextState.email !== this.state.email ||
      nextState.comment !== this.state.comment ||
      nextState.isLoading !== this.state.isLoading ||
      nextState.message !== this.state.message
    );
  }
  componentDidUpdate() {
    const recaptcha = document.querySelector(
      ".g-recaptcha textarea#g-recaptcha-response"
    ).value;
    if (
      document.querySelector(".g-recaptcha textarea#g-recaptcha-response") !==
        null &&
      document.querySelector(".g-recaptcha textarea#g-recaptcha-response")
        .value !== null
    ) {
      console.log(
        document.querySelector(".g-recaptcha textarea#g-recaptcha-response")
          .value
      );
      this.setState(prevState => {
        return { recaptcha: recaptcha };
      });
    }
    // console.log(
    //   document.querySelector(".g-recaptcha textarea#g-recaptcha-response").value
    // );
  }

  showPosition = position => {
    console.log(
      `Latitude: " + ${position.coords.latitude}`,
      `Longitude: " + ${position.coords.longitude}`
    );
  };
  onChangeHandler = e => {
    if (e.target.name === "phoneNumber") {
      if (isNaN(e.target.value)) {
        return;
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitForm = async e => {
    e.preventDefault();
    // const recaptchaValue = document.querySelector(
    //   ".g-recaptcha textarea#g-recaptcha-response"
    // ).value;

    // this.setState({
    //   recaptcha: recaptchaValue
    // });
    this.setState(prevState => {
      return { isLoading: !prevState.isLoading, message: "" };
    });

    const formValues = {
      ...this.state,
      recaptcha: document.querySelector(
        ".g-recaptcha textarea#g-recaptcha-response"
      ).value
    };

    const response = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValues)
    });
    const body = await response.text();
    console.log(body);

    this.setState(prevState => {
      return {
        isLoading: !prevState.isLoading,
        message: JSON.parse(body)["msg"]
      };
    });

    // this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className={classes.FormContainer}>
        <form onSubmit={this.submitForm} className={classes.Form}>
          <div className={classes.HeaderContainer}>
            <h5>Please use the form below to contact us</h5>
            <div />
            <div />
            <div />
          </div>
          <p style={{ color: "#444", padding: "0", margin: "0" }}>
            {this.state.message}
          </p>
          <div className={classes.Input}>
            <p>*</p>
            <input
              value={this.state.firstName}
              onChange={this.onChangeHandler}
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className={classes.Input}>
            <p>*</p>
            <input
              value={this.state.lastName}
              onChange={this.onChangeHandler}
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className={classes.Input}>
            <p>*</p>
            <input
              value={this.state.email}
              onChange={this.onChangeHandler}
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className={classes.Input}>
            <h6 className={classes.CompanyOption}>(optional)</h6>
            <input
              value={this.state.companyName}
              onChange={this.onChangeHandler}
              type="text"
              placeholder="
            Enter your company name"
              name="companyName"
            />
          </div>
          <div className={classes.PhoneNumberInputGrand}>
            <h6>(optional)</h6>
            <div className={classes.PhoneNumberInput}>
              <select
                value={this.state.countryCode}
                onChange={this.onChangeHandler}
                name="countryCode"
                id=""
              >
                <option>+234</option>
                <option>+237</option>
              </select>
              <input
                value={this.state.phoneNumber}
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Enter a Phone Number"
                name="phoneNumber"
              />
            </div>
          </div>
          <div className={classes.TextArea}>
            <p>(optional)</p>
            <textarea
              value={this.state.comment}
              onChange={this.onChangeHandler}
              name="comment"
              id=""
              placeholder="Leave a comment..."
            />
          </div>
          <div className="captcha">
            <div
              className="g-recaptcha"
              data-sitekey="6LfNGI4UAAAAAJBvQrZtcQe_i-FCq8emWQKpGMQQ"
            />
          </div>
          <div className={classes.ButtonContainer}>
            <button disabled={this.state.isLoading}>
              {!this.state.isLoading ? "Send" : "Loading"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
