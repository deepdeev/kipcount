import React, {Component, PropTypes} from 'react';

// Transacion component - represents a single transaction item
export default class Landing extends Component {
  render()
  {
    return (
      <div className="row loginPanel">
        <div className="background-image"></div>


        <div className="content">
          <div className="container">
            <div className="row">


              <div className="col-md-7 inspiringPhrase">
                <h1>Keep count of your income and expenses all in a single place!</h1>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3">
                <div className="loginBox">
                  <form>
                    <div className="form-group">
                      <div id="login-username-label-and-input">
                        <label id="login-username-label" htmlFor="login-username">
                          <h1>Username</h1>
                        </label>
                        <input className="form-control" id="login-username2" type="text"></input>
                      </div>
                      <div id="login-password-label-and-input">
                        <label id="login-password-label" htmlFor="login-password">
                          <h1>Password</h1>
                        </label>
                        <input className="form-control" id="login-password2" type="password"></input>
                      </div>
                      <span className="login-button login-button-form-submit" id="login-buttons-password2">
                <span className="btn btn-success" onClick={() =>
                {
                  if (document.getElementById('login-sign-in-link'))
                  {
                    document.getElementById('login-sign-in-link').click();
                    setTimeout(() =>
                    {
                      document.getElementById('login-username').value = document.getElementById('login-username2').value;
                      document.getElementById('login-password').value = document.getElementById('login-password2').value;
                      document.getElementById('login-buttons-password').click();
                    }, 200)
                  }
                }}>Sign in</span>
              </span>
                      <span className="additional-link-container">
                <button id="signup-link" className="btn btn-info additional-link">Create account</button>
              </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid footer">
            <div className="row">
              <div className="col-md-1 col-sm-1">
              </div>
              <div className="col-md-10 col-sm-10">
                <p className="copyRight">Designed and developed by <a href="https://twitter.com/luisMesa25">Luis Mesa</a> and <a href="https://twitter.com/daviddrweb">David Ruiz</a></p>
              </div>
              <div className="col-md-1 col-sm-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
