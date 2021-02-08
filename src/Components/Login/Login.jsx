import React, { Component, Fragment } from "react";
import Joi from "joi";
import axios from "axios";
import SecureLS from "secure-ls";

let ls = new SecureLS({encodingType: 'aes'});

export default class Login extends Component {
  state = {
    errors : [] ,
    errorMessage:"", 
    passwordIndex : 0,
    emailIndex : 0
  }
  usersLogin = {
    email : "",
    password : "",
  }

  formsLoginData = (inputValue)=>{
    this.usersLogin[inputValue.target.name] = inputValue.target.value.trim();
  }

  schema = Joi.object({
    email :Joi.string().email({  tlds: { allow: ['com', 'net'] } }).messages({'string.email': "email  must be a valid email",'string.empty' : "email is not allowed to be empty"}),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })

  sendLoginData=async()=>{
   let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signin`,this.usersLogin)
   if(data.message === "success"){
     ls.set("currentUser",data.token);
     this.props.isAuth(true)
     this.props.history.replace("/home");
   }
   else{
      this.setState({
        errorMessage : data.message
      })
   }
  }

  sendFormData = ()=>{
    let result = this.schema.validate(this.usersLogin,{abortEarly : false});
    if(!result.error){
      this.setState({
        errors : []
      })
      this.sendLoginData();
    }
    else{
      this.setState({
        errors : result.error.details ,
        passwordIndex : result.error.details.findIndex((e)=>e.path[0]==="password"),
        emailIndex : result.error.details.findIndex((e)=>e.path[0]==="email"),
      })
    }
  }


  render() {
    return (
      <Fragment>
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="mb-5">Login Now</h1>

              <input onKeyUp = {this.formsLoginData} 
                className="form-control my-2"
                placeholder="Enter your email" name = "email"
                type="text"
              />
              {this.state.errors.find((e)=>e.path[0]==="email")?<div className = "alert alert-danger">{this.state.errors[this.state.emailIndex].message}</div>:null}

              <input onKeyUp = {this.formsLoginData} 
                className="form-control my-2"
                placeholder="Enter your password"
                type="password" name = "password"
              />
              {this.state.errors.find((e)=>e.path[0]==="password")?<div className = "alert alert-danger">{this.state.errors[this.state.passwordIndex].message}</div>:null}


              <button onClick = {this.sendFormData} className="btn btn-info mt-3">Login</button>

              {this.state.errors.length === 0 ?null:<div className = "alert alert-danger my-2">please check all constraints inputs</div>}
              {this.state.errorMessage&&<div className = "alert alert-danger my-2">{this.state.errorMessage}</div>}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
