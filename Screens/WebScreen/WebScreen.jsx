import React from "react";
import {  View,Dimensions,Button ,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { AuthContext } from "../../AuthContext/context";


export default WebScreen = ({route,navigation}) => {
  
  const { url,title} = route.params;
    const Auth = React.useContext(AuthContext)


    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft:()=>(<View></View>),
            headerTitle:()=>(<View><Text style={{fontSize:18,fontWeight:'700'}}>{title}</Text></View>),
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
          
          
            
        }
  
        }}
        allowFileAccess={true} 
        sharedCookiesEnabled={true} 
        style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
        thirdPartyCookiesEnabled={true} 
        scalesPageToFit={true} 
        showsVerticalScrollIndicator={false} 
        source={{uri: url}} 
        
        
        />)

}