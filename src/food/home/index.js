/* @flow */
'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	ListView,
	Text,
	TouchableHighlight,
	Image
} = React;

var CategoryGrid = require('./grid');
var SearchBox = require('../search/searchBox');

var FoodScene = React.createClass({

	getInitialState: function() {
		return {
			loading: false,
			text: ''
		};
	},
	
	render: function() {
			return (
				<View>
					<SearchBox onFocus={this.onFocusSearchBox}  />
 					<CategoryGrid onPressItem={this.onPressItem} />
 				</View>
			);
	},
	
	onPressItem: function(item) {
		this.openCategoryScene(item);
	},
	
	onFocusSearchBox: function( ) {
		this.openSearchScene();
	},
	
	openCategoryScene:function(passProps){
		this.props.navigator.push({
			name:'category',
 			title: '能不能吃',
			passProps: passProps
 		});
	},

	openSearchScene: function(passProps) {
		this.props.navigator.push({
			name:'search',
 			title: '搜索',
			passProps: passProps
 		});
	}
});

module.exports = FoodScene;