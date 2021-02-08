
import React, { Component } from 'react'
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar';
import Services from "./services.jsx";
import Register from './Components/Register/Register'
import { Redirect, Route, Switch } from "react-router-dom"
import NotFound from './Components/NotFound/NotFound';
import ProductedRoute from './productedRoute/productedRoute';

class App extends Component{
  state = {isLoggedIn:false}
  isAuth=(isLogged)=>{
    this.setState({
      isLoggedIn:isLogged
    })
  }
  render(){
    return (
      <React.Fragment>
        <Navbar />
        <div className = 'container'>
          <Switch>
              {/* <Route path = "/home" component = {Services}/> */}
              <ProductedRoute isAuth={this.state.isLoggedIn} path="/home" component = {Services}/>
              <Route path = "/register" component = {Register}/>
              <Route path = "/login" render={(props)=> <Login {...props} isAuth={this.isAuth}/>}/>
              <Route path = "/notfound" component = {NotFound}/>
              <Redirect from = "/" exact to = "/register"/>
              <Redirect to = "/notfound"/>
          </Switch>
        </div>
          
      </React.Fragment>
    );
  }
}

export default App;
