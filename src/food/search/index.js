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

var Loading 	= require('../../components/Loading');
var Item 		= require('../item/index');
var SearchBox 	= require('./searchBox');

var SearchSence = React.createClass({

	fetchData: function() {
		var body = {
			authorization: '3.ZHF5y/1tLqAkN/Y22H0PKYZgjTjxzbLyb6puwN8NjGU=',
			category_id: 0,
			crowd: 0,
			matters: 0,
			title: this.state.searchText || '',
			start: 0,
			size: 10
		};
		var serialize = function(data) {
			return Object.keys(data).map(function(keyName) {
				return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
			}).join('&');
		};
		console.log('food.search.index.fetchData,');

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
 			searching: false,
			dataSource: dataSource,
			searchText:'',
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
	  		</View>
  		); 
	},

	renderHeader:function(){
		return (
			<View style={{backgroundColor:'#ffffff'}}>
				<SearchBox autoFocus={true} onEndEditing={this.onEndEditing}/>
			</View> 
			);
	},

	renderLoadedView:function(){
		return this.state.dataSource._cachedRowCount ? this.renderFillView() : this.renderEmptyView();
	},
	
	renderLoadingView:function(){
		return (
			<View > 
  	 			<Loading />
			</View>
		);
	},
	renderFillView:function(){
		return (<ListView
 				  dataSource={this.state.dataSource}
				  renderRow={this.renderRow} />);
	},

	renderEmptyView:function(){
		var self=this;
		function searchingView(){return (<View style={[styles.centering,{flexDirection:'row'}]}><Text>没有找到</Text><Text style={{color:'red'}}> {self.state.searchText} </Text><Text>的结果哦～</Text></View>);}
		function defalutView(){return (<View style={[styles.centering,{flexDirection:'row'}]}><Text>请输入查询</Text></View>);}
		
		return (
			<View >
				{this.state.searchText ? searchingView():defalutView()}
			</View>
		);
	},

	renderRow: function(item) {
		return ( 
			<Item item={item} onPress= {() => this.onPressItem(item) }/> 
  		);
	},

	onEndEditing:function(text){
		console.log('food.search.index.onEndEditing,');
		console.log(text);
		if (text) {
			this.setState({
				searching: true,
				searchText: text
			});
			this.fetchData();
		} else {
			this.props.navigator.pop();
		}
	},

	onPressItem:function(item){
		this.openItemDetail(item);
	},

	openItemDetail: function(item) {
		this.props.navigator.push({
			name:'detail',
			title: item.title,
			passProps: item
		});
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


module.exports = SearchSence;