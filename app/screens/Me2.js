import React from 'react';
import { Image, Button, StyleSheet, Text, View} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { AuthSession } from 'expo';
import api from '../config/api';
API_KEYS = require('../config/configKeys.js');

const FB_APP_ID = API_KEYS.FB_APP_ID;

class Me2 extends React.Component {
  state = {
    userInfo: null,
    favorite: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!this.state.userInfo ? (
          <Button title='Login via Facebook' onPress={this._handlePressAsync} />
        ) : (
          this._renderUserInfo()
        )}
      </View>
    );
  }

  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: this.state.userInfo.picture.data.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20 }}>{this.state.userInfo.name}</Text>
        <Text>ID: {this.state.userInfo.id}</Text>
        <Text>Friends: {this.state.userInfo.friends}</Text>
        <Text>Favorites: {this.state.favorite}</Text>
        </View>
    );
  };

  getMovies(id) {
    api.getBucket(id).then((res) => {console.log(res)})
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();

    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    if (result.type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    }

    let accessToken = result.params.access_token;
    let userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=friends,id,name,picture.type(large)`
    );
    const userInfo = await userInfoResponse.json();
    const favorite = await api.getBucket(userInfo.id);
    this.setState({ userInfo });
    // this.setState({ favorite });
    console.log(favorite.json());
  };
}

export default Me2;

// You need to add this url to your authorized redirect urls on your Facebook app
// console.log({ redirectUrl });

// NOTICE: Please do not actually request the token on the client (see:
// response_type=token in the authUrl), it is not secure. Request a code
// instead, and use this flow:
// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
// The code here is simplified for the sake of demonstration. If you are
// just prototyping then you don't need to concern yourself with this and
// can copy this example, but be aware that this is not safe in production.
