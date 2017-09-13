import React, { Component } from 'react';   // importing from node_modules
import firebase from '../Config/Firebase';
import register from './Register';
import home from './Home';
import styles from '../Theme/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons'


import {
    View,
    Text,
    TextInput,
    AlertIOS,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

class Login extends Component {
    constructor(props){ //passing down props from navigator
        super(props); // setting the properties
        this.state = { //defining the initial state of the props
            email: "",
            password: ""
        };
    }

    login = () => {
        var state = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( () => {
            //Login successful
            state.props.navigator.push({ component: home });
        },  (error) => {
            // An error happened
            AlertIOS.alert(error.message)
        });
    };

    register = () => {
        this.props.navigator.push({ component: register });
    };


    render() {
        return ( //there cant be multiple views in the outermost node
            <View style={[styles.container, styles.center, styles.red]}>
                {/*<ImageBackground style={styles.backgroundImage}*/}
                       {/*source={{uri: 'https://68.media.tumblr.com/868bf6faa4024aed899aab0d095201d9/tumblr_o2pkc7YRI41tuwqfro1_500.jpg'}}>*/}
                <Icon name="place" color="#fff" size={50}/>
                <Text style={ styles.logo }>Life Log</Text>
                <TextInput
                    style={ styles.textInput }
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}/>
                <View style={styles.line}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}/>
                <View style={styles.line}/>
                <TouchableOpacity style={styles.clearBtn} onPress={this.login.bind(this)}>
                    <Text style={[styles.text, styles.whiteText] }>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.login.bind(this)}  //this is the entire component, binds the text input to the submit function
                    title="Login"/>
                <TouchableOpacity onPress={this.register.bind(this)}>
                    <Text style={styles.whiteText}>Register</Text>
                </TouchableOpacity>
                {/*</ImageBackground>*/}
            </View>
        );
    }
}

export default Login;