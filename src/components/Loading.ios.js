/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  ActivityIndicatorIOS
} = React;

var LoadingView = React.createClass({
  
  render: function() {
    return (
			<View>
				<ActivityIndicatorIOS
					animating={this.props.searching}
					style={[styles.centering, {height: 80}]}
					size="large" />
			</View>
		);
  }
});


var styles = StyleSheet.create({

});


module.exports = LoadingView;
