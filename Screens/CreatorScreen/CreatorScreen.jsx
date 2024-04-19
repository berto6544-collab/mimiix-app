import React from "react";
import {  View,Dimensions,Button ,Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { AuthContext } from "../../AuthContext/context";


export default function Creator({navigation}){

    const Auth = React.useContext(AuthContext)
    const [loaded,setLoaded] = React.useState(false);

    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft:()=>(<View></View>),
            headerTitle:()=>(<View></View>),
            headerShadowVisible: false,
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])


    return(
    <View style={{flex:1}}>

{!loaded?<View style={{backgroundColor:'rgb(240, 244, 248)',width:'100%',flex:1}}>
        <View style={{width:'100%',backgroundColor:'white',height:50}}>
  
        </View>
  
        </View>:null}

    <WebView 
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
        style={{width:Dimensions.get('screen').width,display:!loaded?'none':'flex',backgroundColor:'transparent',flex:1}}  
        thirdPartyCookiesEnabled={true} 
        scalesPageToFit={true} 
        allowingReadAccessToURL={'file://'}
        showsVerticalScrollIndicator={false} 
        source={{uri: 'https://mymiix.com/creator-portal'}} 
        onLoadEnd={(syntheticEvent) => {
        
          setTimeout(() => {
            setLoaded(true)
  
          }, 5000);
          

        }}
        
        />
        </View>
        )

}