import React from "react";
import { StorieStyle } from "../../StyleComponent/Style";
import { View,Text,TouchableOpacity, Dimensions } from "react-native";
import { GetEventLiveAPi} from "../../API/API";
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/base";
import Stories from "../../storiesNow/screens/Stories";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";
import { FlashList } from "@shopify/flash-list";
import { OptimizedFlatList } from "react-native-optimized-flatlist";


export default Story = ({query,Auth,navigation,setProfileShower,profileShower}) =>{


const [dataSource,setDataSource] = React.useState([]);
const [start,setStart] = React.useState(0);
const [showDrawer,setShowDrawer] = React.useState(false)




React.useEffect(()=>{

getData();

},[])

const getData = () =>{
  GetEventLiveAPi(start,'')
  .then(response=>{
    if(response.length == 0)return;
    setDataSource(response);
    setStart(start+1);

  })
}


const handleLoadMore = () =>{
  GetEventLiveAPi(start,'')
  .then(response=>{
    if(response.length == 0)return;
    setDataSource(dataSource.concat(response));
    setStart(start+1);

  })
}

return(
<View style={[StorieStyle.StoryBase,{paddingVertical:20,paddingTop:20}]}>




<OptimizedFlatList

data={dataSource}
estimatedItemSize={75}
keyExtractor={(item, index) => ""+item.id}
horizontal={true}
showsHorizontalScrollIndicator={false}
style={{height:75,width:'100%',flex:dataSource.length > 0?0.3:0,gap:5}}
onEndReached={handleLoadMore} 
onEndReachedThreshold={0.9}
renderItem={({item,index})=>{
return(
<TouchableOpacity onPress={() =>{
  navigation.navigate('Web',{url:item.Link,title:item.title})
}} >
<View style={{position:'relative',backgroundColor:'white',padding:10,borderRadius:5,alignItems:'center',display:'flex',flexDirection:'column'}}>
  <Avatar size={50} containerStyle={{borderColor:'black',borderWidth:1.5}}  rounded={true} source={{uri:item.profileImg}} />
<Text>Event </Text>
  </View>

</TouchableOpacity>) 

}}
/>

{/*<Stories navigation={navigation} Auth={Auth} setShowDrawer={setShowDrawer} />*/}
 
<DrawerProfileDialog 
onshow={profileShower} 
navigation={navigation}
title={'Create'}
Auth={Auth}
username={''}
profileImage={''}
userStats={''}
setClose={()=>{setProfileShower(false)}}

> 

<View style={{display:'flex',width:'100%',flexDirection:'column',gap:10}}>
{<TouchableOpacity onPress={()=>navigation.navigate('CreatePost')} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Post</Text></TouchableOpacity>}
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/event'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Event</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/quoteform',title:'Add an inspirational quote!'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Add Quote</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/add/link',title:'Add your link!'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Add Links</Text></TouchableOpacity>
{/*<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/blog'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Blog</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{ navigation.navigate('UniteLive',{url:'https://mymiix.com/create/unite',title:'Unite'}); setShowDrawer(false); }} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Unite</Text></TouchableOpacity>*/}



</View>

</DrawerProfileDialog>



</View>)


} 

