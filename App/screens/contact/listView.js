import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  getAvatarInitials = (textString) => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.item1)}>
        <View style={styles.itemContainer}>
          <View style={styles.leftElementContainer}>
            {this.props.item1.hasThumbnail === true ? (
              <Avatar.Image
                size={24}
                source={{uri: this.props.item1.thumbnailPath}}
              />
            ) : (
              <Avatar.Text
                size={24}
                label={this.getAvatarInitials(
                  `${this.props.item1.givenName} ${this.props.item1.familyName}`,
                )}
              />
            )}
          </View>
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.titleStyle}>
                {`${this.props.item1.givenName} ${this.props.item1.familyName}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
  },
});
