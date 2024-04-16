import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";




export default function FeedItemEvent({data,navigation,dataSource,setDataSource,index,Auth,isProfile}){




    return(
    <TouchableOpacity activeOpacity={1}   onPress={()=>{
        navigation.navigate('Web',{url:data?.Link})


    }} style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    
    <Image style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height - 450}} source={{uri:data?.profileImg}} />
    <Text style={{fontSize:20,fontWeight:'600'}}>{data?.title}</Text>
    <Text>{data?.description}</Text>
    <Text>{data?.EventDates}</Text>


  

    </TouchableOpacity>
    
    )


}


