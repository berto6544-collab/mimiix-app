import React from "react";
import {View,StyleSheet,Text} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import UserMessageItem from "./component/UserMessageItem";
import { Avatar } from "@rneui/themed";
import { MessageFromUserAPI } from "../../API/API";
import { AuthContext } from "../../AuthContext/context";


export default MessageScreen = ({route,navigation}) => {

const {userid,userName,MyUsername,isOnline,name,Profile} = route.params;

const [dataSource,setDataSource] = React.useState([])
const [start,setStart] = React.useState(0)
const Auth = React.useContext(AuthContext)


const GrabUserList = () =>{
    MessageFromUserAPI(start,userid)
    .then(res=>{

        if(res.length == 0)return;
        console.log(JSON.stringify(res))
        setDataSource(res)
        setStart(start+1)
    })
}

React.useEffect(()=>{
    GrabUserList();


    navigation.setOptions({
        
            
        title:'@'+userName,
       
      });

},[])


return(
    <View style={{flex:1}}>

<FlashList
data={dataSource}
estimatedItemSize={100}
renderItem={({item,index})=><UserMessageItem item={item} isUser={item.Sender == MyUsername?true:false} navigation={navigation} index={index} />}
//onEndReached={ScrollGrabUserList} 
//onEndReachedThreshold={0.9}

/>

<SafeAreaView style={{backgroundColor:'white'}}></SafeAreaView>

    </View>
)



}