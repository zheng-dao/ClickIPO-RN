/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import {
  Platform,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux'
import Logger from '../Lib/Logger'

import {
  Images,
} from '../Themes'

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: '#0A0A0A',
    fontSize: 18,
    width: 180,
    alignSelf: 'center',
  },
  titleWrapper: {
    marginTop: 10,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 24,
      },
      android: {
        top: 2,
      },
    }),
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: '#EFEFF2',
    paddingTop: 0,
    top: 0,
    ...Platform.select({
      ios: {
        height: 56,
      },
      android: {
        height: 56,
      },
    }),
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',

  },
  backButton: {
    height: 37,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 24,
      },
      android: {
        top: 2,
      },
    }),
    left: 2,
  },
  rightButton: {
    height: 37,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 24,
      },
      android: {
        top: 2,
      },
    }),
    right: 2,
  },
  leftButton: {
    height: 37,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 24,
      },
      android: {
        top: 2,
      },
    }),
    left: 2,
  },
  barRightButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'right',
    fontSize: 17,
  },
  barBackButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'left',
    fontSize: 17,
    paddingLeft: 6,
  },
  barLeftButtonText: {
    color: 'rgb(0, 122, 255)',
    textAlign: 'left',
    fontSize: 17,
  },
  backButtonImage: {
    width: 13,
    height: 21,
  },
  defaultImageStyle: {
    height: 24,
    resizeMode: 'contain',
  },
  View:{
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'flex-end'
  },
  buttonImageView:{
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'flex-start'
  },
  navigationBarBackgroundImage:{
    flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
  },

});

const propTypes = {
  navigationState: PropTypes.object,
  backButtonImage: PropTypes.source,
  wrapBy: PropTypes.any,
  component: PropTypes.any,
  backButtonTextStyle: PropTypes.style,
  leftButtonStyle: PropTypes.style,
  leftButtonIconStyle: PropTypes.style,
  getTitle: PropTypes.func,
  titleWrapperStyle: PropTypes.style,
  titleStyle: PropTypes.style,
  titleOpacity: PropTypes.number,
  titleProps: PropTypes.any,
  position: PropTypes.object,
  navigationBarStyle: PropTypes.style,
  navigationBarBackgroundImage: PropTypes.source,
  renderTitle: PropTypes.any,

};

const contextTypes = {
  drawer: PropTypes.object,
};

const defaultProps = {
  drawerImage: null,
  backButtonImage: null,
  titleOpacity: 1,
};

class NavBar extends React.Component {


  constructor(props) {
    super(props);
    //Logger.log({ name: 'NavBar.constructor()', props: props })

    this.renderRightButton = this.renderRightButton.bind(this);
    this.renderBackButton = this.renderBackButton.bind(this);
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderTitle = this.renderTitle.bind(this);


  }

  componentWillReceiveProps = (newProps) => {
    //Logger.log({ name: 'NavBar.componentWillReceiveProps()', newProps: newProps })

    // if (Platform.OS === 'android' ){
    //   this.setState({ navigationBackgroundImage : Images.navigationBackgroundBlue})
    // }

  }

  componentWillMount () {
    //Logger.log({ name: 'NavBar.componentWillMount()'})
  }

  renderBackButton() {
    const state = this.props.navigationState;
    const childState = state.children[state.index];
    const BackButton = (childState.component && childState.component.backButton) || state.backButton
      || childState.backButton;
    const textButtonStyle = [
      styles.barBackButtonText,
      this.props.backButtonTextStyle,
      state.backButtonTextStyle,
      childState.backButtonTextStyle,
    ];
    const style = [
      styles.backButton,
      this.props.leftButtonStyle,
      state.leftButtonStyle,
      childState.leftButtonStyle,
    ];

    if (state.index === 0 && (!state.parentIndex || state.parentIndex === 0)) {
      return null;
    }

    if (BackButton) {
      return (
        <BackButton
          testID="backNavButton"
          textButtonStyle={textButtonStyle}
          {...childState}
          style={style}
        />
      );
    }
    const buttonImage = childState.backButtonImage ||
      state.backButtonImage || this.props.backButtonImage;
    let onPress = childState.onBack || childState.component.onBack;
    if (onPress) {
      onPress = onPress.bind(null, state);
    } else {
      onPress = Actions.pop;
    }

    const text = childState.backTitle ?
      (<Text style={textButtonStyle}>
        {childState.backTitle}
      </Text>)
      : null;

    return (
      <TouchableOpacity
        testID="backNavButton"
        style={style}
        onPress={onPress}
      >
        {buttonImage && !childState.hideBackImage &&
          <Image
            source={buttonImage}
            style={[
              styles.backButtonImage,
              this.props.leftButtonIconStyle,
              state.barButtonIconStyle,
              state.leftButtonIconStyle,
              childState.leftButtonIconStyle,
            ]}
          />
        }
        {text}
      </TouchableOpacity>
    );
  }

  renderRightButton(navProps) {
    const self = this;
    function tryRender(state, wrapBy) {
      if (!state) {
        return null;
      }
      const rightTitle = state.getRightTitle ? state.getRightTitle(navProps) : state.rightTitle;

      const textStyle = [styles.barRightButtonText, self.props.rightButtonTextStyle,
        state.rightButtonTextStyle];
      const style = [styles.rightButton, self.props.rightButtonStyle, state.rightButtonStyle];
      if (state.rightButton) {
        let Button = state.rightButton;
        if (wrapBy) {
          Button = wrapBy(Button);
        }
        return (
          <Button
            {...self.props}
            {...state}
            key={'rightNavBarBtn'}
            testID="rightNavButton"
            style={style}
            textButtonStyle={textStyle}
          />
        );
      }
      if (state.onRight && (rightTitle || state.rightButtonImage)) {
        const onPress = state.onRight.bind(null, state);
        return (
          <TouchableOpacity
            key={'rightNavBarBtn'}
            testID="rightNavButton"
            style={style}
            onPress={onPress}
          >
            {rightTitle &&
              <Text style={textStyle}>
                {rightTitle}
              </Text>
            }
            {state.rightButtonImage &&
              <View style={styles.View}>
                <Image
                  source={state.rightButtonImage}
                  style={state.rightButtonIconStyle}
                />
              </View>
            }
          </TouchableOpacity>
        );
      }
      return null;
    }
    return tryRender(this.props.component, this.props.wrapBy) || tryRender(this.props);
  }

  renderLeftButton(navProps) {
    const self = this;
    const drawer = this.context.drawer;
    function tryRender(state, wrapBy) {
      let onPress = state.onLeft;
      let buttonImage = state.leftButtonImage;
      let menuIcon = state.drawerIcon;
      const style = [styles.leftButton, self.props.leftButtonStyle, state.leftButtonStyle];
      const textStyle = [styles.barLeftButtonText, self.props.leftButtonTextStyle,
        state.leftButtonTextStyle];
      const leftButtonStyle = [styles.defaultImageStyle, state.leftButtonIconStyle];
      const leftTitle = state.getLeftTitle ? state.getLeftTitle(navProps) : state.leftTitle;

      if (state.leftButton) {
        let Button = state.leftButton;
        if (wrapBy) {
          Button = wrapBy(Button);
        }
        return (
          <Button
            {...self.props}
            {...state}
            key={'leftNavBarBtn'}
            testID="leftNavButton"
            style={style}
            textStyle={textStyle}
          />
        );
      }

      if (!onPress && !!drawer && typeof drawer.toggle === 'function') {
        buttonImage = state.drawerImage;
        if (buttonImage || menuIcon) {
          onPress = drawer.toggle;
        }
        if (!menuIcon) {
          menuIcon = (
            <Image
              source={buttonImage}
              style={leftButtonStyle}
            />
          );
        }
      }

      if (onPress && (leftTitle || buttonImage)) {
        onPress = onPress.bind(null, state);
        return (
          <TouchableOpacity
            key={'leftNavBarBtn'}
            testID="leftNavButton"
            style={style}
            onPress={onPress}
          >
            {leftTitle &&
              <Text style={textStyle}>
                {leftTitle}
              </Text>
            }
            {buttonImage &&
              <View style={styles.buttonImageView}>
                {menuIcon || <Image
                  source={buttonImage}
                  style={state.leftButtonIconStyle || styles.defaultImageStyle}
                />
                }
              </View>
            }
          </TouchableOpacity>
        );
      }
      return null;
    }
    return tryRender(this.props.component, this.props.wrapBy) || tryRender(this.props);
  }

  renderTitle(childState, index:number) {
    let title = this.props.getTitle ? this.props.getTitle(childState) : childState.title;
    if (title === undefined && childState.component && childState.component.title) {
      title = childState.component.title;
    }
    if (typeof (title) === 'function') {
      title = title(childState);
    }
    return (
      <Animated.View
        key={childState.key}
        style={[
          styles.titleWrapper,
          this.props.titleWrapperStyle,
        ]}
      >
        <Animated.Text
          lineBreakMode="tail"
          numberOfLines={1}
          {...this.props.titleProps}
          style={[
            styles.title,
            this.props.titleStyle,
            this.props.navigationState.titleStyle,
            childState.titleStyle,
            {
              opacity: this.props.position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0, this.props.titleOpacity, 0],
              }),
              left: this.props.position.interpolate({
                inputRange: [index - 1, index + 1],
                outputRange: [200, -200],
              }),
              right: this.props.position.interpolate({
                inputRange: [index - 1, index + 1],
                outputRange: [-200, 200],
              }),
            },
          ]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    );
  }

  render() {


    let state = this.props.navigationState;
    let selected = state.children[state.index];
    while ({}.hasOwnProperty.call(selected, 'children')) {
      state = selected;
      selected = selected.children[selected.index];
    }
    const navProps = { ...this.props, ...selected };

    const wrapByStyle = (component, wrapStyle) => {
      if (!component) { return null; }
      return props => <View style={wrapStyle}>{component(props)}</View>;
    };

    const leftButtonStyle = [styles.leftButton, { alignItems: 'flex-start' }];
    const rightButtonStyle = [styles.rightButton, { alignItems: 'flex-end' }];

    const renderLeftButton = wrapByStyle(selected.renderLeftButton, leftButtonStyle) ||
      wrapByStyle(selected.component.renderLeftButton, leftButtonStyle) ||
      this.renderLeftButton;
    const renderRightButton = wrapByStyle(selected.renderRightButton, rightButtonStyle) ||
      wrapByStyle(selected.component.renderRightButton, rightButtonStyle) ||
      this.renderRightButton;
    const renderBackButton = wrapByStyle(selected.renderBackButton, leftButtonStyle) ||
      wrapByStyle(selected.component.renderBackButton, leftButtonStyle) ||
      this.renderBackButton;
    const renderTitle = selected.renderTitle ||
      selected.component.renderTitle ||
      this.props.renderTitle;
    const navigationBarBackgroundImage = this.props.navigationBarBackgroundImage ||
      state.navigationBarBackgroundImage;
    const contents = (
      <View style={{flex:1}}>
        {renderTitle ? renderTitle(navProps) : state.children.map(this.renderTitle, this)}
        {renderBackButton(navProps) || renderLeftButton(navProps)}
        {renderRightButton(navProps)}
      </View>
    );
    return (
      <Animated.View
        style={[
          styles.header,
          this.props.navigationBarStyle,
          state.navigationBarStyle,
          selected.navigationBarStyle,
        ]}
      >
        {navigationBarBackgroundImage ? (
          <Image source={navigationBarBackgroundImage} style={styles.navigationBarBackgroundImage}>
            {contents}
          </Image>
        ) : contents}
      </Animated.View>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.contextTypes = contextTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
