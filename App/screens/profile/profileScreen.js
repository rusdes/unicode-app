import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends React.Component {
  state = {
    name: '',
    number: '',
    email: '',
  };

  componentDidMount = () => {
    AsyncStorage.getItem('name').then((value) => this.setState({name: value}));
    AsyncStorage.getItem('number').then((value) =>
      this.setState({number: value}),
    );
    AsyncStorage.getItem('email').then((value) =>
      this.setState({email: value}),
    );
  };

  clearAll = () => {
    AsyncStorage.setItem('name', '');
    this.setState({name: ''});
    AsyncStorage.setItem('number', '');
    this.setState({number: ''});
    AsyncStorage.setItem('email', '');
    this.setState({email: ''});
  };

  setName = (value) => {
    AsyncStorage.setItem('name', value);
    this.setState({name: value});
  };

  setNumber = (value) => {
    AsyncStorage.setItem('number', value);
    this.setState({number: value});
  };

  setEmail = (value) => {
    AsyncStorage.setItem('email', value);
    this.setState({email: value});
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        <View style={{padding: 10}}>
          <TextInput
            label="Enter Your Name"
            value={this.state.name}
            mode="outlined"
            onChangeText={this.setName}
          />
          <TextInput
            style={{paddingTop: 10}}
            label="Enter Your Phone Number"
            value={this.state.number}
            mode="outlined"
            keyboardType="phone-pad"
            onChangeText={this.setNumber}
          />
          <TextInput
            style={{paddingTop: 10}}
            label="Enter Your Email Address"
            value={this.state.email}
            mode="outlined"
            keyboardType="email-address"
            onChangeText={this.setEmail}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={this.clearAll}
            style={styles.button}>
            Clear
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 100,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  textInput: {
    justifyContent: 'center',
    borderColor: 'black',
    backgroundColor: '#D3D3D3',
    width: 300,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 25,
  },
  button: {
    bottom: 10,
  },
});
