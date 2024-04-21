import React from "react";
import { StyleSheet, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";



const UniteScreen = ({route,navigation}) => {
  const {url,title,viewer} = route.params;
const Auth = React.useContext(AuthContext)
const [loaded, setLoaded] = React.useState(false);
const [isStarting, setIsStarting] = React.useState(false);
const WebViewRefs = React.useRef(null)



const runFirst = `
document.querySelector('.fa-times').style.display = 'none';

document.querySelector('img').style.display = 'none';
`;

const runFirstView = `

document.querySelector('.buttonColor').style.display = 'none';

`;

    React.useEffect(()=>{

        navigation.setOptions({
            headerLeft: ()=>(!viewer && !isStarting?<Button color={'white'} onPress={() => {
              if(viewer){
              const runFirstClick = `document.querySelector('.buttonColor').click();`;
              WebViewRefs.current.injectJavaScript(runFirstClick);
              }
            
              navigation.goBack();
            
            }} title="Done" />:<View></View>
          ),
            title:title,
            headerTitleStyle:{color:'white'},
            headerStyle:{backgroundColor:'rgb(30, 144, 255)',color:'white',shadowOpacity:0,borderBottomWidth:0},
            headerShadowVisible: false,
            headerRight: () => (
              !viewer?<View></View>:
              <Button color={'white'} onPress={() => {
                if(viewer){
                const runFirstClick = `document.querySelector('.buttonColor').click();`;
                WebViewRefs.current.injectJavaScript(runFirstClick);
                }
              
                navigation.goBack();
              
              }} title="Leave" />
            ),
          });



        

    },[isStarting])
    
   
    return (
    <SafeAreaView edges={['bottom','left','right']} style={{backgroundColor:'rgb(30, 144, 255)',flex:1}}>
    <View style={{flex:1}}>
    <WebView 
      ref={WebViewRefs}
      javaScriptEnabled={true} 
      allowFileAccess={true} 
      sharedCookiesEnabled={true}
      allowsInlineMediaPlayback={true}
      style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,display:loaded?'flex':'none',backgroundColor:'rgb(30, 144, 255)',flex:1}}  
      thirdPartyCookiesEnabled={true} 
      
      onLoadEnd={()=>{
        setTimeout(()=>{
        if(viewer){
        WebViewRefs.current.injectJavaScript(runFirstView);

        }else{
        WebViewRefs.current.injectJavaScript(runFirst);
        }
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