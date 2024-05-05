import React from "react";
import { Text,Card,Image,Avatar, Icon,Tab,Button } from "@rneui/themed";
import {View } from "react-native";
import AvatarItems from "../../ProfileScreen/components/AvatarItems";
import Status from "../../ProfileScreen/components/Status";
import {OpenUrls} from '../../../Utils/URL';



export default ProfileItem = ({navigation,item,index,setData,data}) =>{

    return( <View style={{width:'100%',display:'flex',flex:1,flexDirection:'column',marginBottom:10}}>
        


    <AvatarItems data={item} index={index} navigation={navigation} username={item.UserName} profileImage={item.ProfileImage} userStats={item.UsersStat} />
    
   
  
    <Status data={item} index={index}  /> 
    


   

        <View style={{paddingHorizontal:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}>
        <Text style={{fontSize:16,fontWeight:'600'}}>About Me</Text>
        <Text >{item.AboutMe}</Text>

        <Button titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}} color={'rgb(0, 123, 255)'}  containerStyle={{width:'100%',marginTop:20}} radius={5} size={'md'} onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/@'+item.UserName})
    }}><Text style={{color:'white'}}>Profile</Text></Button>

    {item?.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<Button color={'rgb(0, 123, 255)'}  titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}} containerStyle={{width:'100%',marginTop:20}} radius={5} size={'md'} onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/@'+item.UserName+'/tip'})
    }}><Text style={{color:'white'}}>Tip</Text></Button>:null}
        </View>


     
    

   
    
    </View>)

}