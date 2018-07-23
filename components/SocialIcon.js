import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class SocialIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ paddingRight: 8 }}
        color='rgba(33, 131, 196, 1)'
      />
    );
  }
}