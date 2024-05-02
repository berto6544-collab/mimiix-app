import React,{useRef} from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { Dimensions, TouchableOpacity, View} from "react-native";
import { FeedItemstyles } from "../../../StyleComponent/Style";
import { AuthContext } from "../../../AuthContext/context";



export default HeaderComp = ({setShowMessageDrawer,Auth,setShowDrawer,navigation,setProfileShower}) =>{

//const Auth = React.useContext(AuthContext);

    return(<View style={[FeedItemstyles.TopNav,{backgroundColor:'white'}]}>

    <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
  
      {/*Button navigates you to the message screen or if your not signed-in then the signin screen */}
    <Icon  name={'send'} size={25} onPress={()=>{ setShowMessageDrawer(true);}} type={'feather'} />
  
  
   {/*Button navigates you to the explore screen */}
  <TouchableOpacity onPress={()=>{ 
    if(Auth.Authuser.length > 0){
    navigation.navigate('Explore');
    }else{
      navigation.navigate('Signin');
    }
    
    }}><Icon name={'compass-outline'} size={30} type={'ionicon'} /></TouchableOpacity>
  
    </View>
  <Image style={{width:100,height:40}} source={require('../../../assets/img/logo(3).png')} />
   
  <View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}>
  
    {/*Button navigates you to create post screen or if your not signed-in then the signin screen */}
  <TouchableOpacity onPress={()=>{
    
    if(Auth.Authuser.length > 0 ){ setProfileShower(true); }else{ navigation.navigate('Signin') } }}>
  <Icon  name={'plus-square'} solid={true} size={27} type={'feather'} />
  </TouchableOpacity>
  
  <TouchableOpacity onPress={()=>{ 
    setShowDrawer(true);
    
    }} >
  <Icon  name={'menu'} solid={true} size={27} type={'feather'} />
  </TouchableOpacity>
  
  
  </View>
  
   </View>)
}