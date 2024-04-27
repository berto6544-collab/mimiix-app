import React from "react";
import { StorieStyle } from "../../StyleComponent/Style";
import { View,Text,TouchableOpacity, Dimensions } from "react-native";
import { StorieDataAPI } from "../../API/API";
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/base";
import Stories from "../../storiesNow/screens/Stories";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";


export default Story = ({query,Auth,navigation}) =>{


const [dataSource,setDataSource] = React.useState([]);
const [start,setStart] = React.useState(0);
const [showDrawer,setShowDrawer] = React.useState(false)




React.useEffect(()=>{



},[])




return(
<View style={[StorieStyle.StoryBase,{paddingVertical:20,paddingTop:20}]}>




<Stories navigation={navigation} Auth={Auth} setShowDrawer={setShowDrawer} />


<DrawerProfileDialog 
onshow={showDrawer} 
navigation={navigation}
title={'Create'}
Auth={Auth}
username={''}
profileImage={''}
userStats={''}
setClose={()=>{setShowDrawer(false)}}

> 
<View style={{display:'flex',width:'100%',flexDirection:'column',gap:10}}>
{<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/story',title:'create story'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Story</Text></TouchableOpacity>}
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/event'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Event</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/quoteform',title:'Add an inspirational quote!'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Add Quote</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/blog'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Blog</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{ navigation.navigate('UniteLive',{url:'https://mymiix.com/create/unite',title:'Unite'}); setShowDrawer(false); }} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Unite</Text></TouchableOpacity>



</View>

</DrawerProfileDialog>



</View>)


} 

