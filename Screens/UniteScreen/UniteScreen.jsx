import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";


const UniteScreen = ({route,navigation}) => {
  const {url,title} = route.params;
const Auth = React.useContext(AuthContext)
const [loaded, setLoaded] = React.useState(false);
const WebViewRefs = React.useRef(null)



const runFirst = `
document.querySelector('.fa-times').style.display = 'none';
document.querySelector('.buttonColor').style.display = 'none';
`;

    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft: ()=>(<View></View>),
            title:title,
            headerTitleStyle:{color:'white'},
            headerStyle:{backgroundColor:'rgb(30, 144, 255)',color:'white',shadowOpacity:0,borderBottomWidth:0},
            headerShadowVisible: false,
            headerRight: () => (
              <Button color={'white'} onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });



        

    },[])
    
   
    return (
    <SafeAreaView edges={['bottom','left','right']} style={{width:Dimensions.get('screen').width,backgroundColor:'rgb(30, 144, 255)',flex:1}}>
    <View  style={{width:Dimensions.get('screen').width,backgroundColor:'rgb(30, 144, 255)',flex:1}}  >
    <WebView 
      ref={WebViewRefs}
      javaScriptEnabled={true} 
      allowFileAccess={true} 
      sharedCookiesEnabled={true}
      allowsInlineMediaPlayback={true}
      style={{width:Dimensions.get('screen').width,display:loaded?'flex':'none',backgroundColor:'rgb(30, 144, 255)',flex:1}}  
      thirdPartyCookiesEnabled={true} 
      scalesPageToFit={true} 
      onLoadEnd={()=>{
        setTimeout(()=>{
        WebViewRefs.current.injectJavaScript(runFirst);
        setLoaded(true)
      },3000)
      }}
      allowingReadAccessToURL={'file://'}
      showsVerticalScrollIndicator={false} 
      source={{uri: url}} 
    
      
      />
      </View>
      </SafeAreaView>
      );
  }


  export default UniteScreen;