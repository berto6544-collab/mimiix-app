import React, { Children } from "react";
import {  Avatar,Icon} from "@rneui/themed";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import * as Sharing from 'expo-sharing';




export default DrawerProfileCompMain = ({navigation,data,setClose,Auth,setStart}) =>{


    const logout  = () =>{


    
      
       
            
            
               
       fetch('https://mymiix.com/public/api/Logout',{method:'POST'})
       .then(js =>js.text())
       .then(response=>{
        
        setStart(0)
        Auth.setAuthUser([])
        Auth.setPostDataSource([])
        setClose();
       
       })
       
       
      
         
       
       
       
       
       }
      


     


       

      return(
    <View style={{flex:1,display:'flex',flexDirection:'column',gap:30,marginTop:20,position:'relative'}}>


<Buttons onPressed={()=>{
   
}} icon1={{name:'block',type:'materialicons'}} title={'Block'} />

<Buttons onPressed={()=>{
  //navigator.clipboard.writeText('https://mymiix.com/profile/'+data.UserName);
  const url = 'https://mymiix.com/profile/'+data.UserName;
  
  Sharing.shareAsync(url, {

  })
}} icon1={{name:'sharealt',type:'antdesign'}} title={'Copy Profile Url'} />






    </View>)

       
}



export const Buttons = ({onPressed,title,icon1}) =>{




    return(
<TouchableOpacity  onPress={()=>{
onPressed();
}} style={{display:'flex',justifyContent:'space-between',marginBottom:10,flexDirection:'row',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
<Icon size={30} name={icon1?.name} type={icon1?.type} />
<Text style={{fontWeight:'400',fontSize:20}}>{title}</Text>
</View>



</TouchableOpacity>
    )
}