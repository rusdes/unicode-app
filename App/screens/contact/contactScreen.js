import React, {Component} from 'react';
import {Appbar, TextInput, Button, Searchbar} from 'react-native-paper';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import ListItem from './listView';

export default class ContactScreen extends Component {
  state = {
    contacts: [],
    searchPlaceholder: 'Search',
    typeText: null,
    loading: true,
  };

  async componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts, loading: false});
      }
    });

    Contacts.getCount((count) => {
      this.setState({searchPlaceholder: `Search ${count} contacts`});
    });
  }

  onChangeSearch = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        this.setState({contacts});
      });
    }
  };

  openContact = (contact) => {
    Contacts.openExistingContact(contact, () => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
          <Appbar.Content title="Contacts" />
        </Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={this.state.searchQuery}
        />

        {this.state.loading === true ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : this.state.contacts.length > 0 ? (
          <FlatList
            data={this.state.contacts}
            renderItem={({item}) => {
              return (
                <ListItem
                  key={item.recordID}
                  item1={item}
                  onPress={this.openContact}
                />
              );
            }}
            keyExtractor={(item) => item.recordID}
          />
        ) : (
          <View> </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
