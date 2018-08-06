import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const defaults = {
  vertical: false,
  horizontal: false,
  duration: 150,
  bounciness: 100,
  requiredTranslationY: 0.25,
  requiredTranslationX: 0.1
};

isDefined = element => typeof element !== 'undefined'
isFunctionSet = func => typeof func === 'function'

export default class SwipeableView extends Component {

  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  vertical = isDefined(this.props.vertical) ? this.props.vertical : defaults.vertical;
  horizontal = isDefined(this.props.horizontal) ? this.props.horizontal : defaults.horizontal;
  duration = isDefined(this.props.duration) ? this.props.duration : defaults.duration;
  bounciness = isDefined(this.props.bounciness) ? this.props.bounciness : defaults.bounciness;
  onCancel = isDefined(this.props.onCancel) ? this.props.onCancel : undefined;
  onSwipeUp = isFunctionSet(this.props.onSwipeUp) ? this.props.onSwipeUp : undefined;
  onSwipeRight = isFunctionSet(this.props.onSwipeRight) ? this.props.onSwipeRight : undefined;
  onSwipeDown = isFunctionSet(this.props.onSwipeDown) ? this.props.onSwipeDown : undefined;
  onSwipeLeft = isFunctionSet(this.props.onSwipeLeft) ? this.props.onSwipeLeft: undefined;
  requiredTranslationY = isDefined(this.props.requiredTranslationY) ? this.props.requiredTranslationY : defaults.requiredTranslationY;
  requiredTranslationX = isDefined(this.props.requiredTranslationX) ? this.props.requiredTranslationX : defaults.requiredTranslationX;

  animatedTiming = (value, toValue, callback) => {

    Animated.timing(value, {
      toValue,
      duration: this.duration
    }).start(() => {

      isFunctionSet(callback) ? callback() : null

      if (this.props._resetOnAnimationEnd){
        setTimeout(() => {
          this.translateY.setValue(0);
          this.translateX.setValue(0);
        }, 1000);
      }

    });

  }
  animatedSpring = (value, toValue) => {
    Animated.spring(value, {
      toValue,
      friction: this.bounciness,
      tension: this.bounciness * 2
    }).start(() => isFunctionSet(this.onCancel) ? this.onCancel() : null);
  }
  animatedEvent = (value) => {
    // TODO
  }

  _panResponder = PanResponder.create({

    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderMove: (e, { dx, dy }) => {

      if (this.vertical){

        // Only Upwards gesture
        if (this.props.onlyUp && dy < 0){

          Animated.event([
            null, { dy: this.translateY }
          ])(e, { dy });

          return;
        }

        // Only Downwards gesture
        if (this.props.onlyDown && dy > 0){

          Animated.event([
            null, { dy: this.translateY }
          ])(e, { dy });

          return;
        }

        // Upwards and Downwards gesture
        if (!this.props.onlyDown && !this.props.onlyUp){

          Animated.event([
            null, { dy: this.translateY }
          ])(e, { dy });

          return;
        }

      }

      if (this.horizontal){

        // Only Upwards gesture
        if (this.props.onlyLeft && dx < 0){

          Animated.event([
            null, { dx: this.translateX }
          ])(e, { dx });

          return;
        }

        // Only Downwards gesture
        if (this.props.onlyRight && dx > 0){

          Animated.event([
            null, { dx: this.translateX }
          ])(e, { dx });

          return;
        }

        // Upwards and Downwards gesture
        if (!this.props.onlyLeft && !this.props.onlyRight){

          Animated.event([
            null, { dx: this.translateX }
          ])(e, { dx });

          return;
        }

      }

    },
    onPanResponderRelease: (e, { dx, vx, dy, vy }) => {

      const requiredTranslationY = screenHeight * this.requiredTranslationY;
      const requiredTranslationX = screenHeight * this.requiredTranslationX;

      if (this.vertical){

        // Only Upwards gesture
        if (this.props.onlyUp){

          if (dy < 0 && Math.abs(vy) >= 0.4 || Math.abs(dy) >= requiredTranslationY){
            this.animatedTiming(this.translateY, -screenHeight, this.onSwipeUp)
          } else {
            this.animatedSpring(this.translateY, 0)
          }

          return;
        }

        // Only Downwards gesture
        if (this.props.onlyDown){

          if (dy > 0 && Math.abs(vy) >= 0.4 || Math.abs(dy) >= requiredTranslationY){
            this.animatedTiming(this.translateY, screenHeight, this.onSwipeDown)
          } else {
            this.animatedSpring(this.translateY, 0)
          }

          return;
        }

        // Upwards and Downwards gesture
        if (dy > 0){
          // Movement is downwards
          if (Math.abs(vy) >= 0.4 || Math.abs(dy) >= requiredTranslationY){
            this.animatedTiming(this.translateY, screenHeight, this.onSwipeDown)
          } else {
            this.animatedSpring(this.translateY, 0)
          }
          return;

        } else {
          // Movement is upwards
          if (Math.abs(vy) >= 0.4 || Math.abs(dy) >= requiredTranslationY){
            this.animatedTiming(this.translateY, -screenHeight, this.onSwipeUp)
          } else {
            this.animatedSpring(this.translateY, 0)
          }
          return;

        }

      }

      if (this.horizontal){

        // Only to the left
        if (this.props.onlyLeft){

          if (dx < 0 && Math.abs(vx) >= 0.4 || Math.abs(dx) >= requiredTranslationX){
            this.animatedTiming(this.translateX, -screenWidth, this.onSwipeLeft)
          } else {
            this.animatedSpring(this.translateX, 0)
          }

          return;
        }

        // Only to the right
        if (this.props.onlyRight){

          if (dx > 0 && Math.abs(vx) >= 0.4 || Math.abs(dx) >= requiredTranslationX){
            this.animatedTiming(this.translateX, screenWidth, this.onSwipeRight)
          } else {
            this.animatedSpring(this.translateX, 0)
          }

          return;
        }

        // Right and Left
        if (dx > 0){
          // Movement is to the right
          if (Math.abs(vx) >= 0.4 || Math.abs(dx) >= requiredTranslationX){
            this.animatedTiming(this.translateX, screenWidth, this.onSwipeRight)
          } else {
            this.animatedSpring(this.translateX, 0)
          }

          return;

        } else {
          // Movement is to the left
          if (Math.abs(vx) >= 0.4 || Math.abs(dx) >= requiredTranslationX){
            this.animatedTiming(this.translateX, -screenWidth, this.onSwipeLeft)
          } else {
            this.animatedSpring(this.translateX, 0)
          }

          return;

        }
      }

    }

  });

  render() {

    if (this.vertical === false && this.horizontal === false)
      this.vertical = true;

    let translationStyle = {
      transform: [
        { translateY: this.translateY },
        { translateX: this.translateX }
      ]
    };

    return (
      <Animated.View style={[ translationStyle, this.props.style ]} {...this._panResponder.panHandlers }>
        { this.props.children }
      </Animated.View>
    );
  }

}

SwipeableView.propTypes = {

  style: ViewPropTypes.style,

  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  duration: PropTypes.number,
  bounciness: PropTypes.number,

  onlyUp: PropTypes.bool,
  onlyRight: PropTypes.bool,
  onlyDown: PropTypes.bool,
  onlyLeft: PropTypes.bool,

  onSwipeUp: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onSwipeDown: PropTypes.func,
  onSwipeLeft: PropTypes.func,

  onCancel: PropTypes.func,

  requiredTranslationX: PropTypes.number,
  requiredTranslationY: PropTypes.number,

  _resetOnAnimationEnd: PropTypes.bool

};
