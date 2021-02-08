import React, { Component, Fragment } from "react";
import {NavLink} from "react-router-dom";
import SecureLS from "secure-ls";
import jwtDecode from 'jwt-decode';
let ls = new SecureLS({encodingType: 'aes'});

let decodeToken
let decode;
export default class Navbar extends Component {
  state = {
    isLogIn : false 
  }
  logOut(name){
    if(name.target.name === "logout"){
      ls.removeAll();
      this.setState({isLogIn:false})
    }
  }

  render() {
    try{
      decodeToken = ls.get("currentUser")
      decode = jwtDecode(decodeToken);
      console.log(decode)
    }
    catch(error){
      decode = "";
      console.log("decode",decode)
    }
    console.log("isLogIn",this.state.isLogIn)   
    return (
      <Fragment>        
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <a className="navbar-brand " href="/">
            {(decode ==="" && !this.state.isLogIn) ? `LastNews` : `welcome ${decode.first_name} ${decode.last_name}`}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/register">
                  {(decode ==="" && !this.state.isLogOut)?"Register":""}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                    {(decode ==="" && !this.state.isLogOut) ? "Login" : ""} 
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login" name="logout" onClick={(name)=>{this.logOut(name)}}>
                    {(decode ==="" && !this.state.isLogOut) ? "" : "Logout"} 
                </NavLink>
              </li>
            </ul>

          </div>
        </nav>
      </Fragment>
    );
  }
}
