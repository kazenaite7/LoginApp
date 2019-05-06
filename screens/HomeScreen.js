import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
 
   this.state = {
       name: "",
       pass: ""
      };
    }

  render() {
    return (
      <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{uri: 'https://placeimg.com/80/80/tech'}}
              style={styles.welcomeImage}
            />
             <TextInput style={styles.input} 
              placeholder = 'Username'
              returnKeyType='next'
              onChangeText={text => this.setState({ name: text })}
              keyboardType = 'email-address'
              />

            <TextInput style={styles.input} 
              placeholder = 'Password'
              secureTextEntry
              returnKeyType='go'
              onChangeText={text => this.setState({ pass: text })}/>
            
            <View style= {styles.buttonContainer}>
            <Button
              style={styles.button}
              title="Submit"
              onPress = {
              (async () => {
                await this.onFetchLoginRecords();})
              }
            />
            </View>

          </View>
        
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
    );
  }

  async onFetchLoginRecords() {

    var data = {
      username: this.state.name,
      password: this.state.pass
    };
    try {
     let response = await fetch(
      "https://vidqjclbhmef.herokuapp.com/credentials",
      {
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify(data)
     }
    );


     if (response.status >= 200 && response.status < 300) {

        response.json().then(data => {

        token = data.token;
        //console.log("pimras" + token);
        this.props.navigation.navigate('Settings',  {token} , );
          
          //console.log("antras" + data.token);
        });

      }
      else{
        alert("Bad creditentials");
      }
      
   } catch (errors) {

     alert(errors);
    } 
}

}



const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },


  input:{
    padding:10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height:40,
    width:250,
    backgroundColor:'white',
    marginVertical: 10
  },

  button:{
    height:100,
    width:250,
    backgroundColor:'red',
    marginVertical: 20
  },
  buttonContainer:{
    flex: 1,
    height:100,
    width:250,
  }
});
