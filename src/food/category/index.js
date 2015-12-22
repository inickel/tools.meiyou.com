/* @flow */
'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Modal,
	ListView,
  	TouchableHighlight
} = React;

var Item 			= require('../item/index');
var Loading 		= require('../../components/Loading');
var SearchBox 		= require('../search/searchBox');
var CategoryPicker 	= require('./categoryPicker');

var CategoryScene = React.createClass({

	fetchData: function() {
		//3.ZHF5y%2F1tLqAkN%2FY22H0PKYZgjTjxzbLyb6puwN8NjGU%3D
		var body = {
			authorization: '3.ZHF5y/1tLqAkN/Y22H0PKYZgjTjxzbLyb6puwN8NjGU=',
			category_id: this.state.selectedCategoryId,
			crowd: 0,
			matters: 0,
			title: '',
			start: 0,
			size: 10
		};
		var serialize = function(data) {
			return Object.keys(data).map(function(keyName) {
				return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
			}).join('&');
		};
		var api = 'http://test.tools.seeyouyima.com/taboo/search';
		fetch(api, {
				method: 'post',
				headers: {
					"Content-type": "application/x-www-form-urlencoded;"
				},
				body: serialize(body)
			})
			.then((response) => {
				var json = response.json();
				return json;
			})
			.then((json) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(json),
					searching: false
				});
			})
			.done();
	},

	getInitialState: function() {
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});

		return {
			showPicker: false,
			searching: true,
			dataSource: dataSource,
			selectedCategoryId:this.props.passProps.id || 0,
			selectedCategoryName:this.props.passProps.title||'食物分类',
			selectedGroupName:'适宜人群',
			selectedGroupId:0,
			selectedFitableName:'宜忌不限',
			selectedFitableId:0
		};
	},

	componentDidMount: function() {
		this.fetchData();
	},

	render: function() {
		return (
			<View style={{flex:1,backgroundColor:'rgb(238, 238, 238)'}}>
	 			{this.renderHeader()}
	 			{this.state.searching ? this.renderLoadingView() : this.renderLoadedView()}
				<CategoryPicker ref='picker' onItemSelected={this.pickerItemSelected} />
 	 		</View>
		);

	},
	renderPickerView:function(){
		return (<View style={styles.selectionWrap}>
	 				<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'} style={styles.selectionItem}  onPress={this.showPicker}>
	 					<Text style={{fontSize:14,color:'#a09a95'}}>{this.state.selectedCategoryName}</Text>
	 				</TouchableHighlight>
	 				<View style={styles.selectionSeperator}></View>
					<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'}  style={styles.selectionItem}>
	 					<Text style={{fontSize:14,color:'#a09a95'}}>{this.state.selectedGroupName}</Text>
	 				</TouchableHighlight>
					<View style={styles.selectionSeperator}></View>
	 				<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'}  style={styles.selectionItem}>
	 					<Text style={{fontSize:14,color:'#a09a95'}}>{this.state.selectedFitableName}</Text>
	 				</TouchableHighlight>
	 			</View>);
	},
	renderHeader:function(){
		return (
			<View style={{backgroundColor:'#ffffff'}}>
				<SearchBox onFocus={this.onFocusSearchBox}  />
 	 			{this.renderPickerView()}
			</View> 
		);
	},
	renderLoadedView:function(){
 		return (
 			<View>
	  			<ListView
					  style={{flex:1}}
					  dataSource={this.state.dataSource}
					  renderRow={this.renderRow} />
			</View>
 		);
	},
	pickerItemSelected:function(item){
 		this.refs.picker.hide();
		this.setState({
			searching:true,
			selectedCategoryName:item.title,
			selectedCategoryId:item.id
		});
		this.fetchData();
	},
	
	renderLoadingView:function(){
 		return (
	 			<Loading />
 		);
	},

	renderRow: function(item) {
		return ( 
			<View>
					<Item item={item} onPress= {() => this.onPress(item) }/> 
			</View> 
 		);
	},
	onPress:function(item){
		this.openDetail(item);
	},
	openDetail: function(item) {
		this.props.navigator.push({
			name:'detail',
			title: item.title,
			passProps: item,
			wrapperStyle:{marginTop:64}
		});
	},
	onFocusSearchBox: function( ) {
		this.openSearchScene();
	},
	openSearchScene: function(passProps) {
		this.props.navigator.push({
			name:'search',
 			title: '搜索',
			passProps: passProps
 		});
	},
	showPicker: function() {
		this.refs.picker.show();
 	}
});


var styles = StyleSheet.create({
	selectionWrap:{
		flexDirection:'row',
		padding:3,
		borderWidth:1,
		borderColor:'#cccccc',
		borderRadius:3,
		margin:3,
		backgroundColor:'#ffffff'
	},
	selectionItem:{
  		flex:1,
		padding:2,
		margin:1,
		alignItems:'center',
	},
	selectionSeperator:{
		borderRightColor:'#cccccc',
		borderRightWidth:1,
		width:1,
	},
	centering: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});


module.exports = CategoryScene;