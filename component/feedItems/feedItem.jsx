import React from "react";
import { Text,Card,Image,Avatar, Icon } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";
import { OpenUrl } from "../../Utils/URL";
import {MultiMedias} from '../Media/Media';


export default function FeedItem({data,navigation,Auth}){


    return(
    <View key={data.PostId} style={FeedItemstyles.FeedItem}>
    <View style={FeedItemstyles.AvatarBase}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
    <Avatar rounded={true} source={{uri:data?.ProfileImg}} />
    <Text onPress={()=>{
        if(data?.UserName == data?.MyUserName){

            navigation.navigate('Profile',{username:data.UserName, isMine:true})

        }else{
            navigation.navigate('Profile',{username:data.UserName, isMine:false})

        }
    }} h4={true}>{data.PostedBy}</Text>
    </View>
    <TouchableOpacity><Icon  name={'close'} type={'font-awesome'} /></TouchableOpacity>
    
        
       
    </View>
    {OpenUrl(data.PostBody,data,navigation,data.PostImage,data.PostId,'')}
    {data.PostImage != ""?<MultiMedias data={data} /> :null}

    <View style={FeedItemstyles.FeedItemBottom}>
    {data?.LikesData == "0"?<TouchableOpacity onPress={()=>{
    if(Auth.Authuser.length  == 0){

    navigation.navigate('Signin');
    
    }else{
        
    
    }


    }} style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}><Icon  name={'heart-o'} type={'font-awesome'} /><Text>{data?.LikesCount}</Text></TouchableOpacity>:<TouchableOpacity style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}><Icon  color={'#0086ff'} name={'heart'} type={'font-awesome'} /><Text>{data?.LikesCount}</Text></TouchableOpacity>}
    {<TouchableOpacity onPress={()=>{
if(Auth.Authuser.length  == 0){

navigation.navigate('Signin');

}else{

navigation.navigate('Comment');

}
        
    }}><Icon  name={'comment-o'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'dollar'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'share'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'share'} type={'font-awesome5'} /></TouchableOpacity>}

    </View>
    
    


    </View>
    
    )


}