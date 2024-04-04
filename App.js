import React from 'react';
import {userData} from './API/API'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Containerstyles } from './StyleComponent/Style';
import Feed from './pages/FeedPage/FeedPage';


export default function App() {
  const [Authuser,setAuthUser] = React.useState([]);

React.useEffect(()=>{

  userData().then(response=>{
if(response.length == 0)
return;
setAuthUser(response); 
  

})

},[]); 


if(Authuser.length > 0 && Authuser[0].UserName == "" || Authuser.length == 0){
  return (
    <View style={Containerstyles.container}>
      <Feed />
      <StatusBar style="auto" />
    </View>
  )
}
  else{

    
  return (
    <View style={Containerstyles.container}>
     <Feed />
      <StatusBar style="auto" />
    </View>
  )
  }
}



