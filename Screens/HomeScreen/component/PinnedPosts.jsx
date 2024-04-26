import React,{useRef} from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { GetPinnedPost } from "../../../API/API";
import { Dimensions, TouchableOpacity, View,FlatList } from "react-native";
import FeedItem from "../../../component/feedItems/feedItemPinned";
import { FeedItemstyles } from "../../../StyleComponent/Style";

import { AuthContext } from "../../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";


export default PinnedPosts = ({navigation,Auth}) =>{

const [dataSource,setDataSource] = React.useState([])
    React.useEffect(()=>{
        GetPinnedPost()
        .then(response=>{
            if(response.length == 0)return;
            setDataSource(response)
        })


    },[])


const content = dataSource.map((item,index) => {

return(<FeedItem dataSource={dataSource} setDataSource={setDataSource} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)

})

if(dataSource.length == 0){
return(<></>)
}

else{
    return(content)
}




}