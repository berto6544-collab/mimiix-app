import React from "react";
import {  View,Dimensions,Button ,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { AuthContext } from "../../AuthContext/context";


export default function Creator({navigation}){

    const Auth = React.useContext(AuthContext)


    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft:()=>(<View></View>),
            headerTitle:()=>(<View></View>),
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])


    return(<WebView 
        javaScriptEnabled={true} 
        
        
        onMessage={(event) => {
          // console.log(event.nativeEvent.data) // Client received data
           let responseJson = JSON.parse(event.nativeEvent.data) 
  
          if(responseJson.length > 0){
           console.log(responseJson)
          
            
        }
  
        }}
        allowFileAccess={true} 
        sharedCookiesEnabled={true} 
        style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
        thirdPartyCookiesEnabled={true} 
        scalesPageToFit={true} 
        allowingReadAccessToURL={'file://'}
        showsVerticalScrollIndicator={false} 
        source={{uri: 'https://mymiix.com/creator-portal'}} 
        
        
        />)

}