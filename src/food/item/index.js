/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} = React;

var Item = React.createClass({
	getFitText: function(fit) {
		var text = '';
		switch (fit) {
			case 1:
				text = '\ue415';
				break;
			case 2:
				text = '\ue40d';
				break;
			case 3:
				text = '\ue412';
				break;
			default:
				text = '';
				break;
		}
		return text;
	},
  	render: function() {
    	return (
    	<View>
			<TouchableHighlight style={{flex:1}} activeOpacity={0.9} underlayColor={'#cccccc'} onPress = {this.onPress}>
				<View  style={styles.row}>
					<Image style={styles.icon} source={{uri:this.props.item.icon}} />
					<View>
						<Text style={styles.title}>{this.props.item.title}</Text>
						<Text style={styles.nutrition}>{this.props.item.nutrition}</Text>
						<View style={{flex:1,marginTop:5,flexDirection:'row',justifyContent:'center'}}>
							<Text style={styles.fitable}>{this.getFitText(this.props.item.pregnant_notice)+'孕妇'}</Text>
							<Text style={styles.fitable}>{this.getFitText(this.props.item.puerpera_notice)+'产妇'}</Text>
							<Text style={styles.fitable}>{this.getFitText(this.props.item.baby_notice)+'宝宝'}</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		</View>
     	);
  	},
	onPress:function( ){
		this.props.onPress ? this.props.onPress(this.props.item) : () => {};
	}

});


var styles = StyleSheet.create({
	nutrition:{marginTop:5,fontSize:14,color:'#a09a95'},
	title:{marginTop:5,fontWeight:'600',color:'#c1a581'},
	row:{
		flex:1,
		flexDirection:'row',
		padding:5,
		marginTop:5,
		backgroundColor:'#ffffff'
	},
	separator:{
		height:1,
		backgroundColor:'#aaaaaa',
		margin:5,
	},
	icon:{
		width:65,
		height:65,
		borderRadius:32.50,
		marginRight:10
	},fitable:{flex:1,fontSize:13,color:'#a09a95',}
});


module.exports = Item;
