import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { Icon } from "@rneui/themed";
import { AuthContext } from "../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatroomScreen = ({route,navigation}) => {
const Auth = React.useContext(AuthContext)


    React.useEffect(()=>{

        navigation.setOptions({
          headerLeft: ()=>(<Icon color={'#007bff'} name={'left'} onPress={() => {navigation.goBack();}} type={'antdesign'} />),
           /* headerRight: () => (
              <Button onPress={() => {}} title="Create Room" />
            ),*/
            headerStyle:{backgroundColor:'rgb(240, 244, 248)'},

            headerShadowVisible: false
          });
        

    },[])
    
    
    return (
    <SafeAreaView 
    style={{width:Dimensions.get('screen').width,
    backgroundColor:'rgb(240, 244, 248)',
    flex:1}} 
    edges={['bottom','left','right']}
    >
    
    <View 
    style={{width:Dimensions.get('screen').width,
    backgroundColor:'rgb(240, 244, 248)',
    flex:1}}  
    > 
      
      <WebView 
      javaScriptEnabled={true} 
      allowFileAccess={true} 
      sharedCookiesEnabled={true} 
      style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
      thirdPartyCookiesEnabled={true} 
      scalesPageToFit={true} 
      allowsInlineMediaPlayback={true}
      allowingReadAccessToURL={'file://'}
      showsVerticalScrollIndicator={false} 
      source={{uri: 'https://mymiix.com/chatroom'}} 
      
      
      />
      </View>
      </SafeAreaView>
      );
  }


  export default ChatroomScreen;