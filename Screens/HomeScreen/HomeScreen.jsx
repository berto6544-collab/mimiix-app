import React,{useRef} from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, TouchableOpacity, View,FlatList } from "react-native";
import FeedItem from "../../component/feedItems/feedItem";
import { FeedItemstyles } from "../../StyleComponent/Style";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import QuoteComp from '../../component/Quote/QuoteComponent';
import Storie  from '../../component/StoriesComp/StorieComp'
import DrawerDialog from "../../Dialog/DrawerDialog";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";
import {FlashList} from "@shopify/flash-list"
import BigList from "react-native-big-list";
import { AuthContext } from "../../AuthContext/context";
import DrawerCompMain from "../../component/DrawerComponents/DrawerCompMain";
import { SafeAreaView } from "react-native-safe-area-context";
import BoardComp from "./component/BoardComp";
import PinnedPosts from "./component/PinnedPosts";

import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { RewardedAd, RewardedAdEventType,useRewardedAd } from 'react-native-google-mobile-ads';
import { PostWatchedAdAPi } from "../../API/API";
import HeaderComp from "./component/HeaderComp";



const adUnitIdd = 'ca-app-pub-';


export default function Feed({navigation}){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)
    const [tabIndex,setTabIndex] = React.useState(0)
    const [postId,setPostId] = React.useState(0)
    const [profileShower,setProfileShower] = React.useState(0)
    const [showDrawer,setShowDrawer] = React.useState(false)
    const [showMessageDrawer,setShowMessageDrawer] = React.useState(false)
    const [adUnitIds,setAdUnitId] = React.useState('ca-app-pub-')
    const [status,setStatus] = React.useState('')
    const [loaded, setLoaded] = React.useState(false);

    const flashListRef = useRef(null);
    
  const Auth = React.useContext(AuthContext);
  
  /*const onBlankArea = useBenchmark (ref,(result)=>{


  })*/

  


React.useEffect(()=>{
  fetchData();
},[])



React.useEffect(()=>{





    


},[])



const fetchData = () => {

FeedsData(Auth.start).then(response=>{
if(response.length == 0)
return;
Auth.setPostDataSource(response)
Auth.setStart(Auth.start+1)


})




}



const handleCloseMessageDrawer = () =>{
  setShowMessageDrawer(false)
}


const handleLoadMore = ()=>{


    FeedsData(Auth.start).then(response=>{
        if(response.length == 0)
        return;
        Auth.setPostDataSource(Auth.PostDataSource.concat(response))
        Auth.setStart(Auth.start+1)
        
        })

}

function addExtraItemEvery4(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
      result.push(arr[i]);
      if ((i + 1) % 4 === 0) {
          result.push({
            type:"banner"
          });
      }
  }
  return result;
}

const handleCloseDrawer = () =>{
  setShowDrawer(false);
}

const onViewableItemsChanged = ({ viewableItems, changed }) => {
    
    
  // console.log("Changed in this iteration", changed);
  console.log("Visible items are", viewableItems);
  
viewableItems.forEach(ele => {
     //  console.log(ele.key);


 


if(ele.isViewable === true){
 
 if(ele.item['type'] == "banner"){

   
     


 }else{

   
   ele.item['Count'] += 1;
   
     if(ele.item['Vieweddd'] == 0){
       ele.item['Vieweddd'] = 1;
     
     fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+ele.item['PostId']+"",{
         method:'GET',
         header:{
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
         
       })
       .then((response) => response.json());
       
       }

       
       
       }
       }

     
       

     });
     
    


 }



    return(
    <View style={{flex:1}}>

<SafeAreaView style={{backgroundColor:'white'}} edges={['top']}>
 <HeaderComp navigation={navigation} Auth={Auth} setProfileShower={setProfileShower} setShowDrawer={setShowDrawer} setShowMessageDrawer={setShowMessageDrawer} />
    
 </SafeAreaView>

<View style={{flex:1,overflow:'hidden'}}>


 <FlashList
      
     ref={flashListRef}
     removeClippedSubviews={false}
     ListHeaderComponent={
      <View style={{width:'100%',display:'flex',paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'flex-start'}}>
      
      {Auth.Authuser.length == 0?<BoardComp navigation={navigation} /> : null}
      {<Storie query={''} profileShower={profileShower} setProfileShower={setProfileShower} navigation={navigation} Auth={Auth}  />}
      <QuoteComp Auth={Auth} navigation={navigation} />

        <PinnedPosts setPostId={setPostId} loaded={loaded} setAdUnitId={setAdUnitId} setStatus={setStatus} rewarded={Auth.rewarded} navigation={navigation} Auth={Auth} />

      </View>
      }
      
      
      data={Auth.PostDataSource}
      
      renderItem={({item,index}) => {
       if(item.type == ""){
        return(<FeedItem setPostId={setPostId} dataSource={Auth.PostDataSource} loaded={loaded} setAdUnitId={setAdUnitId} setStatus={setStatus} rewarded={Auth.rewarded} setDataSource={Auth.setPostDataSource} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)
       }else{
        return(<View style={{display:'flex',flexDirection:'column',alignItems:'center',paddingBottom:20,width:'100%'}}><GAMBannerAd
          unitId={adUnitId}
          sizes={[BannerAdSize.BANNER]}
          
        /></View>)

       }
      }}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      estimatedItemSize={530}
      //estimatedItemSize={530}
      extraData={{}}
      //maintainVisibleContentPosition={{autoscrollToTopThreshold:0,minIndexForVisible:0}}
      //windowSize={10}
      getItemType={({item,index})=>{return ""+index}}
  
      
      //maxToRenderPerBatch={8}
      windowSize={11}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      //removeClippedSubviews={false}
      keyExtractor={(item, index) => ""+item.Id}
      onViewableItemsChanged={onViewableItemsChanged} 
      
       
       />

</View>

<SafeAreaView edges={['bottom']} style={FeedItemstyles.BottomNav} >


<View  style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
{/*Button navigates you to the home screen */}
  <Icon name={'home'} size={33} color={'blue'} type={'fontisto'} onPress={()=>{ if(Auth.Authuser.length > 0 ){ navigation.navigate('Home'); }else{ navigation.navigate('Signin'); } }} />


 {/*Button navigates you to the notification screen or signin screen */}
<TouchableOpacity onPress={()=>{if(Auth.Authuser.length > 0 ){ navigation.navigate('Notifications'); }else{ navigation.navigate('Signin'); } }}>
<Icon name={'notifications'} size={35} type={'ionicon'} />
</TouchableOpacity>



  
  {/*Button navigates you to users profile or if your not signed-in then the signin screen */}
  
<TouchableOpacity onPress={()=>{if(Auth.Authuser.length > 0 ){ navigation.navigate('Profile',{username:Auth.Authuser[0].UserName,title:'@'+Auth.Authuser[0].UserName}); }else{ navigation.navigate('Signin') }; }}>
{<Avatar size={40} rounded={true} source={{uri:Auth.Authuser.length > 0 ? Auth.Authuser[0].ProfileImage:'https://mymiix.com/public/assets/img/no-avatar.jpg'}} />}
</TouchableOpacity>




 </View>

</SafeAreaView>


<DrawerDialog 
setClose={handleCloseDrawer}
Auth={Auth}
overlayStyle={{flex:1,width:'100%',position:'relative',alignSelf:'flex-end'}}
navigation={navigation} onshow={showDrawer} title={''} 
username={Auth.Authuser.length > 0 ?Auth.Authuser[0].UserName:''} 
profileImage={Auth.Authuser.length > 0 ?Auth.Authuser[0].ProfileImage:''}  
userStats={Auth.Authuser.length > 0 ?Auth.Authuser[0].UsersStat:''} 


>

<DrawerCompMain setStart={setStart} setClose={handleCloseDrawer} navigation={navigation} Auth={Auth} />

</DrawerDialog>



<DrawerProfileDialog
setClose={handleCloseMessageDrawer}
Auth={Auth}
overlayStyle={{flex:1,width:'100%',position:'relative',alignSelf:'flex-end'}}
navigation={navigation} 
onshow={showMessageDrawer} 
title={'Messages'} 
username={''} 
profileImage={''}  
userStats={''} 


>
<View style={{flex:1,display:'flex',overflow:'scroll',flexDirection:'column',gap:10,marginTop:20,position:'relative'}}>

<Buttons onPressed={()=>{ if(Auth.Authuser.length > 0 ){ navigation.navigate('UserMessage'); }else{ navigation.navigate('Signin'); } setShowMessageDrawer(false); }} title={'Direct Message'} icon1={{name:'send', type:'feather'}} />

{/*<Buttons onPressed={()=>{ navigation.navigate('ChatRoom'); setShowMessageDrawer(false); }} title={'ChatRoom'} icon1={{name:'send', type:'feather'}} />*/}

</View>
</DrawerProfileDialog>




    </View>)
}



export const Buttons = ({onPressed,title,icon1}) =>{




  return(
<TouchableOpacity  onPress={()=>{
onPressed();
}} style={{display:'flex',justifyContent:'space-between',marginBottom:10,flexDirection:'row',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>

<Text style={{fontWeight:'600',fontSize:20}}>{title}</Text>
</View>
<Icon  name={'right'} type={'antdesign'} />

</TouchableOpacity>
  )
}
