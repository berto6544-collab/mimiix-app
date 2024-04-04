import React from "react";
import { Text,Card,Image,Avatar } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, View } from "react-native";
import {FlashList} from '@shopify/flash-list'
import FeedItem from "../../component/feedItems/feedItem";
import { FlatList } from "react-native";
import { FeedItemstyles } from "../../StyleComponent/Style";
import BigList from 'react-native-big-list'

export default function Feed(){

    const [dataSource,setDataSource] = React.useState([]);
    const [PostData,setPostData] = React.useState(null);
    const [start,setStart] = React.useState(0)



React.useEffect(()=>{

    fetchData();



},[])

const fetchData = () => {

FeedsData().then(response=>{
if(response.length == 0)
return;
setDataSource(response)


})

}




    return(
    <View>

 <View style={FeedItemstyles.TopNav}>

 </View>
    
<BigList
data={dataSource}
renderItem={({ item,index }) => <FeedItem key={index} index={index} data={item} />}
style={{width:Dimensions.get('screen').width,flex:1,flexDirection:'column'}}

itemHeight={Dimensions.get('screen').height -350}



/>

    </View>)
}
