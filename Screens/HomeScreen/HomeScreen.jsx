import React from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, View } from "react-native";
import FeedItem from "../../component/feedItems/feedItem";
import { FeedItemstyles } from "../../StyleComponent/Style";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import QuoteComp from '../../component/Quote/QuoteComponent';



import { AuthContext } from "../../AuthContext/context";

export default function Feed({navigation}){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)
    const [tabIndex,setTabIndex] = React.useState(0)

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
  <Icon name={'send'} size={25} type={'feather'} />
  <Icon name={'compass-outline'} size={30} type={'ionicon'} />
  </View>
  <Image style={{width:100,height:40}} source={require('../../assets/img/logo(3).png')} />
 
  <View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}>
<Icon onPress={()=>{

navigation.navigate('CreatePost')

}} name={'plus-square'} solid={true} size={27} type={'feather'} />
<Avatar rounded={true} source={{uri:Auth.Authuser.length > 0 ? Auth.Authuser[0]?.ProfileImage:'https://mymiix.com/public/assets/img/no-avatar.jpg'}} />

</View>

 </View>
    




 <OptimizedFlatList 
      
      
      ListHeaderComponent={
      <View style={{width:'100%',display:'flex',paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'center'}}>
      
      
      <QuoteComp Auth={Auth} navigation={navigation} />

      </View>
      }

      removeClippedSubviews={true}
      //style={[FeedItemstyles.container]} 
      data={Auth.PostDataSource}
      renderItem={({item,index}) => <FeedItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      //windowSize={5}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       
       />




<View style={FeedItemstyles.BottomNav}>

  <Text>Feed</Text>
 


 </View>


    </View>)
}
