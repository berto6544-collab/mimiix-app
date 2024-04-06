mport React, { Children } from "react";
import { Dialog, } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Dimensions, Text, View,Button } from "react-native";
import AvatarComp from "../component/AvatarComponent/AvatarComp";


export default MediaDialog = ({children,title,onshow,Auth,navigation,setClose}) =>{




   return(
    <Dialog
    style={{flex:1,height:Dimensions.get('screen').height}}
    isVisible={onshow}
    overlayStyle={{flex:1,width:'100%',position:'relative',alignSelf:'flex-end'}}
    onPressIn={setClose}
    animationType={'slide'}
    
    >
        
<View style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between',position:'relative',width:'100%',paddingTop:30}}>

{title != ""?<Text>{title}</Text>:
<View>
    <AvatarComp 
    username={Auth.Authuser.length > 0 ?Auth.Authuser[0].UserName:''} 
    profileImage={Auth.Authuser.length > 0 ?Auth.Authuser[0].ProfileImage:''}  
    userStats={Auth.Authuser.length > 0 ?Auth.Authuser[0].UsersStat:''}  
    
    
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