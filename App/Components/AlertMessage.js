

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyle'
import * as Animatable from 'react-native-animatable'
import { Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/Ionicons'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.addComponentExample('Alert Message', () =>
  <View>
    <AlertMessage
      title='Alert Message with animation'
    />
    <AlertMessage
      title='Never see me'
      show={false}
    />
  </View>
)

type AlertMessageProps = {
  title: string,
  icon?: string,
  style?: Object,
  iconStyle?: Object,
  titleStyle?: Object,
  show?: bool
};

export default class AlertMessage extends React.Component {
  static defaultProps: { show: boolean }

  props: AlertMessageProps

  render () {
    let messageComponent = null
    if (this.props.show) {
      const { title } = this.props
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <Animatable.View
          style={[styles.container, this.props.style]}
          delay={800}
          animation='bounceIn'
        >
          <View style={styles.contentContainer}>
            <Icon
              name={this.props.icon || 'ios-alert'}
              size={Metrics.icons.large}
              style={[styles.icon, this.props.iconStyle]}
            />
            <Text allowFontScaling={false} style={[styles.message, this.props.titleStyle]}>{title && title.toUpperCase()}</Text>
          </View>
        </Animatable.View>
        </View>
      )
    }

    return messageComponent
  }
}

AlertMessage.defaultProps = {
  show: true
}
