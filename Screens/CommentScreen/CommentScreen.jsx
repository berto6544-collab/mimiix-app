import React from "react";
import { Dimensions, TouchableOpacity, View,Text,Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListStyle } from "./Style/style";
import ListArea from "./component/ListArea";
import { GetcommentsAPi,GetPinnedcommentsAPi } from "../../API/API";
import PinnedList from "./component/PinnedList";
import TextArea from "./component/TextArea";


export default function Comment({route,navigation}){

    const {postId} = route.params;

const [dataSource,setDataSource] = React.useState([]);
const [dataSourcePinned,setDataSourcePinned] = React.useState([]);
const [start,setStart] = React.useState(0);




React.useEffect(()=>{

    navigation.setOptions({
        headerLeft:()=>(<View></View>),
        title:"Comments",
        headerRight: () => (
          <Button onPress={() => {navigation.goBack();}} title="Done" />
        ),
      });

    fetchData();


},[])


const fetchData = () =>{

GetPinnedcommentsAPi(postId)
.then(res=>{
    if(res.length == 0)return;
   setDataSourcePinned(res)
    
})



    GetcommentsAPi(postId,start)
    .then(res=>{
    
        if(res.length == 0)return;
        setDataSource(res);
        setStart(start+1)
    
    })

}





const handleItem = () =>{

    GetcommentsAPi(postId,start)
    .then(res=>{
    
        if(res.length == 0)return;
        setDataSource(dataSource.concat(res));
        setStart(start+1)
    
    })

}


return(<View style={ListStyle.container}>

{dataSourcePinned.length == 0?null:<PinnedList setDataSource={setDataSourcePinned} dataSource={dataSourcePinned} navigation={navigation} />}
<ListArea handleItem={handleItem} setDataSource={setDataSource} dataSourcePinned={dataSourcePinned} navigation={navigation} dataSource={dataSource} />
<TextArea postId={postId} dataSouce={dataSource} setDataSource={setDataSource} />

</View>)

}