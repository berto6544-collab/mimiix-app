import React from "react";
import {View,StyleSheet,Text, TouchableOpacity, Dimensions} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import UserMessageItem from "./component/UserMessageItem";
import { Avatar, Icon } from "@rneui/themed";
import { MessageFromUserAPI } from "../../API/API";
import { AuthContext } from "../../AuthContext/context";
import TextArea from "./component/TextArea";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";
import * as Sharing from 'expo-sharing';
export default MessageScreen = ({route,navigation}) => {

const {userid,userName,MyUsername,isOnline,name,Profile,MyUserId} = route.params;

const [dataSource,setDataSource] = React.useState([])
const [start,setStart] = React.useState(0)
const [show,setShow] = React.useState(false)
const Auth = React.useContext(AuthContext)


const GrabUserList = () =>{
    MessageFromUserAPI(start,userid)
    .then(res=>{

        if(res.length == 0)return;
        //console.log(res)
        setDataSource(res)
        setStart(start+1)
    })
}




const ScrollGrabUserList = () =>{
    MessageFromUserAPI(start,userid)
    .then(res=>{

        if(res.length == 0)return;
        //console.log(res)
        setDataSource(dataSource.concat(res))
        setStart(start+1)
    })
}


React.useEffect(()=>{
    GrabUserList();


    navigation.setOptions({
        
        
        title:'Messages',
        headerRight: () => (
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
            <TouchableOpacity onPress={() =>{
                setShow(true)
            }} >
            <Icon name={'bars'} type={'ant-design'} />
            </TouchableOpacity>
            </View>
          ),
       
      });

},[])



return(
    <View style={{flex:1}}>
<View style={{flex:1}}>
{dataSource && dataSource.length > 0?<FlashList
data={dataSource}
estimatedItemSize={100}
inverted={true}
renderItem={({item,index})=><UserMessageItem item={item} isUser={item.Sender == MyUsername?true:false} navigation={navigation} index={index} />}
keyExtractor={(item)=>item?.id}
onEndReached={ScrollGrabUserList} 
onEndReachedThreshold={0}
drawDistance={Dimensions.get('screen').height / 2}

/>:null}
</View>


<TextArea Profile={Profile} dataSource={dataSource} Sender={MyUserId} Receiver={userid} setDataSource={setDataSource} />



<DrawerProfileDialog 
onshow={show} 
setClose={()=>{setShow(false)}}
title={''}
username={userName}
profileImage={Profile}
userStats={''}
>

<View style={{flex:1,display:'flex',overflow:'scroll',flexDirection:'column',gap:10,marginTop:20,position:'relative'}}>

<Buttons onPressed={()=>{
    navigation.navigate('Profile',{username:userName})
    setShow(false)
    }} icon1={{name:'',type:'antdesign'}} title={'Profile'} />








    </View>


</DrawerProfileDialog>
    </View>
)



}


export const Buttons = ({onPressed,title,icon1}) =>{




    return(
<TouchableOpacity  onPress={()=>{
onPressed();
}} style={{display:'flex',justifyContent:'space-between',padding:10,flexDirection:'row',width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
<Icon size={30} name={icon1?.name} type={icon1?.type} />
<Text style={{fontWeight:'400',fontSize:20}}>{title}</Text>
</View>



</TouchableOpacity>
    )
}