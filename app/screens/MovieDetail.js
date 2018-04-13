import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import api from '../config/api';
import Me2 from '../screens/Me2';

class MovieDetail extends Component {

  // addToBucket(fbid, movieid) = () => {
  //   api.addToBucket(fbid, movieid).then((res) => {
  //     console.log(res)
  //   })
  // };


  render() {
    console.log(Me2);
    const { popularity, overview } = this.props.navigation.state.params;
    // if(this.state.userInfo) {const { fbid } = this.state.userInfo.id};
    return (
      <ScrollView>
        <List>
          <ListItem
            title="Email"
            rightTitle={popularity}
            hideChevron
          />
          <ListItem
            title="Movie Id"
            rightTitle={overview}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

// <Button
// title="Add to Movie Bucket"
// buttonStyle={{ marginTop: 20 }}
// onPress={this.addToBucket(fbid, id)}
// />
export default MovieDetail;
