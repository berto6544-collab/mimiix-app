import React from "react";
import { Text,Card,Image,Avatar, Icon,Tab,Button } from "@rneui/themed";
import { ProfilePostAPI, ProfileBlogAPI } from "../../../API/API";
import { Dimensions, TouchableOpacity, View } from "react-native";
import FeedItem from "../../../component/feedItems/feedItem";
import {} from '../styles/styles';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import AvatarItems from "../components/AvatarItems";
import Status from "../components/Status";
import { AuthContext } from "../../../AuthContext/context";
import BlogItem from "../../../component/blogItems/blogItems";
import { FlashList } from "@shopify/flash-list";



export default function PostComp({navigation,item,username,index,setData,data}){

    const [dataSource,setDataSource] = React.useState([]);
    const [start,setStart] = React.useState(0)
    const [Tabindex, setTabIndex] = React.useState(0);
    const nativeAdViewRef = React.useRef();
 

  const Auth = React.useContext(AuthContext);
  

React.useEffect(()=>{

    fetchData();
    nativeAdViewRef.current?.loadAd();



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
    <View  style={{flex:1}}>

       

 {<OptimizedFlatList
      
      ListHeaderComponent={
        <View style={{width:'100%',display:'flex',paddingHorizontal:0,flex:1,flexDirection:'column',gap:20,alignItems:'flex-start',marginBottom:10}}>
        


        <AvatarItems data={item} index={index}  username={item.UserName} profileImage={item.ProfileImage} userStats={item.UsersStat} />
        
       
      
        <Status data={item} index={index}  /> 
        


        <View style={{paddingHorizontal:10,display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:10,width:'100%'}}>
          {item?.Followed == "0"?
          <Button 
          onPress={()=>{
            item.Followed = 1
            setData([...data])
          }}
          title="Follow" 
          radius={5}
          containerStyle={{width:'48%'}}
          type='solid' 
          titleStyle={{color:'white',fontWeight:'600'}}
          color={'rgb(0, 123, 255)'} 
          
          />
          :
          <Button 
          onPress={()=>{
            item.Followed = 0
            setData([...data])
          }}
          title="UnFollow" 
          radius={5}
          containerStyle={{width:'48%'}}
          titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}}
          color={'white'} 
          type='solid' 
          
          />}
           <Button 
          onPress={()=>{
            navigation.navigate('Messages',{userName:item?.UserName,MyUserId:item?.MyuserId,MyUsername:item?.MyUserName,userid:item?.OtheruserId,Profile:item?.ProfileImage,isOnline:"0",name:item?.Name})
          }}
          title="Message" 
          radius={5}
          containerStyle={{width:'48%'}}
          titleStyle={{color:'white',fontWeight:'600'}}
          color={'rgb(0, 123, 255)'} 
          type='solid' 
          
          />

          {item?.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<View style={{width:'48%',position:'relative'}}>{item?.SubsData == "0"?
          <Button 
          title="Subscribe" 
          radius={5}
          onPress={()=>{
            navigation.navigate('Web',{url:'https://mymiix.com/@'+item.UserName+'/subscription'})
          }}
          containerStyle={{width:'100%'}}
          type='solid' 
          titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}}
          color={'white'}  
          />
          :
          <Button 
          title={"SUBSCRIBED UNTIL "+item?.SubsDate} 
          radius={5}
          containerStyle={{width:'100%'}}
          titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}}
          color={'rgb(0, 123, 255)'} 
          type='outline'
          />} 
          </View>:null}

          
          
          {item?.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<Button 
          title="Tip" 
          radius={5}
          onPress={()=>{
            navigation.navigate('Web',{url:'https://mymiix.com/@'+item.UserName+'/tip'})
          }}
          containerStyle={{width:'48%'}}
          titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}}
          color={'white'} 
          type='solid'
          
          />:null}
          </View>
            
        <View style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:30}}>
        <TouchableOpacity onPress={()=>{
          
            setDataSource([])
            setStart(0)
            setTabIndex(0)
        
            ProfilePostAPI(0,item.UserName).then(response=>{
                if(response.length == 0)
                return;
                setDataSource(response)
                setStart(start+1)
                
                
                })
        
        }} style={{padding:'10',borderBottomWidth: Tabindex == 0?2:0}}><Text style={{color:'black',textAlign:'center',fontSize:20}}>Posts</Text></TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          
          setDataSource([])
          setStart(0)
          setTabIndex(1)
      
          ProfileBlogAPI(0,item.UserName).then(response=>{
              if(response.length == 0)
              return;
              setDataSource(response)
              setStart(start+1)
              
              
              })
      
      }}
        
        style={{padding:'10',borderBottomWidth:Tabindex == 1?2:0}}><Text style={{color:'black',textAlign:'center',fontSize:20}}>Blogs</Text></TouchableOpacity>



        <TouchableOpacity 
        onPress={()=>{
          
          setDataSource([])
          setStart(0)
          setTabIndex(2)
      
          ProfilePostAPI(0,item.UserName).then(response=>{
              if(response.length == 0)
              return;
              setDataSource(response)
              setStart(start+1)
              
              
              })
      
      }}
        
        style={{padding:'10',borderBottomWidth:Tabindex == 2?2:0}}><Text style={{color:'black',fontSize:20}}>Events</Text></TouchableOpacity>
        
        </View>

       
        
        </View>
        }
    
        
      removeClippedSubviews={true}
      data={dataSource}
      renderItem={({item,index}) => Tabindex != 1?<FeedItem isProfile={true} dataSource={dataSource} setDataSource={setDataSource} navigation={navigation} Auth={Auth} key={index} index={index} data={item} />:<BlogItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      estimatedItemSize={100}
      onEndReachedThreshold={0}
      keyExtractor={item=>item.PostId}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       />}






    </View>)
}
