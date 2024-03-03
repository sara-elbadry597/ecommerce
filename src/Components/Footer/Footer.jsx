import React from "react";
export default function Footer() {
  return (
    <div className=" footer mt-auto bg-body-tertiary p-5">
      <div className="row">
        <div className="col-md-12 text-start">
          <h2>Get The FreshCart app</h2>
          <p>
            We Will Send You a link ,Open it In Your Phone to Download the app.
          </p>
        </div>
        <div className="col-md-12 d-flex  justify-content-between ">
          <div
            className=" ps-3 py-2"
            style={{
              width: "85%",
            }}
          >
            <input
              placeholder="type your Email..."
              type="text"
              className="form-control mb-3 "
              id="footerEmail"
            />
          </div>
          <div
            className="py-2"
            style={{
              width: "15%",
            }}
          >
            <button className="btn bg-main text-white mx-2" type="submit">
              Share App Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}