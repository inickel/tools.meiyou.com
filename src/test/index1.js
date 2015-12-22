
var React = require('react-native');

var {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions,
  LayoutAnimation,
  Animated
} = React;

class PickerView extends React.Component {
    constructor(props: any) {
      var height=Dimensions.get('window').height;
        super(props);
        this.state = {
             translateY:new Animated.Value(height)
        };
    }
    render(): ReactElement {
        return (
            <Animated.View
                style={
                    {
                        flex: 1,
                        transform: [
                            {
                              translateY:this.state.translateY
                             }
                        ],
                        backgroundColor:'yellow'
                    }
                }>
                <Text>SSS</Text>
            </Animated.View>
        );
    }
    componentDidMount() {
     }
}

var App = React.createClass({
  getInitialState: function() {
    return {
      show: false
    };
  },
  componentWillMount: function() {
    },

  showBottom: function() {
     this.setState({
      show: true
    });
  },
  show: function() {
    var height = Dimensions.get('window').height;

    Animated.timing(
      this.refs.picker.state.translateY, {
        toValue: this.state.show ? height : height - 200,
        friction: 1
      }
    ).start();
    this.state.show = !this.state.show;
  },
	render: function() {
    var width=Dimensions.get('window').width;
    var height=Dimensions.get('window').height;
	    return (
          <View style={{flex:1}}>
            <View style={{marginTop:64}}>
              <TouchableHighlight onPress={this.show}>
                <Text style={{flex:1}}>txt</Text>
              </TouchableHighlight>
            </View>
            <PickerView ref='picker'/>
          </View>
      );
	}
});

var css=StyleSheet.create({
});

module.exports=App;