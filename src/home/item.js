var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	Navigator,
} = React;

var categoryItem = React.createClass({
	render:function(){
		return (
			<View style={styles.row}>
				<Image
			  		style={styles.thumbnail}
			  		source={{uri: this.props.data.img}} />
			  	<View style={styles.right} >
					<Text style={styles.title}>{this.props.data.title}</Text>
					<Text style={styles.desc}>{this.props.data.desc}</Text>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	navigator: {
		flex: 1,
	},
	row: {
		flex: 1,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor:'#ffffff',
		borderColor:'#cccccc',
		borderBottomWidth:1
	},
	thumbnail: {
		width: 50,
		height: 50,
		marginRight:10,
	},
 	desc:{
 		marginTop:5,
		color:'#000000',
		fontSize:14,
		fontWeight:'500'
	},
	title: {
		fontSize: 18,
		fontWeight:'600',
		color:'#c1a581'
	}
});

module.exports = categoryItem;