import React, { Children } from "react";
import { Dialog, } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Dimensions, Text, View,Button } from "react-native";
import AvatarComp from "../component/AvatarComponent/AvatarComp";


export default DrawerProfileDialog = ({children,title,onshow,Auth,navigation,username,profileImage,userStats,setClose}) =>{




   return(
    <Dialog
    isVisible={onshow}
    overlayStyle={{width:'100%',flex:1,borderTopLeftRadius:20,borderTopRightRadius:20,height:Dimensions.get('screen').height/1.5,bottom:0,position:'absolute',bottom:0}}
    onPressIn={setClose}
    
    >
        
<View style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',position:'relative',width:'100%',paddingTop:0}}>

{title != ""?<Text>{title}</Text>:
<View>
<AvatarComp
    username={username} 
    profileImage={profileImage}  
    userStats={userStats}  
     
    
    
    />

</View>

}
<Button onPress={()=>{
    setClose();
}} name={'x'} type={'feather'} title="Done" ></Button>


</View>

<Dialog.Actions >
{children}
</Dialog.Actions>
    </Dialog>
   ) 
}