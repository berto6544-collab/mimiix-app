import React from "react";
import { Text,View,TouchableOpacity,Button,Dimensions, TextInput,Keyboard } from "react-native";

import { Icon,Avatar} from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";
import {GetUsersAPI} from "../../../API/API";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { AuthContext } from "../../../AuthContext/context";
import UserItem from "../Item/UserItem";


export default TrendingComp = ({navigation}) =>{

    const [dataSource,setDataSource] = React.useState([]);
    const [search,setSearch] = React.useState("");
    const [start,setStart] = React.useState(0);
    const Auth = React.useContext(AuthContext);


    React.useEffect(()=>{

        fetchData()

    },[])

const fetchData = () =>{


    setStart(0)
    GetUsersAPI(0,search)
    .then(response=>{
        if(response.length == 0){
            setDataSource(response)

        }else{
        setDataSource(response)
        setStart(start+1)
       
        }

    })

}


const fetchDataScroll = () =>{

    GetUsersAPI(start,search)
    .then(response=>{
        if(response.length == 0) return;
        setDataSource(dataSource.concat(response))
        setStart(start+1)
     

    })

}



return(
<View style={{flex:1,width:'100%'}}>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:5,paddingHorizontal:10,backgroundColor:'white',width:Dimensions.get('screen').width,paddingBottom:10}}>
<View style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',borderWidth:1,borderRadius:5,padding:5,borderColor:'darkgrey',position:'relative'}}>
<TextInput onEndEditing={()=>{
    fetchData();
    Keyboard.dismiss();
}} style={{width:'100%',padding:10,paddingRight:70}} placeholder={'Search'} onChangeText={(text)=>{
   if(text == ""){
    fetchData();
    Keyboard.dismiss();
   }
   setSearch(text)
   
    
    }}  value={search} />

<TouchableOpacity   onPress={()=>{
fetchData();
Keyboard.dismiss();
}} style={{position:'absolute',right:10}}><Text style={{fontSize:18,fontWeight:'500',color:search == ""?"gray":"#007bff"}} >Search</Text></TouchableOpacity>
</View>
</View>


<OptimizedFlatList 
 data={dataSource}
 style={{flex:1,width:'100%',gap:10,paddingTop:10}}
 renderItem={({item,index}) => <UserItem item={item} index={index} navigation={navigation} />}
 onEndReached={fetchDataScroll} 
 onEndReachedThreshold={0.9}
 numColumns={1}
 keyExtractor={(item)=>item.username}

/>



        </View>
)



}