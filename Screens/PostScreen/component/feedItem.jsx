import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../../StyleComponent/Style";
import { OpenUrl } from "../../../Utils/URL";
import {MultiMedias} from '../../../component/Media/Media';
import PaymentComponet from "../../../component/feedItems/component/PaymentComponet";
import * as Sharing from 'expo-sharing';
import { PostDeleteAPi, PostLikeApi } from "../../../API/API";
import FastImage from "react-native-fast-image";
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { PostWatchedAdAPi } from "../../../API/API";

const adUnitId = 'ca-app-pub-6989684433220866/6129242070';
const rewarded = RewardedAd.createForAdRequest(adUnitId);

export default function FeedItem({data,navigation,dataSource,setDataSource,index,Auth,isProfile}){

    const [adUnitIds,setAdUnitId] = React.useState('ca-app-pub-6989684433220866/6129242070')
    const [status,setStatus] = React.useState('')
    const [loaded, setLoaded] = React.useState(false);
    const [postId,setPostId] = React.useState(0)

 const Delete = () =>{

    PostDeleteAPi(data.PostId)
    .then(res=>{

        if(res.length == 0)return;

        dataSource.splice(index,1)
        setDataSource([...dataSource])

    })
 }    


 React.useEffect(()=>{





    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
        // Start loading the rewarded ad straight away
   rewarded.show();
    });
    
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {


        
        //console.log(reward.type)
        PostWatchedAdAPi(data.PostId,Auth.adStatus)
        .then(response=>{  
          console.log(response)
          if(response[0].Success == "Rewarded"){      
        data.StatData = "1";
        data.PostImage = response[0].PostImage;
        Auth.setPostDataSource([...Auth.PostDataSource]);
          }
      });

    
        
      },
    );

   

    
    // Start loading the rewarded ad straight away
    //if(!rewarded.loaded){
    
    //}

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };


},[]);


    return(
    <View key={index} style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    <View style={[FeedItemstyles.AvatarBase,{position:'relative'}]}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
    <FastImage style={{width:40,height:40,borderRadius:40}} 
    resizeMode={'cover'}
    source={{uri:data?.ProfileImage,priority:'high'}} />
    <Text onPress={()=>{
        if(data?.UserName == data?.MyUserName){

            navigation.navigate('Profile',{username:data.UserName, isMine:true})

        }else{
            navigation.navigate('Profile',{username:data.UserName, isMine:false})

        }
    }} style={{fontSize:18,fontWeight:'500'}}>{data.PostedBy?data.PostedBy:data.postName}</Text>
    </View>
    {data.UserName == data.MyUserName?<TouchableOpacity onPress={()=>{Delete()}} style={{position:'absolute',right:5}}><Icon color={'black'} name={'close'} type={'font-awesome'} /></TouchableOpacity>:null}
    
        
       
    </View>
    {OpenUrl(data.PostBody,data,navigation,data.PostImage,data.PostId,'')}
    {data.PostImage != ""?<View style={{position:'relative',width:Dimensions.get('screen').width}}>

    {data.Stat != "" && data.StatData != "0" || !data.Payment.match(/acct\_([a-zA-Z0-9_]+)/) || data.PostsSecurity == "copyright"  || data.Stat == "" || data.MyUserName == data.UserName || data.usersID == 1 || data.thisID == 1  ?<MultiMedias navigation={navigation} data={data} /> :
    
        <View style={{position:'relative',width:Dimensions.get('screen').width,height: Dimensions.get('window').height -470}}>
        
        <View style={{position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',zIndex:3,height: Dimensions.get('window').height -480,backgroundColor:'rgba(0,0,0,0.9)'}} >
        
        <PaymentComponet setPostId={setPostId} loaded={loaded} setAdUnitId={setAdUnitId} setStatus={setStatus} rewarded={rewarded} navigation={navigation} data={data} Auth={Auth} />

        </View>
        
        <MultiMedias navigation={navigation} data={data} />
        </View>
        
        
        }
    </View>:null}


    {data?.usersID == data?.thisID?<TouchableOpacity 
    onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/promoanalytics/p/'+data.PostId,title:'Post Insight'})
    }}
    style={{marginBottom:10,paddingLeft:10,alignSelf:'flex-start'}}><Text style={{fontSize:15,color:'#007bff',fontWeight:'600'}}>Insight</Text></TouchableOpacity>:null}

    <View style={FeedItemstyles.FeedItemBottom}>
   <TouchableOpacity style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}>
        <Icon  name={'heart-o'}  type={'font-awesome'} />
        <Text>{data?.postLikes}</Text>
        </TouchableOpacity>
        
    
    
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


{!isProfile?<TouchableOpacity onPress={async()=>{
       // navigation.navigate('Web',{url:'https://mymiix.com/pininsight/'+data.PostId})

     Auth.setAdStatus("pinned")
     setPostId(data.PostId);

       await rewarded.load();

      
    }}><Icon  name={'map-pin'} type={'font-awesome'} /></TouchableOpacity>:null}


    {/*<TouchableOpacity><Icon  name={'share'} type={'font-awesome'} /></TouchableOpacity>*/}
    {<TouchableOpacity onPress={()=>{
        const u = 'https://mymiix.com/p/'+data.UniqeId
        Sharing.shareAsync(u)

    }}><Icon  name={'share'} type={'font-awesome5'} /></TouchableOpacity>}

    </View>
    
    


  





    </View>
    
    )


}


