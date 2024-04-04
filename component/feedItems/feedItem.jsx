import React from "react";
import { Text,Card,Image,Avatar, Icon } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";
import { OpenUrl } from "../../Utils/URL";
import {MultiMedias} from '../Media/Media';


export default function FeedItem({data}){


    return(
    <View key={data.PostId} style={FeedItemstyles.FeedItem}>
    <View style={FeedItemstyles.AvatarBase}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
    <Avatar rounded={true} source={{uri:data?.ProfileImg}} />
    <Text h4={true}>{data.PostedBy}</Text>
    </View>
    <TouchableOpacity><Icon  name={'close'} type={'font-awesome'} /></TouchableOpacity>
    
        
       
    </View>
    {OpenUrl(data.PostBody,data,data.PostImage,data.PostId,'')}
    {data.PostImage != ""?<MultiMedias data={data} /> :null}

    <View style={FeedItemstyles.FeedItemBottom}>
    {data?.LikesData == "0"?<TouchableOpacity style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}><Icon  name={'heart-o'} type={'font-awesome'} /><Text>{data?.LikesCount}</Text></TouchableOpacity>:<TouchableOpacity style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}><Icon  color={'blue'} name={'heart'} type={'font-awesome'} /><Text>{data?.LikesCount}</Text></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'comment-o'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'dollar'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'share'} type={'font-awesome'} /></TouchableOpacity>}
    {<TouchableOpacity><Icon  name={'share'} type={'font-awesome5'} /></TouchableOpacity>}

    </View>
    
    


    </View>
    
    )


}