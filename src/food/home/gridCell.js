/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
} = React;
var {width, height} = Dimensions.get('window');

var Item = React.createClass({
  	render: function() {
    	return (
 			<TouchableHighlight style={styles.itemWrap} activeOpacity={0.9} underlayColor={'#cccccc'} onPress = {this.onPress}>
				<View style={styles.itemCont}>
					<Image style={styles.thumbnail} source={{uri:this.props.item.icon}} />
					<View>
						<Text style={styles.title}>{this.props.item.title}</Text>
					</View>
				</View>
			</TouchableHighlight>
      	);
  	},
	onPress:function( ){
		this.props.onPress ? this.props.onPress(this.props.item) : () => {};
	}

});

var styles = StyleSheet.create({
	listView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#eeeeee'
	},

	itemCont: {
		alignItems: 'center'
	},

	itemWrap: {
		marginTop: 10,
		marginLeft: 10,
		borderRadius: 3,
		padding: 6,
		width:(width/3)-15,
		backgroundColor: '#ffffff'
	},

	title: {
		color: '#999999',
		fontSize: 16,
		fontWeight: '500'
	},

	thumbnail: {
		width: 75,
		height: 75,
		margin: 10
	}
});


module.exports = Item;
