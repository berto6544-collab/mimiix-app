import React from 'react';
import {userData} from './API/API'
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Containerstyles } from './StyleComponent/Style';
import { LoginFunction,Authenticated} from './Utils/Screens';
import { AuthContext } from './AuthContext/context';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';


const Stack = createNativeStackNavigator();
const Tab =  createBottomTabNavigator();

export default function App({navigation}) {
  const [Authuser,setAuthUser] = React.useState([]);

  const [PostDataSource,setPostDataSource] = React.useState([]);
  const [bannerText,setBannerText] = React.useState("ca-app-pub-3940256099942544/2521693316");
  const [theme,setTheme] = React.useState('light');
  const [token,setToken] = React.useState('');
  const [adStatus,setAdStatus] = React.useState('');
  const [mediaType,setMediaType] = React.useState(null);
  const [mediaDataSource,setMediaDataSource] = React.useState([])
  const [index,setIndex] = React.useState(0);
  const [start,setStart] = React.useState(0);
  const [isLoaded,setisLoaded] = React.useState(false);

  

React.useEffect(()=>{

  userData().then(response=>{
if(response.length == 0 || response.length > 0 && response[0].UserName == ""){
  
  setisLoaded(true);
}else{

setAuthUser(response);
setisLoaded(true);
}


  

});


},[]); 





if(!isLoaded){
return(
<View style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

<FastImage style={{width:'100%',flex:1}} resizeMode={'contain'}  source={require('./assets/splash.png')} />
</View>)

}else{

return(

<AuthContext.Provider style={Containerstyles.container} value={{Authuser,setAuthUser,adStatus,setAdStatus,start,setStart,PostDataSource,setPostDataSource,theme,setTheme,token,setToken,mediaType,setMediaType,mediaDataSource,setMediaDataSource,index,setIndex}}>
 <NavigationContainer>

{Authuser.length > 0 && Authuser[0].UserName == "" || Authuser.length == 0 ? LoginFunction(Stack,Tab) : Authenticated(Stack,Tab)}




</NavigationContainer>



</AuthContext.Provider>

)

}

}



