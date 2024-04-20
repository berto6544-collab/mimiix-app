import React from "react";
import { Text,Card,Image,Avatar, Icon } from "@rneui/themed";
import { TouchableOpacity,Dimensions, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";



export default function BlogItem({data,navigation,Auth}){


    return(
    <TouchableOpacity onPress={()=>{

        navigation.navigate('Blog',{id:data?.UniqID});

    }} activeOpacity={1} key={data.Id}  style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    
   
    <Image 
        style={{
        width: "100%",
        marginHorizontal: 0,
        height: 300, 
        resizeMode: 'cover',
        }}

        containerStyle={{
        width: "100%",
        marginHorizontal: 0,
        height: 300, 
        resizeMode: 'cover',
        }}
        source={{uri:data.Image}} />
    
    <Text style={{fontSize:18,fontWeight:'800'}}>{data.Title}</Text>


    </TouchableOpacity>
    
    )


}