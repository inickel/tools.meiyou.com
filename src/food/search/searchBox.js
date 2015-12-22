/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  ListView,
  TextInput
} = React;

var SearchBar = React.createClass({
	getInitialState: function() {
		return {
			searching:false,
			searchText:''
		}
	},
  	render: function() {
 	    return (
	      <View style={styles.searchBar}>
	      	<TextInput 
	      		autoFocus={this.props.autoFocus||false}
 	      		style={styles.inputBox} 
	      		onFocus={this.onFocus}
	      		onSubmitEditing={this.onEndEditing}
	      		onChangeText={this.onChangeText}
	      		onBlur={this.onBlur}
  	      		placeholder='请输入要查询的食物名称哟!' />
	      </View>
	    );
  	},
  	onBlur:function(){
  		if(!this.state.searchText){
  			//this.onEndEditing();
  		}
  	},
  	onChangeText:function(newVal){
		this.setState({
			searchText: newVal
		});
	},
  	onEndEditing:function(){
		this.props.onEndEditing && this.props.onEndEditing(this.state.searchText);
	},
  	onFocus:function(){
		this.props.onFocus ? this.props.onFocus() : () => {};
	}
});

var styles = StyleSheet.create({
	searchBar:{
 		padding:5,
		backgroundColor:'#ffffff',
		alignItems:'center'
	},
	inputBox:{
		fontSize:14,
		flex:9,
		borderRadius:4,
		backgroundColor:'#dddddd',
		height:30,padding:4
	}
});


module.exports = SearchBar;
