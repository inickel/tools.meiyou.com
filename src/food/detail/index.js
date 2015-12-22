/* @flow */
'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,Text,Image,ActivityIndicatorIOS
} = React;

var Detail = React.createClass({
	getFitText: function(fit) {
		var text = '';
		switch (fit) {
			case 1:
				text = '\ue415 适宜';
				break;
			case 2:
				text = '\ue40d 慎重';
				break;
			case 3:
				text = '\ue412 禁忌';
				break;
			default:
				text = '';
				break;
		}
		return text;
	},
	fetchData: function() {
		var api = 'http://test.tools.seeyouyima.com/taboo/food?authorization=3.ZHF5y%2F1tLqAkN%2FY22H0PKYZgjTjxzbLyb6puwN8NjGU%3D&id='+this.state.id;
		fetch(api)
			.then((response) => {
				var json = response.json();
				return json;
			})
			.then((json) => {
				console.log(json);
				this.setState({
					data:json,
					loading: false
				});
			})
			.done();
	},
	getInitialState: function() {
		return {
			id: this.props.passProps.id,
			loading: true,
 			data:null
		};
	},
	render: function() {
		return this.state.loading ? this.renderLoadingView() : this.renderLoadedView();
	},
	componentDidMount: function() {
		this.fetchData();
	},
	renderLoadingView: function() {
		return (
			<View style={{flex:1}}> 
	 			<ActivityIndicatorIOS
			        	animating={this.state.loading}
			        	style={[styles.centering, {height: 80}]}
			        	size="large" />
			</View>
		);
	},
	renderFitText:function(){

	},
	renderLoadedView: function() {
		return (
	      <View style={{backgroundColor:'#eeeeee'}}>
	      	<View style={{flex:1,padding:5,backgroundColor:'#ffffff'}}>
	      		<Image
	      		resizeMode={'stretch'}
	      		  style={{flex:1,height:100}}
	      		  source={{uri: this.state.data.img}} />
	      	</View>
	      	<View style={styles.wrap}>
		      	<View>
		      		<View style={styles.header}>
			      		<Text style={styles.title}>
			      			{'孕妇'}
			      		</Text>
			      		<Text style={styles.fitable}>
			      			{this.getFitText(this.state.data.pregnant_notice)}
			      		</Text>
					</View>
		      		<Text style={styles.description}>
		      			{this.state.data.pregnant_comment}
		      		</Text>
		      	</View>
		      	<View>
		      		<View style={styles.header}>
			      		<Text style={styles.title}>
			      			{'产妇'}
			      		</Text>
			      		<Text style={styles.fitable}>
			      			{this.getFitText(this.state.data.puerpera_notice)}
			      		</Text>
					</View>
		      		<Text style={styles.description}>
		      			{this.state.data.puerpera_comment}
		      		</Text>
		      	</View>
		      	<View>
		      		<View style={styles.header}>
			      		<Text style={styles.title}>
			      			{'宝宝'}
			      		</Text>
			      		<Text style={styles.fitable}>
			      			{this.getFitText(this.state.data.baby_notice)}
			      		</Text>
					</View>
		      		<Text style={styles.description}>
		      			{this.state.data.baby_comment}
		      		</Text>
		      	</View>
		      	<View>
		      		<View style={styles.header}>
			      		<Text style={styles.title}>
			      			{'营养介绍'}
			      		</Text>
					</View>
		      		<Text style={styles.description}>
		      			{this.state.data.nutrition}
		      		</Text>
		      	</View>
		      	<View>
		      		<View style={styles.header}>
			      		<Text style={styles.title}>
			      			{'选购攻略'}
			      		</Text>
					</View>
		      		<Text style={styles.description}>
		      			{this.state.data.strategy}
		      		</Text>
		      	</View>

	      	</View>
	      </View>
	    );
	}
});


var styles = StyleSheet.create({
	header:{
		marginTop:10,
		flexDirection:'row',
		alignItems:'center'
	},
	fitable:{
 		color:'#ff88a0'
	},
	title:{
 		fontSize:16,
		fontWeight:'600',
		color:'#c1a581'
	},
	description:{
		color:'#a09a95',
		lineHeight:20
	},
	wrap:{
		marginTop:10,
		backgroundColor:'#ffffff',
		padding:10
	}
});


module.exports = Detail;