import axios from 'axios';
import React, { Component } from 'react';
import Home from './Components/Home/Home';



class Services extends Component {
    state = {
        movies : [] ,       // let x = {[y]:'ahmed'}
        tv : []             // let y = "ali"
    }
    getTrending = async (mediaType)=>{
       let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=feb2edceda35691d0b91bef595f0bdef`);
       this.setState({
           [mediaType] : data.results // == movies : api movies , tv : tv api  
       })
    }
    componentDidMount(){
        this.getTrending("movies"); 
        this.getTrending("tv")
    }
    render() {
        let {movies , tv} = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <Home trendingMovie = {movies} trendingTv = {tv}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Services;