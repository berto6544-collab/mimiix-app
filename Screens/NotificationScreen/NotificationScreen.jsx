import React from "react";
import { Text,View,TouchableOpacity,Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedItemstyles } from "../../StyleComponent/Style";
import { Icon,Avatar} from "@rneui/themed";
import { AuthContext } from "../../AuthContext/context";
import { FlashList } from "@shopify/flash-list";
import ItemNotificationComp from "./component/ItemNotificationComp";
import { GetNotificationAPI } from "../../API/API";
import BigList from "react-native-big-list";

export default function Notify({route,navigation}){

const Auth = React.useContext(AuthContext)
const [dataSource,setDataSource] = React.useState([])
const [start,setStart] = React.useState(0)


React.useEffect(()=>{

    
    navigation.setOptions({
        headerLeft:()=>(<View></View>),
        headerRight: () => (
          <Button onPress={() => {navigation.goBack();}} title="Done" />
        ),
      });

      fetchData();


},[])


const fetchData = () =>{

 GetNotificationAPI(start)
 .then(res=>{
  
  if(res.length == 0) return;
  setDataSource(res)
  setStart(start+1)
  
  
 })


}


const handleLoadMore = () =>{
  GetNotificationAPI(start)
 .then(res=>{
  
  if(res.length == 0) return;
  setDataSource(dataSource.concat(res))
  setStart(start+1)
  
  
 })
}


return(<View style={{flex:1,paddingBottom:10}}>




<BigList
data={dataSource}
renderItem={({item,index})=>{return(<ItemNotificationComp post={item} navigation={navigation} index={index} />)}}
estimatedItemSize={100}
itemHeight={80}
onEndReached={handleLoadMore} 
onEndReachedThreshold={0.8}

/>









</View>)

}