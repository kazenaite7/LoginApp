import React from 'react';
import { ExpoConfigView } from '@expo/samples';
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
  ActivityIndicator
} from 'react-native';

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      image : "",
      firstName:"",
      lastName:"",
      address:"",
      phone:"",
    };

  }

componentDidMount(){
  return fetch(
    "https://vidqjclbhmef.herokuapp.com/user",
    {
      method: "GET",
      headers: {
        'Authorization': this.props.navigation.state.params.token,
       "Accept": "application/json",
       "Content-Type": "application/json"
      }
   }
  )
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        image: responseJson.image,
        firstName: responseJson.firstName,
        lastName: responseJson.lastName,
        address: responseJson.address,
        phone: responseJson.phone,
      }, function(){
        // this.setState({imageURL : responseJson.image});
        // profileImgage  = this.props.text;

        // this.image = responseJson.image
        // this.setState({image})

        // console.log(this.image)
        
        global.urlas = responseJson.image;
        console.log(global.urlas);
      });

    })
    .catch((error) =>{
      console.error(error);
    });
}

  render() {
    

    //wait()
   
    
      if(!this.state.isLoading){      
        return(
        //console.log("renderinamaa   "+ this.state.image),
        <View style={styles.container}>
        <Button
          style={styles.button}
          title="Logout"
          onPress={() => this.props.navigation.navigate('Home')}
          />
          {/* <Text>Uzkrove</Text> */}
          
          <View style = {styles.welcomeContainer}>
          
          <Image
            source={{uri: this.state.image}}
            style={styles.welcomeImage}
          />
          
          <Text style = {styles.textContainer}>{ this.state.firstName +  this.state.lastName}</Text>
          
          <Text style = {styles.textContainer}>{ this.state.address}</Text>
          
          <Text style = {styles.textContainer}>{ this.state.phone}</Text>
        
        </View>
        
        </View>
      )
      }
   
      return ( 

  
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />

    </View>
  );
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
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 5,
    marginHorizontal: 10,
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
    height:40,
    width:200,
    backgroundColor:'white',
    marginVertical: 20
  },

  button:{
    height:100,
    width:100,
    backgroundColor:'red',
    marginVertical: 20,
    position: 'absolute', 
    right: 0
  },
  buttonContainer:{
    flex: 1,
    height:100
  },

  textContainer:{
    textAlign: 'center',
    height:40,
    width:250,
    backgroundColor:'white',
    marginVertical: 5
  },
});

