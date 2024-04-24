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
import {FlashList, useBenchmark} from "@shopify/flash-list"

import { AuthContext } from "../../AuthContext/context";
import DrawerCompMain from "../../component/DrawerComponents/DrawerCompMain";
import { SafeAreaView } from "react-native-safe-area-context";
import BoardComp from "./component/BoardComp";






export default function Feed({navigation}){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)
    const [tabIndex,setTabIndex] = React.useState(0)
    const [showDrawer,setShowDrawer] = React.useState(false)
    const [showMessageDrawer,setShowMessageDrawer] = React.useState(false)
    const flashListRef = useRef(null);

  const Auth = React.useContext(AuthContext);
  /*const onBlankArea = useBenchmark (ref,(result)=>{


  })*/

React.useEffect(()=>{

    fetchData();



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
       .then((response) => response.json())
        .then((responseJson)=>{
           
         
         //this.ViewItem(ele.key,responseJson['Likes'])
        
         
       
         
       
        });
       }

       
       console.log(ele.item['Vieweddd'])
       
       }
       }

     
       

     });
     
    


 }



    return(
    <View style={{flex:1}}>

<SafeAreaView style={{backgroundColor:'white'}} edges={['top']}>
 <View style={[FeedItemstyles.TopNav,{backgroundColor:'white'}]}>

  <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>

    {/*Button navigates you to the message screen or if your not signed-in then the signin screen */}
  <Icon  name={'send'} size={25} onPress={()=>{ setShowMessageDrawer(true);}} type={'feather'} />


 {/*Button navigates you to the explore screen */}
<TouchableOpacity onPress={()=>{ 
  if(Auth.Authuser.length > 0){
  navigation.navigate('Explore');
  }else{
    navigation.navigate('Signin');
  }
  
  }}><Icon name={'compass-outline'} size={30} type={'ionicon'} /></TouchableOpacity>

  </View>
<Image style={{width:100,height:40}} source={require('../../assets/img/logo(3).png')} />
 
<View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}>

  {/*Button navigates you to create post screen or if your not signed-in then the signin screen */}
<TouchableOpacity onPress={()=>{ if(Auth.Authuser.length > 0 ){ navigation.navigate('CreatePost'); }else{ navigation.navigate('Signin') } }}>
<Icon  name={'plus-square'} solid={true} size={27} type={'feather'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>{ 
  setShowDrawer(true);
  
  }} >
<Icon  name={'menu'} solid={true} size={27} type={'feather'} />
</TouchableOpacity>


</View>

 </View>
    
 </SafeAreaView>

<View style={{flex:1}}>


 <FlashList
      
     ref={flashListRef}
      ListHeaderComponent={
      <View style={{width:'100%',display:'flex',paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'flex-start'}}>
      
      {Auth.Authuser.length == 0?<BoardComp navigation={navigation} /> : <Storie query={''} navigation={navigation} Auth={Auth} />}
      <QuoteComp Auth={Auth} navigation={navigation} />

      </View>
      }
      
      
      data={Auth.PostDataSource}
      renderItem={({item,index}) => {return(<FeedItem dataSource={Auth.PostDataSource} setDataSource={Auth.setPostDataSource} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)}}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      initialNumToRender={4} 
      updateCellsBatchingPeriod={100} 
      maxToRenderPerBatch={5}
      getItemType={({item,index})=>index}
      //windowSize={5}
     //estimatedItemSize={100}
     
     removeClippedSubviews={false} 
    
     
    //onViewableItemsChanged={onViewableItemsChanged}
    //numColumns={1}
    
    keyExtractor={(item,index)=>index}
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

<Buttons onPressed={()=>{ navigation.navigate('ChatRoom'); setShowMessageDrawer(false); }} title={'ChatRoom'} icon1={{name:'send', type:'feather'}} />

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