import React from "react";
import { Avatar } from "@rneui/themed";
import { View,Text } from "react-native";
import { ListStyle } from "../Style/style";


export default Items = ({item,index,isPinned}) => {

return(<View style={{padding:10}} key={index} >
    {isPinned?<Text>pinned to the top</Text>:null}

<View style={ListStyle.commentBox}>
    <Avatar size={50} rounded={true} source={{uri:item?.Commentedimg}} />
    <View style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
    <Text style={{fontSize:16,fontWeight:'700'}}>{item?.CommentedBy}</Text>
    <Text>{item?.Comment}</Text>
    </View>
    </View>

</View>)

}