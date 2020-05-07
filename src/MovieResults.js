import React, { Component } from 'react';
// import Modal from './Modal';
import axios from 'axios';

class MovieResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie2: {},
      isClicked: false,
      show: false
    }
    this.findMovieIdCall = this.findMovieIdCall.bind(this);
    this.toggleMovie = this.toggleMovie.bind(this);
    // this.showModal = this.showModal.bind(this);
    // this.onClose = this.onClose.bind(this);
  }

  findMovieIdCall() {
    const { movie, isClicked } = this.props;
    axios({ url: `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=7cabe801` })
      .then((response) => {
        console.log(response.data)
        // Second call which updates the UI of React to display data and also select more movie info
        this.setState({
          movie2: response.data,
          isClicked: !isClicked
        })
      })
      .catch((error) => {
        //Update the ui to display the error
      })
  }

  toggleMovie() {
    this.setState({ isClicked: !this.state.isClicked })
  }

  // showModal = e => {
  //   this.setState({
  //     show: !this.state.show
  //   });
  // };

  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };

  render() {
    const { isClicked, movie2 } = this.state;
    console.log(movie2)
    return (
      (!isClicked) ?
        <li className='ac'>
          <div>
            <img src={this.props.movie.Poster} alt="description" className='img-rounded' />
          </div>
          <div className='text-center'> Movie Title: <span>{this.props.movie.Title}</span> </div>
          <button
            href='#'
            className='btn text-center'
            onClick={this.findMovieIdCall}
          >
            More info
          </button>
        </li>
        :
        <div className='row'>
          <div className='close-btn-container'>
            <button className='close-btn' onClick={this.toggleMovie}>X</button>
          </div>
          <div className='bc'>
            <div className='img-container'>
              <img src={movie2.Poster} alt="description" className=' img-rounded' />
            </div>
            <div className='column'>
              <h2> {movie2.Title} </h2>
              <p> Year: {movie2.Year}</p>
              <p>Actors: {movie2.Actors}</p>
              <p>Plot: {movie2.Plot}</p>
              <p>BoxOffice: {movie2.BoxOffice}</p>
              <p>Runtime: {movie2.Runtime}</p>
              <p>Director: {movie2.Director}</p>
              <p >Awards: {movie2.Awards}</p>
              <p>Genre: {movie2.Genre}</p>
              <p>Rated: {movie2.Rated}</p>
              <p >Ratings: {movie2.Ratings[0].Source}</p>
              <p>Ratings: {!movie2.Ratings[0].Value}</p>
              <p>Language: {movie2.Language}</p>
              <p>Production: {movie2.Production}</p>
              <p>Metascore: {movie2.Metascore}</p>
              <p>Writer: {movie2.Writer}</p>
              <p>Released: {movie2.Released}</p>
              <button className='btn-back' onClick={this.toggleMovie}>Back</button>
            </div>
          </div >
        </div>
    )
  }
};

export default MovieResults;
