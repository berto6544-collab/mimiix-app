import React, { Children } from "react";
import {  Avatar,Icon} from "@rneui/themed";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";





export default DrawerCompMain = ({navigation,setClose,Auth,setStart}) =>{


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
      


       const signin = () =>{
        navigation.navigate('Signin')
        setClose();
       }


       const signup = () =>{
        navigation.navigate('Signup')
        setClose();
       }


       const support= () =>{
        navigation.navigate('Support')
        setClose();
       }


       

       if(Auth.Authuser.length > 0){    return(
    <View style={{flex:1,display:'flex',flexDirection:'column',gap:30,marginTop:20,position:'relative'}}>


<Buttons onPressed={()=>{
    navigation.navigate('Account')
    setClose();
}} icon1={{name:'cog',type:'font-awesome'}} title={'Account'} />
<Buttons onPressed={()=>{
    navigation.navigate('CreatorPortal')
    setClose();
}} icon1={{name:'address-book',type:'font-awesome'}} title={'Creator Portal'} />

{Auth.Authuser.length > 0 && Auth.Authuser[0].UserLevel == "1"?<Buttons onPressed={()=>{

}} icon1={{name:'cog',type:'font-awesome'}} title={'ReviewBoard'} />:null}
<Buttons
 onPressed={()=>{
    
 }}
icon1={{name:'sharealt',type:'antdesign'}} title={'Invite Friend'} />
<Buttons 
 onPressed={()=>{
    
 }}
icon1={{name:'globe',type:'feather'}} title={'Support'} />
<Buttons 
onPressed={support} 
icon1={{name:'person',type:'ionicons'}} title={'Deactivate Account'} />
<Buttons
 onPressed={()=>{
    
 }}

icon1={{name:'person-remove',type:'ionicons'}} title={'Delete Account'} />
<Buttons


onPressed={logout} icon1={{name:'power-off',type:'font-awesome'}} title={'Sign Out'} />

    </View>)

       }else{
return(<View style={{flex:1,display:'flex',flexDirection:'column',gap:30,marginTop:20,position:'relative'}}>


<Buttons onPressed={signin} icon1={{name:'cog',type:'font-awesome'}} title={'Signin'} />
<Buttons onPressed={signup}  icon1={{name:'cog',type:'font-awesome'}} title={'Signup'} />

<Buttons onPressed={support} icon1={{name:'globe',type:'feather'}} title={'Support'} />
    </View>)
        
       }   

}



export const Buttons = ({onPressed,title,icon1}) =>{




    return(
<TouchableOpacity  onPress={()=>{
onPressed();
}} style={{display:'flex',justifyContent:'space-between',marginBottom:10,flexDirection:'row',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
<Icon  name={icon1?.name} type={icon1?.type} />
<Text style={{fontWeight:'600'}}>{title}</Text>
</View>

<Icon  name={'right'} type={'antdesign'} />

</TouchableOpacity>
    )
}