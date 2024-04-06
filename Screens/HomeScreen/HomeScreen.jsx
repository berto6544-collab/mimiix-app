import React from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, TouchableOpacity, View } from "react-native";
import FeedItem from "../../component/feedItems/feedItem";
import { FeedItemstyles } from "../../StyleComponent/Style";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import QuoteComp from '../../component/Quote/QuoteComponent';
import Storie  from '../../component/StoriesComp/StorieComp'
import DrawerDialog from "../../Dialog/DrawerDialog";


import { AuthContext } from "../../AuthContext/context";
import DrawerCompMain from "../../component/DrawerComponents/DrawerCompMain";

export default function Feed({navigation}){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)
    const [tabIndex,setTabIndex] = React.useState(0)
    const [showDrawer,setShowDrawer] = React.useState(false)

  const Auth = React.useContext(AuthContext);
  

React.useEffect(()=>{

    fetchData();



},[])

const fetchData = () => {

FeedsData(start).then(response=>{
if(response.length == 0)
return;
Auth.setPostDataSource(response)
setStart(start+1)


})

}



const handleLoadMore = ()=>{


    FeedsData(start).then(response=>{
        if(response.length == 0)
        return;
        Auth.setPostDataSource(Auth.PostDataSource.concat(response))
        setStart(start+1)
        
        
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
 
     //ele.item['Count'] += 1;
     
 
 /*if(ele.item['Vieweddd'] == 0){
   ele.item['Vieweddd'] = 1;
 
      fetch('https://mymiix.com/public/api/SponsoredAd?Id='+ele.item['Id']+'&userId='+'',{
           method:'GET',
           header:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           }
           
         })
         .then((response) => response.json())
          .then((responseJson)=>{
             
           
          
           
         
           
          });
 
 
 
         }*/
       
 
 
   }else{
 
     
     //ele.item['Count'] += 1;
     
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
    <View>

 <View style={FeedItemstyles.TopNav}>

  <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>

    {/*Button navigates you to the message screen or if your not signed-in then the signin screen */}
  <Icon name={'send'} size={25} onPress={()=>{
if(Auth.Authuser.length > 0 ){
  navigation.navigate('Message')
  }else{
    navigation.navigate('Signin')
  }

  }} type={'feather'} />


 {/*Button navigates you to the explore screen */}
<TouchableOpacity onPress={()=>{

navigation.navigate('Explore')
  
}}

>
  <Icon name={'compass-outline'} size={30} type={'ionicon'} />
</TouchableOpacity>

  </View>
  <Image style={{width:100,height:40}} source={require('../../assets/img/logo(3).png')} />
 
  <View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}>

  {/*Button navigates you to create post screen or if your not signed-in then the signin screen */}
  <TouchableOpacity onPress={()=>{

if(Auth.Authuser.length > 0 ){
  navigation.navigate('CreatePost')
  }else{
    navigation.navigate('Signin')
  }
}}

><Icon  name={'plus-square'} solid={true} size={27} type={'feather'} /></TouchableOpacity>

<TouchableOpacity onPress={()=>{

setShowDrawer(true)
}}

><Icon  name={'menu'} solid={true} size={27} type={'feather'} />
</TouchableOpacity>


</View>

 </View>
    




 <OptimizedFlatList 
      
      
      ListHeaderComponent={
      <View style={{width:'100%',display:'flex',paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'flex-start'}}>
      
      {<Storie query={''} Auth={Auth} />}
      <QuoteComp Auth={Auth} navigation={navigation} />

      </View>
      }

      removeClippedSubviews={true}
      data={Auth.PostDataSource}
      renderItem={({item,index}) => <FeedItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      //windowSize={5}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       
       />



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



    </View>)
}
