import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class MovieResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      isClicked: false,
      show: false
    }
    this.findMovieIdCall = this.findMovieIdCall.bind(this);
    this.toggleMovie = this.toggleMovie.bind(this);
  }

  findMovieIdCall() {
    const { movie, isClicked } = this.props;
    axios({ url: `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=7cabe801` })
      .then((response) => {
        // Second call which updates the UI of React to display data and also select more movie info
        this.setState({
          movieDetails: response.data,
          isClicked: !isClicked
        })
      })
      .catch((error) => {
        //Update the ui to display the error
        console.log(error);
      })
  }

  toggleMovie() {
    this.setState({ isClicked: !this.state.isClicked })
  }

  render() {
    const { isClicked, movieDetails } = this.state;
    return (
      (!isClicked) ?
        <li className='ac'>
          <div className='poster-container'>
            <img src={this.props.movie.Poster} alt='description' />
          </div>
          <div className='text-center'>
            <h1><span>{this.props.movie.Title}</span></h1>
          </div>
          <button
            className='btn text-center'
            onClick={this.findMovieIdCall}
          >
            More info
          </button>
        </li>
        :
        <div className='row active'>
          <div className='close-btn-container'>
            <button className='close-btn' onClick={this.toggleMovie}>X</button>
          </div>
          <div className='bc'>
            <div className='img-container'>
              <img src={movieDetails.Poster} alt='description' className='img-rounded' />
            </div>
            <div className='column'>
              <h1> {movieDetails.Title} </h1>
              <p> Year: {movieDetails.Year}</p>
              <p>Actors: {movieDetails.Actors}</p>
              <p>Plot: {movieDetails.Plot}</p>
              <p>BoxOffice: {movieDetails.BoxOffice}</p>
              <p>Runtime: {movieDetails.Runtime}</p>
              <p>Director: {movieDetails.Director}</p>
              <p >Awards: {movieDetails.Awards}</p>
              <p>Genre: {movieDetails.Genre}</p>
              <p>Rated: {movieDetails.Rated}</p>
              <p >Ratings: {movieDetails.Ratings[0].Source}</p>
              <p>Ratings: {!movieDetails.Ratings[0].Value}</p>
              <p>Language: {movieDetails.Language}</p>
              <p>Production: {movieDetails.Production}</p>
              <p>Metascore: {movieDetails.Metascore}</p>
              <p>Writer: {movieDetails.Writer}</p>
              <p>Released: {movieDetails.Released}</p>
              <button className='btn-back' onClick={this.toggleMovie}>Back</button>
            </div>
          </div >
        </div>
    )
  }
};

export default MovieResults;
