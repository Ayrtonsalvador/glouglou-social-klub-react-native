import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';

import MessageVigneron from '../ScreensVigneron/MessageVigneron';

import { connect } from 'react-redux';

function MessageCavistes({ navigation }) {

  if (userstatus == "Vigneron") {
    return (<MessageVigneron navigation={navigation}/>)
  } else {

    return (
    <View style={{ flex: 1 }}>

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
          navigation.navigate('ChatCaviste');
        }}>
      </Button>

    </View>
  );
}}

function mapStateToProps(state){
  return {token: state.token}
}

export default connect(
  mapStateToProps,
  null
)(MessageCavistes);