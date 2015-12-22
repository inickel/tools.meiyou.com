'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var Button = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
    Text:React.propTypes.string
  },
  render: function() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        activeOpacity={0.9} underlayColor={'#cccccc'}>
        <Text>
          	{this.props.children}
        </Text>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  button: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
});

module.exports = Button;
