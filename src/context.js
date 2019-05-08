import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
   switch (action.type) {
     default:case 'SEARCH_TRACKS':
      return {
         ...state, 
         track_list: action.payload,
         heading: 'Search Results'
      }
   }
}

export class Provider extends Component {

  state = {
    track_list : [],
    heading: '',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=it&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      this.setState({track_list: res.data.message.body.track_list, heading: 'Top 10 Tracks '});
    })
    .catch(err => console.log(err))
  };
  render() {
  console.log(this.state);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer =Context.Consumer