import React from 'react';
import { Image, Button, StyleSheet, Text, View} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { AuthSession } from 'expo';

const FB_APP_ID = '216719122414764';

class Me2 extends React.Component {
  state = {
    userInfo: null,
    favorite: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!this.state.userInfo ? (
          <Button title="Open FB Auth" onPress={this._handlePressAsync} />
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
        <Button title="See my movies" onPress={this.getBucket(this.state.userInfo.id)} />
      </View>
    );
  };

  getBucket(id) {
    api.getBucket(id).then((res) => {
      console.log('get bucket response is...': res);
      this.setState({
        favorite: res.results
      })
    })
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
    console.log('user info is... '+userInfo);
    this.setState({ userInfo });
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