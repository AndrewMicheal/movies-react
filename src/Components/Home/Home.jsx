import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        let {trendingMovie , trendingTv} = this.props;
       return(
            <React.Fragment>
                
                <div className="row py-5">
                    <div className="col-md-4">
                        <div className="my-border w-25 my-3"></div>
                        <h3>trending<br/> movies<br/> to watch right now</h3>
                        <p className = "my-3 secondFontColor">most watched movies by days</p>
                        <div className="my-border my-3"></div>
                    </div>
                    {trendingMovie.slice(0,10).map((movie , index)=>{
                        return(
                            <div key = {index} className="col-md-2">
                                <div className="movie position-relative">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className = "w-100" alt=""/>
                                    <h4 className = "py-2 h6">{movie.title}{movie.name}</h4>
                                    <div className="vote position-absolute">{movie.vote_average}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="row py-5">
                    <div className="col-md-4">
                        <div className="my-border w-25 my-3"></div>
                        <h3>trending<br/> Tv<br/> to watch right now</h3>
                        <p className = "my-3 secondFontColor">most watched Tv by days</p>
                        <div className="my-border my-3"></div>
                    </div>
                    {trendingTv.slice(0,10).map((movie , index)=>{
                        return(
                            <div key = {index} className="col-md-2">
                                <div className="movie position-relative">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className = "w-100" alt=""/>
                                    <h4 className = "py-2 h6">{movie.title}{movie.name}</h4>
                                    <div className="vote position-absolute">{movie.vote_average}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
       );
    }
}
