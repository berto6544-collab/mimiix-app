import React from "react";
import { StorieStyle } from "../../StyleComponent/Style";
import { View,Text,TouchableOpacity, Dimensions } from "react-native";
import { StorieDataAPI } from "../../API/API";
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/base";
//import Stories from "../../storiesNow/screens/Stories";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";


export default Story = ({query,Auth,navigation}) =>{


const [dataSource,setDataSource] = React.useState([]);
const [start,setStart] = React.useState(0);
const [showDrawer,setShowDrawer] = React.useState(false)




React.useEffect(()=>{



},[])




return(
<View style={[StorieStyle.StoryBase]}>


<TouchableOpacity onPress={()=>setShowDrawer(true)} style={{alignItems:'center'}}>
    <View style={{position:'relative'}}>
        <Icon name={'add-circle'} size={20} type={'material-icons'} containerStyle={{position:'absolute',zIndex:10,right:-2,bottom:0}} />
        <Avatar size={50}  rounded={true} source={{uri:Auth.Authuser.length > 0 ? Auth.Authuser[0]?.ProfileImage:'https://mymiix.com/public/assets/img/no-avatar.jpg'}} />
    </View>

   
</TouchableOpacity>




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
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/story',title:'create story'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Story</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/quoteform',title:'Add an inspirational quote!'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Add Quote</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Web',{url:'https://mymiix.com/create/blog'})} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Create Blog</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{
    navigation.navigate('UniteLive',{url:'https://mymiix.com/create/unite',title:'Unite'})
    setShowDrawer(false)

}} style={{padding:10,borderRadius:4,backgroundColor:'lightgrey'}}><Text>Unite</Text></TouchableOpacity>



</View>

</DrawerProfileDialog>



</View>)


} 

