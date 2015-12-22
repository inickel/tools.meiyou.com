/* @flow */
'use strict';

var React = require('react-native');
var {
	StyleSheet,
	View,
	ListView,
	Image,
	Text,
	TouchableHighlight,
} = React;


var Item 			=require('./gridCell');
var Loading 		=require('../../components/Loading');

var CategoryGrid 	= React.createClass({
	fetchData: function() {

		var api = 'http://test.tools.seeyouyima.com/taboo/category?authorization=3.ZHF5y%2F1tLqAkN%2FY22H0PKYZgjTjxzbLyb6puwN8NjGU%3D&size=100';
		fetch(api, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			})
			.then((response) => {
				var json = response.json();
				return json;
			})
			.then((json) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(json),
					loading: false
				});
			})
			.done();
	},
	componentDidMount: function() {
		this.fetchData();
	},
	getInitialState: function() {
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		return {
			dataSource: dataSource,
			loading: true,
		};
	},
	renderRow:function(item){
        return (
        	<Item item={item} onPress={this.onPressItem} />
		);
 	},
  	render: function() {
		return this.state.loading ? this.renderLoadingView() : this.renderLoadedView();
	},
	renderFailView:function(){},
  	renderLoadingView:function(){
  		return (
  			<View style={styles.container}>
				<Loading />
			</View>
		);
  	},
  	renderLoadedView:function(){
 		return (
  			<View style={styles.container}>
					<ListView
							style={{flex:1}}
							automaticallyAdjustContentInsets={true}
							contentContainerStyle={styles.contentContainer}
							dataSource={this.state.dataSource}
							renderRow={this.renderRow} />
			</View>
		);
 	},
	onPressItem:function(item){
		this.props.onPressItem && this.props.onPressItem(item);
	}
});

var styles = StyleSheet.create({
	container: {
		flex:1,
 		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingBottom:10
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#eeeeee',
		flex: 1,
		paddingBottom:20
	}
});


module.exports = CategoryGrid;
