import React from "react";
import { Text,Card,Image,Avatar } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, View } from "react-native";
import FeedItem from "../../component/feedItems/feedItem";
import { FeedItemstyles } from "../../StyleComponent/Style";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

export default function Feed(){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)



React.useEffect(()=>{

    fetchData();



},[])

const fetchData = () => {

FeedsData(start).then(response=>{
if(response.length == 0)
return;
setDataSource(response)
setStart(start+1)


})

}


const handleLoadMore = ()=>{


    FeedsData(start).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(dataSource.concat(response))
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

 </View>
    



 <OptimizedFlatList 
      
      
      removeClippedSubviews={true}
      //style={[FeedItemstyles.container]} 
      data={dataSource}
      renderItem={({item,index}) => <FeedItem key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      //windowSize={5}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       
       />


    </View>)
}
