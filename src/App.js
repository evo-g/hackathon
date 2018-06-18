import React, { Component } from 'react';
import axios from 'axios';
// import MovieResults from './MovieResults';


export default class Hackathon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      text: ''
    }
    this.searchMovies = this.searchMovies.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }


  searchMovies() {
    //If statement to alert if search bar is empty also to help from crashing app
    if (this.state.text === '') {
      alert('Enter a movie in search bar at the top of the page.')
      return false
    }
    axios({
      method: 'get',
      url: `https://omdbapi.com/?s=${this.state.text}&apiKey=7cabe801`
    })
      .then((response) => {
        //Update the UI of React to display data and determine if search not found with alert
        if (response.data.Search) {
          this.setState({ movies: response.data.Search })
          console.log(response)
        } else {
          alert('no movies found please search again')
        }
      })
      .catch((error) => {
        //Update the ui to display the error
      })
  }


  handleTextChange(event) {
    console.log(event.target.value)
    this.setState({ text: event.target.value })
  }


  render() {
    return (
      <div className='container'>
        <div>
          <h1 className='header text-center'> Basic Movie Search </h1>
          <input className="w-75 search" value={this.state.text} onChange={this.handleTextChange} placeholder='search movies here...' />
          <button className='btn btn-success btn-center search-movies w-25 glyphicon glyphicon-search' onClick={this.searchMovies}></button>
          <div className='card'>
            <h2 className='text-center text-warning card-header'> Movie Results </h2>
            <ul>
              {this.state.movies.map((movie, index, array) => {
                return (
                  <MovieResults
                    key={index}
                    movie={movie}
                  />)
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class MovieResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      isClicked: false
    }
    this.findMovieIdCall = this.findMovieIdCall.bind(this);
    // this.zoomOnClick = this.zoomOnClick.bind(this); 
  }

  //   zoomOnClick() {
  //     this.setState({ isClicked: !this.state.isClicked });
  // }

  findMovieIdCall() {
    axios({ url: `https://www.omdbapi.com/?i=${this.props.movie.imdbID}&apikey=7cabe801` })
      .then((response) => {
        //Second call which updates the UI of React to display data and also select more movie info
        console.log(response)
        this.setState({ movie: response.data, isClicked: !this.state.isClicked })
      })
      .catch((error) => {
        //Update the ui to display the error
      })
  }



  render() {
    return (
      (!this.state.isClicked) ?
        <div className='col-sm-12'>
          <div className='card'>
            <div className='media'>
              <li>
                <div className='media-left'>
                  <img src={this.props.movie.Poster} alt="description" className='media-object img-rounded' />
                </div>
                <div className='media-body'>
                  <div className='text-info'> Movie Title: {this.props.movie.Title} </div>
                  <button href='#' className='btn btn-info btn-centered' onClick={this.findMovieIdCall}>Click for more info</button>
                </div>
              </li>
            </div>
          </div>
        </div>
        :
        // (this.state.isClicked) ?
          <div className='card'>
            <h4 className="card-header text-center text-info text-bold"> Movie Title: {this.props.movie.Title} </h4>
            <div className='media'>
              <div className='media-left'><br />
                <img src={this.props.movie.Poster} alt="description" className='media-object img-rounded' /><br />
              </div>
              <div className='media-body'><br />
                <div className='text-warning'> Year: {this.props.movie.Year}</div>
                <div className='text-primary'>Actors: {this.state.movie.Actors}</div>
                <div className='text-danger'>Plot: {this.state.movie.Plot}</div>
                <div className='text-success'>BoxOffice: {this.state.movie.BoxOffice}</div>
                <div className='text-active'>Runtime: {this.state.movie.Runtime}</div>
                <div className='text-success'>Director: {this.state.movie.Director}</div>
                <div className='text-danger'>Awards: {this.state.movie.Awards}</div>
                <div className='text-primary'>Genre: {this.state.movie.Genre}</div>
                <div className='text-warning'>Rated: {this.state.movie.Rated}</div>
                <div>Language: {this.state.movie.Language}</div>
                <div className='text-info'>Production: {this.state.movie.Production}</div>
                <div className='text-success'>Metascore: {this.state.movie.Metascore}</div>
                <div>Writer: {this.state.movie.Writer}</div>
                <div className='text-warning'>Released: {this.state.movie.Released}</div>
                <button href='#' className='btn btn-danger btn-centered' onClick={this.findMovieIdCall}>Less info</button>
              </div>
            </div>
          </div>
          // :
          // <div className='col-sm-12'>
          //   <div className='card'>
          //     <div className='media'>
          //       <li>
          //         <div className='media-left'>
          //           <img src={this.props.movie.Poster} alt="description" className='media-object img-rounded' />
          //         </div>
          //         <div className='media-body'>
          //           <div className='text-info'> Movie Title: {this.props.movie.Title} </div>
          //           <button href='#' className='btn btn-info btn-centered' onClick={this.findMovieIdCall}>Click for more info</button>
          //         </div>
          //       </li>
          //     </div>
          //   </div>
          // </div>
    )
  }
}
