/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  PixelRatio,
  Text,
  TouchableOpacity,
  Navigator,
  Platform
} = React;

var HomeScene   = require('./home/index');
var FoodScene   = require('./food/home/index');
var SearchScene = require('./food/search/index');
var DetailScene = require('./food/detail/index');
var CategoryScene=require('./food/category/index');
var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
         style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
           
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};
var App = React.createClass({
  getNavigationBar:function(){
    return NavigationBarRouteMapper;
  },
  
  renderScene:function(route, navigator){
    if(route.name=='category'){
      return (<CategoryScene navigator={navigator} passProps={route.passProps}/>);
    }
    if(route.name=='detail'){
      return (<DetailScene navigator={navigator} passProps={route.passProps}/>);
    }
    if(route.name=='food'){
      return (<FoodScene navigator={navigator} passProps={route.passProps}/>);
    }
    if(route.name=='search'){
      return (<SearchScene navigator={navigator} passProps={route.passProps}/>);
    }
    if(route.name=='home'){
      return (<HomeScene navigator={navigator} />);
    }
  },

  render: function() {
     return (
      <Navigator
        style={{flex:1}} 
        initialRoute={{
          name:'home',
          title: '小工具',
          backButtonTitle:'返回',
        }}
        navigationBar={<Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        }
        sceneStyle={{marginTop:(Platform.OS=='ios'?64:60)}}
        renderScene={this.renderScene} />
     );
  }
});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
     fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
   },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

module.exports = App;
