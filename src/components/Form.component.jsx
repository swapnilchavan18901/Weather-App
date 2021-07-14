import React, { Component } from "react";
import "./Form.style.css";

const Form = (props) => {
  return (
    <div className="container  ">
      <div>{props.error ? error() : null}</div>
      <form onSubmit={props.loadweather}>
        <div className="row ">
          <div className="col-md-3 offset-md-2 py-3 ">
            <input
              type="text"
              className="form-control"
              name="City"
              autoComplete="off"
              placeholder="City"
            />
          </div>
          <div className="col-md-3 py-3">
            <input
              type="text"
              className="form-control"
              name="Country"
              autoComplete="off"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md py-3">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};
function error() {
  return (
    <div className="alert alert-danger mx-5 ali-cnt" role="alert">
      Please Enter City and Country
    </div>
  );
}

export default Form;
