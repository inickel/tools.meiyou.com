/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
} = React;

var Component = React.createClass({
  render: function() {
    return (
      <View />
    );
  },
  show:function(){
  	this.props.navigator;
  }

});


var styles = StyleSheet.create({

});


module.exports = Component;
