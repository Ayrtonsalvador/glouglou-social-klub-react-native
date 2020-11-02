
import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

function MessageVigneron({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Image source={require('../assets/mescontacts.png')} style={{width:20, height: 30}}></Image>
      </Header>
      <ListItem
          title="Jean Pierre"
          subtitle="Merci beaucoup"
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={
            <Avatar
              rounded
              source={require('../assets/vigneron.jpg')}
            >
              <Accessory />
            </Avatar>
          }
        />
        <Button
        title="Go back"
        type="solid"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('ChatVigneron');
        }}>
      </Button>
    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo, token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(MessageVigneron);