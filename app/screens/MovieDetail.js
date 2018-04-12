import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import api from '../config/api';

class MovieDetail extends Component {

  addToBucket(fbid, movieid) = () => {
    api.addToBucket(fbid, movieid).then((res) => {
      console.log(res)
    })
  };


  render() {
    const { popularity, overview, id } = this.props.navigation.state.params;
    const { fbid } = this.state.userInfo.id;
    return (
      <ScrollView>
        <List>
          <ListItem
            title="Email"
            rightTitle={popularity}
            hideChevron
          />
          <ListItem
            title="Facebook Id"
            rightTitle={fbid}
            hideChevron
          />

        </List>
        <Button
          title="Add to Movie Bucket"
          buttonStyle={{ marginTop: 20 }}
          onPress={this.addToBucket(fbid, id)}
        />
      </ScrollView>
    );
  }
}

export default MovieDetail;
