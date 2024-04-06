import React from "react";
import { Avatar,Icon } from "@rneui/themed";
import { Dimensions,Image, Text, View } from "react-native";


export default Status = ({data,index}) =>{



return(
<View style={{display:'flex',width:'100%',flexDirection:'row',marginTop:30,justifyContent:'space-between',paddingHorizontal:30,alignItems:'center'}}>
<View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<Text>Posts</Text>
<Text style={{fontSize:16,fontWeight:'600'}}>{data.PostStat}</Text>

</View>

<View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<Text>Followers</Text>
<Text style={{fontSize:16,fontWeight:'600'}}>{data.FollowersStat}</Text>

</View>
    
<View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<Text>Following</Text>
<Text style={{fontSize:16,fontWeight:'600'}}>{data.FollowingStat}</Text>

</View>

</View>

)



}