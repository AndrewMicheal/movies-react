import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { Route ,Redirect } from 'react-router-dom';
import SecureLS from "secure-ls";

 let ls = new SecureLS({encodingType: 'aes'});
class ProductedRoute extends Component {
    render() {
        let decodeToken = ls.get("currentUser")
        try{
            var decode = jwtDecode(decodeToken);
        }
        catch(error){
            localStorage.clear();
            return <Redirect to = "/login"/>
        }
        if(this.props.isAuth || decode){
            console.log(decode)
            return (
                <Route path = {this.props.path} component = {this.props.component}/>
            );
        }
        else{
            return <Redirect to = "/login"/>
        }
    }
}

export default ProductedRoute;