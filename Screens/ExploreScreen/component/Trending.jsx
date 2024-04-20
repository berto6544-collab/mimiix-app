import React from "react";
import { Text,View,TouchableOpacity,Button,Dimensions } from "react-native";

import { Icon,Avatar} from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import { GetTrendingPostsAPI} from "../../../API/API";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import FeedItem from "../../../component/feedItems/feedItem";
import { AuthContext } from "../../../AuthContext/context";

export default TrendingComp = ({navigation}) =>{


    const [dataSource,setDataSource] = React.useState([]);
    const [index,setIndex] = React.useState(0);
    const Auth = React.useContext(AuthContext);


    React.useEffect(()=>{

        fetchData("")

    },[])

const fetchData = (q) =>{

    GetTrendingPostsAPI(0,q)
    .then(response=>{
        if(response.length == 0) return;
        setDataSource(response)
        console.log(response)

    })

}


    return(
        <View style={{flex:1}}>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:5,paddingHorizontal:10,backgroundColor:'white',width:Dimensions.get('screen').width,paddingBottom:10}}>
<TouchableOpacity onPress={()=>{
    setIndex(0);
    fetchData("");

}}><Text style={{color: index == 0?'#007bff':'black',fontSize:15}}>All</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{
    setIndex(1);
    fetchData("gaming");
    }}><Text style={{color: index == 1?'#007bff':'black',fontSize:15}}>Gaming</Text></TouchableOpacity>

<TouchableOpacity onPress={()=>{
    setIndex(2);
    fetchData("music");
    }}><Text style={{color: index == 2?'#007bff':'black',fontSize:15}}>Music</Text></TouchableOpacity>

<TouchableOpacity onPress={()=>{
    setIndex(3);
    fetchData("art");
    }}><Text style={{color: index == 3?'#007bff':'black',fontSize:15}}>Art</Text></TouchableOpacity>

<TouchableOpacity onPress={()=>{
    setIndex(4);
    fetchData("entertainment");
    }}><Text style={{color: index == 4?'#007bff':'black',fontSize:15}}>Entertainment</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{
    setIndex(5);
    fetchData("tutorial");
    }}><Text style={{color: index == 5?'#007bff':'black',fontSize:15}}>Tutorial</Text>
    </TouchableOpacity>

</View>


<OptimizedFlatList 
 data={dataSource}
 renderItem={({item,index}) => {return(<FeedItem dataSource={dataSource} setDataSource={setDataSource} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)}}
estimatedItemSize={100}

/>



        </View>
    )

}