import React from "react";
import { Text,Card,Image,Avatar, Icon,Tab,Button } from "@rneui/themed";
import { ProfilePostAPI, ProfileBlogAPI,ProfileFuturePostAPI,ProfileLiveEventAPI } from "../../../API/API";
import { Dimensions, TouchableOpacity, View,FlatList,Alert } from "react-native";
import FeedItem from "../../../component/feedItems/feedItem";
import FeedItemEvent from "../../../component/feedItems/feedItemEvent";
import {} from '../styles/styles';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import AvatarItems from "../components/AvatarItems";
import Status from "../components/Status";
import { AuthContext } from "../../../AuthContext/context";
import BlogItem from "../../../component/blogItems/blogItems";
import { FlashList } from "@shopify/flash-list";
import {OpenUrls} from '../../../Utils/URL';
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



export default function PostComp({navigation,item,username,index,setData,data}){

    const [dataSource,setDataSource] = React.useState([]);
    const [dataSourceLink,setDataSourceLink] = React.useState([]);
    const [isTrue,setIsTrue] = React.useState(false);
    const [start,setStart] = React.useState(0)
    const [Tabindex, setTabIndex] = React.useState(0);
    const [AdUnit, setAdUnit] = React.useState("ca-app-pub-6989684433220866/6129242070");
    const [adUnitIds,setAdUnitId] = React.useState('ca-app-pub-6989684433220866/6129242070')
    const [status,setStatus] = React.useState('content')
    const [loaded, setLoaded] = React.useState(false);
    const [postId,setPostId] = React.useState(0)

    const nativeAdViewRef = React.useRef();
 

  const Auth = React.useContext(AuthContext);

 
  

React.useEffect(()=>{

    fetchData();
    nativeAdViewRef.current?.loadAd();
    setDataSourceLink(item.LinksArray);




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
  
  ProfileLiveEventAPI(start,item.UserName).then(response=>{
        if(response.length == 0)
        return;
        setDataSource(response)
        setStart(start+1)
        
        
        })

}

if(Tabindex == 3) {
  
  ProfileFuturePostAPI(start,item.UserName).then(response=>{
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
          ProfileLiveEventAPI(start,item.UserName).then(response=>{
                 if(response.length == 0)
                 return;
                 setDataSource(dataSource.concat(response))
                 setStart(start+1)
                 
                 
                 })
             }

             if(Tabindex == 3 ){
              ProfileFuturePostAPI(start,item.UserName).then(response=>{
                   if(response.length == 0)
                   return;
                   setDataSource(dataSource.concat(response))
                   setStart(start+1)
                   
                   
                   })
               }

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

       

 {<FlashList
      
      ListHeaderComponent={
        <View style={{width:'100%',display:'flex',paddingHorizontal:0,flex:1,flexDirection:'column',gap:20,alignItems:'flex-start',marginBottom:10}}>
        


        <AvatarItems data={item} index={index} navigation={navigation} username={item.UserName} profileImage={item.ProfileImage} userStats={item.UsersStat} />
        
       
      
        <Status data={item} index={index}  /> 
        


        {item.UserName != item.MyUserName?<View style={{paddingHorizontal:10,display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:10,width:'100%'}}>
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
          title="Unfollow" 
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

          {item?.Payment.match(/acct\_([a-zA-Z0-9_]+)/) && item.UserName != item.MyUserName?<View style={{width:'48%',position:'relative'}}>{
          item?.SubsData == "0"?
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
          title={"Subscribed"} 
          radius={5}
          onPress={()=>{
            Alert.alert('Your Subscribed To @'+item.UserName, "You have subscribed to @"+item.UserName+" until "+item?.SubsDate, [
              
              {text: 'OK', onPress: () => {

              }},
            ]);
          }}
          containerStyle={{width:'100%'}}
          titleStyle={{color:'rgb(0, 123, 255)',fontWeight:'600'}}
          color={'rgb(0, 123, 255)'} 
          type='outline'
          />} 
          </View>
          :
          null}

          

          
          
          {item?.Payment.match(/acct\_([a-zA-Z0-9_]+)/) && item.UserName != item.MyUserName?<Button 
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
          </View>:
          <View style={{paddingHorizontal:10,display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:10,width:'100%'}}>
            


            </View>}

            <View style={{paddingHorizontal:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}>
            <Text style={{fontSize:16,fontWeight:'600'}}>About Me</Text>
            <Text >{item.AboutMe}</Text>


            </View>


            <View style={{paddingHorizontal:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}>
            
            {item.LinksArray.length > 0 ?OpenUrls(dataSourceLink,isTrue,setIsTrue,setDataSourceLink,item.MyUserName,item.UserName,navigation):null}

            </View>
            
        <View style={{display:'flex',width:'100%',flexDirection:'row',borderBottomColor:'lightgrey',paddingBottom:10,borderBottomWidth:1,alignItems:'center',paddingHorizontal:10,paddingRight:15}}>
        <TouchableOpacity onPress={()=>{
          
          setDataSource([])
            setStart(0)
            setTabIndex(0)
        
            ProfilePostAPI(0,item.UserName).then(response=>{
              //setDataSource([])
                if(response.length == 0)return;
                setDataSource([...response])
                setStart(start+1)
                
                
                })
        
        }} style={{padding:10,width:'25%',backgroundColor:Tabindex == 0?'rgb(0, 123, 255)':'transparent',borderRadius:5}}><Text style={{color:Tabindex == 0?'white':'black',textAlign:'center',fontSize:15}}>Posts</Text></TouchableOpacity>
       
       {item.MyUserName == item.UserName?<TouchableOpacity onPress={()=>{
          
          setDataSource([])
          setStart(0)
          setTabIndex(3)
      
          ProfileFuturePostAPI(0,item.UserName).then(response=>{
            //setDataSource([])
           
              if(response.length == 0)return;
              
            
              setDataSource(response)
              setStart(start+1)
              
              
              })
      
      }} style={{padding:10,width:'25%',backgroundColor:Tabindex == 3?'rgb(0, 123, 255)':'transparent',borderRadius:5}}><Text style={{color:Tabindex == 3?'white':'black',textAlign:'center',fontSize:15}}>Future Posts</Text></TouchableOpacity>:null}
     
       
        {/*<TouchableOpacity 
        onPress={()=>{
          setDataSource([])
         
          setStart(0)
          setTabIndex(1)
      
          ProfileBlogAPI(0,item.UserName).then(response=>{
            //setDataSource([])
            if(response.length == 0)return;
            setDataSource([...response])
            setStart(start+1)
            
              
              
              })
      
      }}
        
        style={{padding:10,width:'25%',backgroundColor:Tabindex == 1?'rgb(0, 123, 255)':'transparent',borderRadius:5}}><Text style={{color:Tabindex == 1?'white':'black',textAlign:'center',fontSize:15}}>Blogs</Text></TouchableOpacity>*/}


        


        <TouchableOpacity 
        onPress={()=>{
          setDataSource([])
          
          setStart(0)
          setTabIndex(2)
      
          ProfileLiveEventAPI(0,item.UserName).then(response=>{
            //setDataSource([])
            if(response.length == 0)return;
            setDataSource(response)
            setStart(start+1)
            
              
              
              })
      
      }}
        
        style={{padding:10,width:'25%',alignItems:'center',backgroundColor:Tabindex == 2?'rgb(0, 123, 255)':'transparent',borderRadius:5}}><Text style={{color:Tabindex == 2?'white':'black',fontSize:15}}>Events</Text></TouchableOpacity>
        
        </View>

       
        
        </View>
        }
    
       
      removeClippedSubviews={false}
      data={dataSource}
      renderItem={({item,index}) => Tabindex == 1?<BlogItem navigation={navigation} Auth={Auth} key={index} index={index} data={item} /> : Tabindex == 2 ?<FeedItemEvent isProfile={true} dataSource={dataSource} setDataSource={setDataSource} navigation={navigation} Auth={Auth} key={index} index={index} data={item} />:<FeedItem isProfile={true} setPostId={setPostId} loaded={loaded} setAdUnitId={setAdUnitId} setStatus={setStatus} rewarded={Auth.rewarded} dataSource={dataSource} setDataSource={setDataSource} navigation={navigation} Auth={Auth} key={index} index={index} data={item} />}
      onEndReached={handleLoadMore} 
      estimatedItemSize={530}
      //drawDistance={Dimensions.get('screen').height * 2}
      //maintainVisibleContentPosition={{autoscrollToTopThreshold:0,minIndexForVisible:0}}
      getItemType={({item,index})=>{return ""+index}}
      style={{flex:1}}
      //windowSize={10}
      //scrollToOverflowEnabled={true}
      //snapToEnd={false}
      //snapToStart={false}
      //overScrollMode="never" 
      //nestedScrollEnabled 
      extraData={{}}
      showsVerticalScrollIndicator={false}
      
      //maxToRenderPerBatch={8}
      onEndReachedThreshold={0.9}
      keyExtractor={(item,index)=>""+item.Id}
      onViewableItemsChanged={onViewableItemsChanged}
      
       
       />}






    </View>)
}
