import React from "react";
import { Text,Card,Image,Avatar, Icon,Tab } from "@rneui/themed";
import { ProfilePostAPI, ProfileBlogAPI } from "../../../API/API";
import { Dimensions, TouchableOpacity, View } from "react-native";
import FeedItem from "../../../component/feedItems/feedItem";
import {} from '../styles/styles';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import AvatarItems from "../components/AvatarItems";
import Status from "../components/Status";
import { AuthContext } from "../../../AuthContext/context";
import BlogItem from "../../../component/blogItems/blogItems";




export default function PostComp({navigation,item,username,index}){

    const [dataSource,setDataSource] = React.useState([]);
    const [start,setStart] = React.useState(0)
    const [Tabindex, setTabIndex] = React.useState(0);

 

  const Auth = React.useContext(AuthContext);
  

React.useEffect(()=>{

    fetchData();



},[])

const fetchData = () => {

if(Tabindex == 0 ){
ProfilePostAPI(start,item.UserName).then(response=>{
if(response.length == 0)
return;
setDataSource(response)
setStart(start+1)


})
} 

if(Tabindex == 1) {

  ProfileBlogAPI(start,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })

}


if(Tabindex == 2) {
  
    ProfilePostAPI(start,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })

}

}



const handleLoadMore = ()=>{


    if(Tabindex == 0 ){
   ProfilePostAPI(start,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(dataSource.concat(response))
        setStart(start+1)
        
        
        })
    }

    if(Tabindex == 1 ){
      ProfileBlogAPI(start,item.UserName).then(response=>{
             if(response.length == 0)
             return;
             setDataSource(dataSource.concat(response))
             setStart(start+1)
             
             
             })
         }

         if(Tabindex == 2 ){
            ProfilePostAPI(start,item.UserName).then(response=>{
                 if(response.length == 0)
                 return;
                 setDataSource(dataSource.concat(response))
                 setStart(start+1)
                 
                 
                 })
             }



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
    <View >

    

 <OptimizedFlatList 
      
      ListHeaderComponent={
        <View style={{width:'100%',display:'flex',paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'flex-start',marginBottom:30}}>
        
        <AvatarItems data={item} index={index}  username={item.UserName} profileImage={item.ProfileImage} userStats={item.UsersStat} />
        <Status data={item} index={index}  /> 
  


        <Tab value={Tabindex} indicatorStyle={{backgroundColor:'black',height:3}} onChange={(e)=>{
            
            setTabIndex(e)
            
if(e == 0){
    setDataSource([])
    setStart(0)
   

    ProfilePostAPI(0,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })
}

if(e == 1){
    setDataSource([])
    setStart(0)
    
    ProfileBlogAPI(0,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })
}

if(e == 2){
    setDataSource([])
    setStart(0)
  
    ProfilePostAPI(0,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })
}



            }} dense>
        <Tab.Item titleStyle={{color:'black'}}  >Posts</Tab.Item>
        <Tab.Item  titleStyle={{color:'black'}}>Blogs</Tab.Item>
        <Tab.Item titleStyle={{color:'black'}}>Events</Tab.Item>
        </Tab>
        </View>
        }
    
      removeClippedSubviews={true}
      data={dataSource}
      renderItem={({item,index}) => Tabindex != 1?<FeedItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} />:<BlogItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.9}
      //windowSize={5}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       
       />






    </View>)
}
