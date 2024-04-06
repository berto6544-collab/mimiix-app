import React, { Children } from "react";
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Dimensions, Text, View } from "react-native";



export default AvatarComp = ({username,profileImage,userStats}) =>{



if(username != ""){return(
<View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
    <Avatar size={50}rounded={true} source={{uri:profileImage}} />
    <View style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
    <Text style={{fontSize:20,fontWeight:'600'}}>{username}</Text>
    <Text>{userStats}</Text>
    
    </View>
</View>

)}
else{return(<View></View>)}



}

