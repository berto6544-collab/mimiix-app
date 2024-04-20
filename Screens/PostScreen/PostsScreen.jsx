import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";


const PostsScreen = ({route,navigation}) => {
const Auth = React.useContext(AuthContext)
const {uniqid} = route.params;

    React.useEffect(()=>{

        navigation.setOptions({
          headerLeft: ()=>(<View></View>),
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])
    
    
    return (<WebView 
      javaScriptEnabled={true} 
      allowFileAccess={true} 
      sharedCookiesEnabled={true} 
      style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
      thirdPartyCookiesEnabled={true} 
      allowsInlineMediaPlayback={true}
      scalesPageToFit={true} 
      allowingReadAccessToURL={'file://'}
      showsVerticalScrollIndicator={false} 
      source={{uri: 'https://mymiix.com/post/'+uniqid}} 
      
      
      />);
  }


  export default PostsScreen;