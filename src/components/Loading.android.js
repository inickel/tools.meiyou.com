/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text
} = React;

var LoadingView = React.createClass({
  render: function() {
    return (
      <View>
      	<Text>loading....</Text>
      </View>
    );
  }
});


var styles = StyleSheet.create({

});


module.exports = LoadingView;
