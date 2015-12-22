'use strict';

var React = require('react-native');
var {
	AppRegistry,
	Animated,
	Easing,
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} = React;
class FadeInView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0), // opacity 0
		};
	}
	componentDidMount() {
		Animated.timing( // Uses easing functions
			this.state.fadeAnim, // The value to drive
			{
				toValue: 1, // Target
				duration: 2000, // Configuration
			},
		).start(); // Don't forget start!
	}
	render() {
          return (
            <Animated.View   // Special animatable View
              style={{
                opacity: this.state.fadeAnim,  // Binds
              }}>
              {this.props.children}
            </Animated.View>
          );
    }
}
module.exports=FadeInView;