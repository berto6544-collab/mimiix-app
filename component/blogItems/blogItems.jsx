import React from "react";
import { Text,Card,Image,Avatar, Icon } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";
import { OpenUrl } from "../../Utils/URL";
import {MultiMedias} from '../Media/Media';


export default function BlogItem({data,navigation,Auth}){


    return(
    <View key={data.PostId} style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    <View style={[FeedItemstyles.AvatarBase,{position:'relative'}]}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
    <Avatar rounded={true} source={{uri:data?.ProfileImg}} />
    <Text onPress={()=>{
        if(data?.UserName == data?.MyUserName){

            navigation.navigate('Profile',{username:data.Username, isMine:true})

        }else{
            navigation.navigate('Profile',{username:data.Username, isMine:false})

        }
    }} h4={true}>{data.PostedBy}</Text>
    </View>
    {data?.UserName == data?.MyUserName?<TouchableOpacity style={{position:'absolute',right:5}}><Icon color={'black'} name={'close'} type={'font-awesome'} /></TouchableOpacity>:null}
    
        
       
    </View>
    <Text>{data.Title}</Text>
    <Image style={{
        width: "100%",
        zIndex:2,
        marginHorizontal: 0,
        height: Dimensions.get('window').height -370, 
        resizeMode: 'cover',
        }} source={{uri:data.Image}} />
    
    


    </View>
    
    )


}