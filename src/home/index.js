 'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	Navigator
 } = React;

var data = require('./mock');


var styles = StyleSheet.create({
	navigator: {
		flex: 1,
	},
	root: {
		flex:1,
		paddingTop:10,
		backgroundColor: '#dedede'
	}
});

var Item = require('./item');

var HomeScene = React.createClass({
	renderScene:function(route,navigator){
		return (
			<View style={styles.root}>
				{this.renderItem()}
			</View>
		);
	},
	render: function() {
		return this.renderScene();
	},
	renderItem:function(){
	  	return (
			<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'} onPress={()=>{this.onPress(data.food)}} style={styles.container}>
	      		<View>
	      			<Item data={data.food}></Item>
	      		</View>
			</TouchableHighlight>
	    );
  	},
	onPress: function(item) {
		this.props.navigator.push({
			name:'food',
			title: item.title,
			passProps:item,
 		});
	}
});

module.exports = HomeScene;