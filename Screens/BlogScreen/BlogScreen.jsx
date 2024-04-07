import React from "react";
import {View,Text,Button,Dimensions} from 'react-native';
import { BlogAPI } from "../../API/API";
import { WebView } from 'react-native-webview';
import { AuthContext } from "../../AuthContext/context";



export default BlogScreen = ({route,navigation}) =>{
    const { id} = route.params;



    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft:()=>(<View></View>),
            headerTitle:()=>(<View></View>),
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])



return(<View style={{paddingBottom:20,flex:1}}><WebView 
        javaScriptEnabled={true} 
        
        
       
        allowFileAccess={true} 
        sharedCookiesEnabled={true} 
        style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
        thirdPartyCookiesEnabled={true} 
        scalesPageToFit={true} 
        allowingReadAccessToURL={'file://'}
        showsVerticalScrollIndicator={false} 
        source={{uri: 'https://mymiix.com/blogs/'+id}} 
        
        
        /></View>)

}
