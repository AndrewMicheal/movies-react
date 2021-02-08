import axios from "axios";
import Joi from "joi";
import React, { Component, Fragment } from "react";

export default class Register extends Component {
  state = {
    errors : [] , 
    first_nameIndex : 0,
    last_nameIndex : 0,
    passwordIndex : 0,
    ageIndex : 0,
    emailIndex : 0,
    errorMessage : ""
  }
  users = {
    first_name : "",
    last_name : "",
    email : "",
    password : "",
    age : ""
  }
  formsData = (inputValue)=>{
    this.users[inputValue.target.name] = inputValue.target.value.trim();
  }

  schema = Joi.object({
    first_name:Joi.string().pattern(new RegExp('^([a-zA-Z]+\\s*[A-Z]*)+$')).required().messages({'string.pattern.base': "Characters Only",'string.empty' : "First Name is not allowed to be empty"}) , 
    last_name : Joi.string().pattern(new RegExp('^([a-zA-Z]+\\s*[A-Z]*)+$')).required().messages({'string.pattern.base': "Characters Only",'string.empty' : "Last Name is not allowed to be empty"}),
    email :Joi.string().email({  tlds: { allow: ['com', 'net'] } }).messages({'string.email': "email  must be a valid email",'string.empty' : "email is not allowed to be empty"}),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age :  Joi.number().integer().min(10).max(80),
  })

  sendRegisterData=async()=>{
   let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signup`,this.users)
   if(data.message === "success"){
     this.props.history.replace("/login")
   }
   else{
     console.log("Not ! Success")
     this.setState({
       errorMessage : data.message
     })
   }
  }
  sendData = ()=>{
    let result = this.schema.validate(this.users,{abortEarly : false});
    console.log(result)
    if(!result.error){
      this.setState({
        errors : []
      })
      this.sendRegisterData();
    }
    else{
      this.setState({
        errors : result.error.details ,
        first_nameIndex : result.error.details.findIndex((e)=>e.path[0]==="first_name"),
        last_nameIndex : result.error.details.findIndex((e)=>e.path[0]==="last_name"),
        passwordIndex : result.error.details.findIndex((e)=>e.path[0]==="password"),
        ageIndex : result.error.details.findIndex((e)=>e.path[0]==="age"),
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
              <h1 className="mb-5">Register Now</h1>
              <input name = "first_name" onKeyUp = {this.formsData}
                type="text"
                className="form-control my-3"
                placeholder="Enter Your First Name"
              />
              {this.state.errors.find((e)=>e.path[0]==="first_name")?<div className = "alert alert-danger">{this.state.errors[this.state.first_nameIndex].message}</div>:null}
              {/* {this.state.errors.find((e)=>e.path[0]==="first_name")&&<div className = "alert alert-danger">{this.state.errors[this.state.first_nameIndex].message}</div>} */}

              <input name = "last_name" onKeyUp = {this.formsData} 
                type="text"
                className="form-control"
                placeholder="Enter Your Last  Name"
              />
              {this.state.errors.find((e)=>e.path[0]==="last_name")?<div className = "alert alert-danger">{this.state.errors[this.state.last_nameIndex].message}</div>:null}

              {/* {this.state.errors.find((e)=>e.path[0]==="last_name")&&<div className = "alert alert-danger">{this.state.errors[this.state.last_nameIndex].message}</div>} */}

              <input name = "email" onKeyUp = {this.formsData} 
                className="form-control my-3"
                placeholder="Enter your email"
                type="text"
              />
              {this.state.errors.find((e)=>e.path[0]==="email")?<div className = "alert alert-danger">{this.state.errors[this.state.emailIndex].message}</div>:null}

              {/* {this.state.errors.find((e)=>e.path[0]==="email")&&<div className = "alert alert-danger">{this.state.errors[this.state.emailIndex].message}</div>} */}
              

              <input name = "password" onKeyUp = {this.formsData} 
                className="form-control my-3"
                placeholder="Enter your password"
                type="password"
              />
              {this.state.errors.find((e)=>e.path[0]==="password")?<div className = "alert alert-danger">{this.state.errors[this.state.passwordIndex].message}</div>:null}

              {/* {this.state.errors.find((e)=>e.path[0]==="password")&&<div className = "alert alert-danger">{this.state.errors[this.state.passwordIndex].message}</div>} */}


              <input name = "age" onKeyUp = {this.formsData} 
                type="number"
                placeholder="Enter your age"
                className="form-control"
              />
              {this.state.errors.find((e)=>e.path[0]==="age")?<div className = "alert alert-danger">{this.state.errors[this.state.ageIndex].message}</div>:null}

              {/* {this.state.errors.find((e)=>e.path[0]==="age")&&<div className = "alert alert-danger">{this.state.errors[this.state.ageIndex].message}</div>} */}

              <button onClick={this.sendData} className="btn btn-info mt-3">Register</button>
              {this.state.errors.length === 0 ?null:<div className = "alert alert-danger my-2">please check all constraints inputs</div>}
              {this.state.errorMessage&&<div className = "alert alert-danger my-2">{this.state.errorMessage}</div>}
              
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
