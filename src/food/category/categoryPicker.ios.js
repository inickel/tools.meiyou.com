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

var data = require('../home/mock');

var Item=React.createClass({
	render:function(){
		return (
			<View style={{margin:5}}>
 				<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'}  onPress={()=>{this.onSelect(this.props.item)}} >
					<View style={[styles.item,this.props.item.selected?styles.selected:styles.normal]}>
						<Text style={[styles.itemText]} >{this.props.item.title}</Text>
					</View>
				</TouchableHighlight>
			</View>
 		);
	},
	onSelect:function(item){
		this.props.onPress ? this.props.onPress(item) : () => {};
	}
});

var PickerView = React.createClass({
 	 
	componentWillMount:function(){
    	this._pressData = {};
	},
  	_pressData: ({}: {[key: number]: boolean}),

	getInitialState: function() {
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		var hasDefault = false;
		data.map((item) => {
			item.selected = false;
			if (item.id == 0) {
				hasDefault = true;
			}
		});
		if (!hasDefault) {
			data.push({
				id: 0,
				title: '食物分类',
				sort: 0,
				selected: true
			});
		}

		data.sort((r1, r2) => {
			return r1.sort > r2.sort ? 1 : -1;
		});
		return {
			data: data,
			animated: true,
			modalVisible: false,
			transparent: false,
			dataSource: dataSource.cloneWithRows(data),
			selectedItem: data[0],
		};
	},
	render: function() {
		console.log('render');
		var self=this;
		return (
			<Modal
	          animated={this.state.animated}
	          transparent={this.state.transparent}
	          visible={this.state.modalVisible}>
				<View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1,justifyContent:'flex-end'}}>
					<View style={{flex:1,flexDirection:'column',justifyContent:'flex-end'}}>
					<View style={{}}>
						<View style={[styles.container,styles.header]}>
							<View style={{flex:1,alignItems:'flex-start'}}>
								<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'}  onPress={this.hide} >
									 <View style={[styles.button,styles.cancel]}><Text style={styles.buttonText}>取消</Text></View>
								</TouchableHighlight>
							</View>
							<View style={{flex:1,alignItems:'flex-end'}}>
								<TouchableHighlight activeOpacity={0.9} underlayColor={'#cccccc'}  onPress={this.onSure}>
									 <View style={[styles.button,styles.sure]}><Text style={styles.buttonText}>确定</Text></View>
								</TouchableHighlight>
							</View>
						</View>
						<View style={[styles.container,{flex:1,position:'relative'}]}>
							<ListView ref='listView'
								automaticallyAdjustContentInsets={false}
								contentContainerStyle={styles.listView}
								dataSource={this.state.dataSource}
								renderRow={this.renderRow} />
						</View>
					</View>
					</View>
 				</View>
		    </Modal>
		);
	},
	renderRow:function(item,sectionID, rowID, highlightRow){
		return (<Item  onPress={this.onSelect}  item={item}  />);
	},
	show: function() {
		this.setState({
			transparent: true,
			modalVisible: true
		});
	},
	hide: function() {
		this.setState({
			transparent: false,
			modalVisible: false
		});
	},
	onSelect: function(item) {
		this._pressData[item.id] = !this._pressData[item.id];
		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		var data=this.state.data;
		data.map((row)=>{row.selected=(row.id==item.id);});
  		this.setState({
			selectedItem: item,
			dataSource:dataSource.cloneWithRows(data)
		});
  	},
  	onSure:function(){
  		var item=this.state.selectedItem;
		this.props.onItemSelected?this.props.onItemSelected(item):()=>{};
  	}
});

var styles = StyleSheet.create({
	container: {
 		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		padding:5
	},
	listView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#ffffff',
		flex: 1,
		padding: 5,

	},
	itemCont: {
		alignItems: 'center',
	},
	itemWrap: {
		
	},
	header: {
		flex: 1,
		position: 'relative',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#bbbbbb',
		borderBottomWidth: 1,
		borderTopWidth:1
	},
	button: {
		width:60,
		padding: 5,
		borderRadius: 5,
		alignItems:'center',
	},
	buttonText:{
		textAlign:'center',
		color:'#ffffff',
		fontWeight:'600',
	},
	cancel: {
		backgroundColor: '#cccccc'
	},
	sure: {
		backgroundColor: 'pink',
 	},
 	item:{
 		minWidth:100,
 		justifyContent:'center',
		alignItems:'center',
 		borderRadius:3,
 		borderWidth:1,
 	},
	normal: {
 		borderColor: '#ffffff'
	},
	selected: {
 		borderColor: 'pink'
	},
	itemText:{flex:1,padding:5,justifyContent:'center',alignItems:'center'}
});


module.exports = PickerView;