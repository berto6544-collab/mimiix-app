import React from 'react';
import {userData} from './API/API'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Containerstyles } from './StyleComponent/Style';
import { LoginFunction,Authenticated} from './Utils/Screens';
import { AuthContext } from './AuthContext/context';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab =  createBottomTabNavigator();

export default function App({navigation}) {
  const [Authuser,setAuthUser] = React.useState([]);
  const [PostDataSource,setPostDataSource] = React.useState([]);
  const [theme,setTheme] = React.useState('light');
  const [token,setToken] = React.useState('light');
  const [mediaType,setMediaType] = React.useState(null);
  const [mediaDataSource,setMediaDataSource] = React.useState([])
  const [index,setIndex] = React.useState(0);


React.useEffect(()=>{

  userData().then(response=>{
if(response.length == 0 || response.length > 0 && response[0].UserName == "")
return;
setAuthUser(response);
  

})

},[]); 







return(

<AuthContext.Provider style={Containerstyles.container} value={{Authuser,setAuthUser,PostDataSource,setPostDataSource,theme,setTheme,token,setToken,mediaType,setMediaType,mediaDataSource,setMediaDataSource,index,setIndex}}>
 <NavigationContainer>

{Authuser.length > 0 && Authuser[0].UserName == "" || Authuser.length == 0 ? LoginFunction(Stack,Tab) : Authenticated(Stack,Tab)}




</NavigationContainer>



</AuthContext.Provider>

)


}



