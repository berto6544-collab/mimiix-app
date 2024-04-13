import React from "react";
import {View,StyleSheet,Text} from 'react-native'
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import UserItem from "./component/UserItem";
import { Avatar } from "@rneui/themed";
import { MessageUsersAPI } from "../../API/API";

export default UserMessageScreen = ({route,navigation}) => {

const [dataSource,setDataSource] = React.useState([])
const [start,setStart] = React.useState(0)

const GrabUserList = () =>{
    MessageUsersAPI(start)
    .then(res=>{

        if(res.length == 0)return;
        setDataSource(res)
        setStart(start+1)
      
     
    })
}

React.useEffect(()=>{
    GrabUserList();


    navigation.setOptions({
        
            
        title:'Messages',
       
      });

},[])


const ScrollGrabUserList = () =>{
    MessageUsersAPI(start)
    .then(res=>{

        if(res.length == 0)
        setDataSource(dataSource.concat(res))
        setStart(start+1)
    })
}

return(<View style={styles.baseContainer}>
<FlashList
data={dataSource}
estimatedItemSize={100}
//style={styles.baseContainer}
renderItem={({item,index})=><UserItem item={item}  navigation={navigation} index={index} />}
keyExtractor={(item)=>item?.PostId}
onEndReached={ScrollGrabUserList} 
onEndReachedThreshold={0.8}

/>


</View>)




}


const styles = StyleSheet.create({

    baseContainer:{
        flex:1
    },
    userContainer:{
        width:'100%',
        padding:10,
        marginBottom:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },

    TextContainer:{
        
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },

    TextH1:{
        fontSize:15,
        fontWeight:'700'
    }


})