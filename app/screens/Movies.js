import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import api from '../config/api';

class Movies extends Component {
    state = {
      movies: []
    };

  componentWillMount() {
    api.getMovies().then((res) => {
      this.setState({
        movies: res.results
      })
    })
  }

  onLearnMore = (movie) => {
    this.props.navigation.navigate('MovieDetails', { ...movie });
  };

  render() {
    console.log(this.props)
    return (
      <ScrollView>
        <List>
          {this.state.movies.map((movie) => (
            <ListItem
              key={movie.title}
              title={`${movie.title.toUpperCase()}`}
              subtitle={movie.release_date}
              onPress={() => this.onLearnMore(movie)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Movies;
