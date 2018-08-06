# react-native-swipeable-view-wrapper ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A pure JS react native wrapper component to make your views support swipe gestures.

## Demo

You can see a live demo [here](https://exp.host/@otacon/react-native-swipeable-view-demo)

### Installation

```
  npm install react-native-swipeable-view-wrapper --save
```

### Usage

```
 import SwipeableView from "react-native-swipeable-view-wrapper";

 class SwipeableViewExample extends Component {

   onSwipeRight = () => console.log("swiped right!");
   onSwipeLeft = () => console.log("swiped left!");

   render() {
     return (
       <SwipeableView
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
       >
        ...
       </SwipeableView>
    );
  }

}

```

### Roadmap
  - add support for multiple different animations

### Properties
Property | Description | Default | Type
------|-------------|----------|-----------
style | style applied to the wrapper component  | null | Object
vertical | make the component swipeable vertically | true (only if horizontal is not set) | Boolean
horizontal | make the component swipeable horizontally | false | Boolean
duration | duration of the release animation | 150 | Number
bounciness | bounciness of the spring animation on release (the lower, the bouncier) | 100 | Number
onlyUp | make the component only swipeable upwards | false | Boolean
onlyRight | make the component only swipeable to the right | false | Boolean
onlyDown | make the component only swipeable downwards | false | Boolean
onlyLeft | make the component only swipeable to the left | false | Boolean
onSwipeUp | callback to execute after component was swiped upwards | null | Function
onSwipeRight | callback to execute after component was swiped to the right | null | Function
onSwipeDown | callback to execute after component was swiped downwards | null | Function
onSwipeLeft | callback to execute after component was swiped to the left | null | Function
onCancel | callback to execute if the component swipe gesture didn't reach the threshold | null | Function
requiredTranslationY | porcentual value of the screen's height that the gesture must reach to swipe successfully | 0.25 | Number
requiredTranslationX | porcentual value of the screen's width that the gesture must reach to swipe succesfully | 0.1 | Number
_resetOnAnimationEnd | make the inner component reappear on default location after 1000ms | false | Boolean


### License
MIT
