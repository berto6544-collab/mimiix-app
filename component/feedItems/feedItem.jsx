import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../StyleComponent/Style";
import { OpenUrl } from "../../Utils/URL";
import {MultiMedias} from '../Media/Media';
import PaymentComponet from "./component/PaymentComponet";
import * as Sharing from 'expo-sharing';
import { PostLikeApi } from "../../API/API";

//import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



export default function FeedItem({data,navigation,index,Auth,isProfile}){

   // const adUnitId = TestIds.GAM_BANNER



    return(
    <View key={data.PostId} style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    <View style={[FeedItemstyles.AvatarBase,{position:'relative'}]}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
    <Avatar rounded={true} source={{uri:data?.ProfileImg}} />
    <Text onPress={()=>{
        if(data?.UserName == data?.MyUserName){

            navigation.navigate('Profile',{username:data.UserName, isMine:true})

        }else{
            navigation.navigate('Profile',{username:data.UserName, isMine:false})

        }
    }} style={{fontSize:18,fontWeight:'500'}}>{data.PostedBy}</Text>
    </View>
    {data?.UserName == data?.MyUserName?<TouchableOpacity style={{position:'absolute',right:5}}><Icon color={'black'} name={'close'} type={'font-awesome'} /></TouchableOpacity>:null}
    
        
       
    </View>
    {OpenUrl(data.PostBody,data,navigation,data.PostImage,data.PostId,'')}
    {data.PostImage != ""?<View style={{position:'relative',width:Dimensions.get('screen').width}}>

    {data.Stat != "" && data.StatData != "0" && data.ShareData != "0" || !data.Payment.match(/acct\_([a-zA-Z0-9_]+)/) || data.PostsSecurity == "copyright" ||data.SubsData != "0" || data.ShareData != "0" || data.Stat == "" || data.MyUserName == data.UserName || data.usersID == 1 || data.thisID == 1  ?<MultiMedias navigation={navigation} data={data} /> :
    
        <View style={{position:'relative',width:Dimensions.get('screen').width,height: Dimensions.get('window').height -470}}>
        
        <View style={{position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',zIndex:3,height: Dimensions.get('window').height -480,backgroundColor:'rgba(0,0,0,0.9)'}} >
        
        <PaymentComponet navigation={navigation} data={data} Auth={Auth} />

        </View>
        
        <MultiMedias navigation={navigation} data={data} />
        </View>
        
        
        }
    </View>:null}


    {data?.UserName == data?.MyUserName?<TouchableOpacity 
    onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/promoanalytics/p/'+data.PostId,title:'Post Insight'})
    }}
    style={{marginBottom:10,paddingLeft:10,alignSelf:'flex-start'}}><Text style={{fontSize:15,color:'blue',fontWeight:'600'}}>Insight</Text></TouchableOpacity>:null}

    <View style={FeedItemstyles.FeedItemBottom}>
    {data?.LikesData == "0"?<TouchableOpacity onPress={()=>{
    if(Auth.Authuser.length  == 0){navigation.navigate('Signin');}else{

        data.LikesData = 1;
        data.LikesCount = Number(data.LikesCount)+1

        Auth.setPostDataSource([...Auth.PostDataSource])

        PostLikeApi(data.PostId,"","","")
        


    }}} style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}>
        <Icon  name={'heart-o'}  type={'font-awesome'} />
        <Text>{data?.LikesCount}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>{
        if(Auth.Authuser.length  == 0)
        {navigation.navigate('Signin');}
        else{
    
            data.LikesData = 0;
            data.LikesCount = Number(data.LikesCount)-1
    
            Auth.setPostDataSource([...Auth.PostDataSource])
            PostLikeApi(data.PostId,"","","")

    
        }}} style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}>
            <Icon  color={'#0086ff'} name={'heart'} type={'font-awesome'} />
            <Text>{data?.LikesCount}</Text>
            </TouchableOpacity>}
    
    
    {<TouchableOpacity onPress={()=>{
if(Auth.Authuser.length  == 0){

navigation.navigate('Signin');

}else{

navigation.navigate('Comment',{postId:data.PostId});

}
        
    }}><Icon  name={'comment-o'} type={'font-awesome'} /></TouchableOpacity>}

    
    {data.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<TouchableOpacity onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/@'+data.UserName+'/contribute'})
    }}><Icon  name={'dollar'} type={'font-awesome'} /></TouchableOpacity>:null}


{!isProfile?<TouchableOpacity onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/pininsight/'+data.PostId})
    }}><Icon  name={'map-pin'} type={'font-awesome'} /></TouchableOpacity>:null}


    {/*<TouchableOpacity><Icon  name={'share'} type={'font-awesome'} /></TouchableOpacity>*/}
    {<TouchableOpacity onPress={()=>{
        const u = 'https://mymiix.com/p/'+data.UniqeId
        Sharing.shareAsync(u)

    }}><Icon  name={'share'} type={'font-awesome5'} /></TouchableOpacity>}

    </View>
    
    


    {/*<GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.FULL_BANNER]}
/>*/}

    </View>
    
    )


}


