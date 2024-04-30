import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View } from "react-native";

import { FeedItemstyles } from "../../../StyleComponent/Style";
import { OpenUrl } from "../../../Utils/URL";
import {MultiMedias} from '../../../component/Media/Media';
import PaymentComponet from "../../../component/feedItems/component/PaymentComponet";
import * as Sharing from 'expo-sharing';
import { PostDeleteAPi, PostLikeApi } from "../../../API/API";
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { PostWatchedAdAPi } from "../../../API/API";

const adUnitId = 'ca-app-pub-6989684433220866/6129242070';
const rewarded = RewardedAd.createForAdRequest(adUnitId);

export default function FeedItem({data,navigation,dataSource,setDataSource,index,Auth,isProfile}){

    const [adUnitIds,setAdUnitId] = React.useState('ca-app-pub-6989684433220866/6129242070')
    const [status,setStatus] = React.useState('content')
    const [loaded, setLoaded] = React.useState(false);
    const [postId,setPostId] = React.useState(0)



    React.useEffect(()=>{





        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setLoaded(true);
            // Start loading the rewarded ad straight away
        if(!rewarded.loaded){
          rewarded.load();
          }
        });
        
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
    
    
            
            //console.log(reward.type)
            PostWatchedAdAPi(data.PostId,status)
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
        rewarded.load();
        //}
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
    
    
    },[]);


 const Delete = () =>{

    PostDeleteAPi(data.PostId)
    .then(res=>{

        if(res.length == 0)return;

        dataSource.splice(index,1)
        setDataSource([...dataSource])

    })
 }    


    return(
    <TouchableOpacity activeOpacity={1} key={index}  onPress={()=>{
        navigation.navigate('Post',{uniqid:data?.UniqeId})
    }} style={[FeedItemstyles.FeedItem,{position:'relative'}]}>
    <View style={[FeedItemstyles.AvatarBase,{position:'relative',marginBottom:3}]}>
    <View style={{width:'100%',paddingHorizontal:5,display:'flex',flexDirection:'row',alignItems:'center',gap:2}}>
    <Text style={{fontWeight:'500',fontSize:18}}>#{data?.Count}</Text>
    
    <Text onPress={()=>{
       
            navigation.navigate('Profile',{username:data.UserName, isMine:false})

           }} style={{fontSize:18,fontWeight:'500'}}>{data.PostTitle}</Text>

        
    </View>
    
       
    </View>

    <View style={{display:'flex',width:'100%',paddingLeft:10,marginBottom:10,flexDirection:'row',alignItems:'flex-start',gap:5}}>
    <Text onPress={()=>{
       
            navigation.navigate('Profile',{username:data.UserName, isMine:false})

           }} style={{color:'grey',fontSize:15}} >{data.UserName}</Text>

        <Text style={{color:'grey',fontSize:15}}>. {data.Views} Views</Text>
        </View>

    {OpenUrl(data.PostBody,data,navigation,data.PostImage,data.PostId,'')}
    {data.PostImage != ""?<View style={{position:'relative',width:Dimensions.get('screen').width}}>

    {data.Stat != "" && data.StatData != "0" || !data.Payment.match(/acct\_([a-zA-Z0-9_]+)/) || data.PostsSecurity == "copyright" || data.SubsData != "0" || data.Stat == "" || data.MyUserName == data.UserName || data.usersID == 1 || data.thisID == 1  ?<MultiMedias navigation={navigation} data={data} /> :
    
        <View style={{position:'relative',width:Dimensions.get('screen').width,height: Dimensions.get('window').height -470}}>
        
        <View style={{position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',zIndex:3,height: Dimensions.get('window').height -480,backgroundColor:'rgba(0,0,0,0.9)'}} >
        
        <PaymentComponet setPostId={setPostId} loaded={loaded} setAdUnitId={setAdUnitId} setStatus={setStatus} rewarded={rewarded} navigation={navigation} data={data} Auth={Auth} />

        </View>
        
        <MultiMedias navigation={navigation} data={data} />
        </View>
        
        
        }
    </View>:null}


    {data?.UserName == data?.MyUserName?<TouchableOpacity 
    onPress={()=>{
        navigation.navigate('Web',{url:'https://mymiix.com/promoanalytics/p/'+data.PostId,title:'Post Insight'})
    }}
    style={{marginBottom:10,paddingLeft:10,alignSelf:'flex-start'}}><Text style={{fontSize:15,color:'#007bff',fontWeight:'600'}}>Insight</Text></TouchableOpacity>:null}

    <View style={FeedItemstyles.FeedItemBottom}>
    
     
        <TouchableOpacity onPress={()=>{
        if(Auth.Authuser.length  == 0)
        {navigation.navigate('Signin');}
        else{
    
            data.LikesData = 0;
            data.LikesCount = Number(data.LikesCount)-1
    
            setDataSource([...dataSource])
            PostLikeApi(data.PostId,"","","")

    
        }}} style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5}}>
            <Icon  color={'#0086ff'} name={'heart'} type={'font-awesome'} />
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
    
       setStatus('pinned')
       setPostId(data.PostId);

       await rewarded.load();

       setTimeout(async() => {
        
       
        await rewarded.show();
     }, 800);
    
    }}><Icon  name={'map-pin'} type={'font-awesome'} /></TouchableOpacity>:null}


    {/*<TouchableOpacity><Icon  name={'share'} type={'font-awesome'} /></TouchableOpacity>*/}
    {<TouchableOpacity onPress={()=>{
        const u = 'https://mymiix.com/p/'+data.UniqeId
        Sharing.shareAsync(u)

    }}><Icon  name={'share'} type={'font-awesome5'} /></TouchableOpacity>}

    </View>
    
    


  

    </TouchableOpacity>
    
    )


}


