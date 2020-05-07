import React, { Component } from 'react';
import MovieResults from './MovieResults';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      text: ''
    }
    this.searchMovies = this.searchMovies.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  searchMovies(event) {
    //If statement to alert if search bar is empty also to help from crashing app
    event.preventDefault();
    const { text } = this.state;
    if (text === '') {
      alert('Enter a movie in search bar at the top of the page.')
      return false
    }
    axios({
      method: 'get',
      url: `https://omdbapi.com/?s=${text}&apiKey=7cabe801`
    })
      .then((response) => {
        //Update the UI of React to display data and determine if search not found with alert
        if (response.data.Search) {
          this.setState({ 
            movies: response.data.Search,
            text: ''
          })
        } else {
          alert('no movies found please search again')
        }
      })
      .catch((error) => {
        //Update the ui to display the error
        throw error
      })
  }


  handleTextChange(event) {
    this.setState({ text: event.target.value })
  }


  render() {
    const { text, movies } = this.state;
    return (
      <div className='container'>
        <div className='jumbotron'>
          <h1 className='text-center'> Movie Finder </h1>
          <h3 className='text-center'> Search your favorite movies</h3>
        </div>
        <div>
          <form className='form-row'>
            <input className='' value={text} onChange={this.handleTextChange} placeholder='search movies here...' />
            <button className='btn search-movies' type='submit' onClick={this.searchMovies}>Search</button>
          </form>
          {
            movies.length === 0 ?
              <></>
              :
              <div>
                <ul className='format'>
                  {this.state.movies.map((movie, index) => {
                    return (
                      <MovieResults
                        key={index}
                        movie={movie}
                      />)
                  })}
                </ul>
              </div>
          }
        </div>
      </div>
    );
  }
};
