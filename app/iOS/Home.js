import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import post from './Post';
import map from './Map';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
        }
    }

    componentDidMount = () => {  //react native instance of what to do when someone is on a page
        this.getFood()
    }

    getFood()  {
        firebase.database().ref('food').on('value', (foodEntry) => {  //once allows the db to be on once when someone comes to the page - on keeps it current
            var items = [];
            foodEntry.forEach((child) => { //child = image and value in FB
                var item = child.val();
                items.push(item);
            });
            items = items.reverse(); //showing newest items
            this.setState({ food: items });
        });
    };

    left() { this.props.navigator.push({ component: post })};
    //pushing post component which takes us to the post view/page


    // openMaps () {
    //     console.log('lat', this);
    //
    //     Linking.openURL(`https://www.google.com/maps/@?api=1&map_action=map&center=-${this.state.lat},${this.state.lng}&zoom=12&basemap=terrain`)
    // }

    // map() {
    //     this.self.props.navigator.push({  //this is the component, self is set on line 67, props
    //         component: map,
    //         passProps: {place: this.place.place }
    //     });
    // };

    render () {   // nested return object of our food so that the entries are injected. Notice only one outside view. Key is given to keep xcode from error*/

        return (
            <View style={styles.homeContainer}>
                <Header title="Life Log" left={this.left.bind(this)} leftText={<Icon name="add-circle-outline" color="#ADD3D3" size={22}/> }/>
                <ScrollView>
                    <View style={{marginTop: -20}}>
                    {Object.keys(this.state.food).map((key) => {
                        return (
                            <TouchableOpacity key={key}
                                              onPress={() => {Linking.openURL(
                                                  `https://www.google.com/maps/dir/?api=1&destination=${this.state.food[key].place.lat},
                                                  ${this.state.food[key].place.lng}&zoom=12&basemap=roadmap`)}}>
                                <Image source={{uri: this.state.food[key].image}} style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
                                <Text style={styles.textPost}>{this.state.food[key].place.name}</Text>
                                <Text style={styles.textPost}>{this.state.food[key].place.address}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default Home;