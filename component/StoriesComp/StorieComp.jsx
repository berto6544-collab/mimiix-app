import React from "react";
import { StorieStyle } from "../../StyleComponent/Style";
import { View,Text,TouchableOpacity, Dimensions } from "react-native";
import { StorieDataAPI } from "../../API/API";
import { Avatar } from "@rneui/themed";
import { Icon } from "@rneui/base";



export default Story = ({query,Auth}) =>{


const [dataSource,setDataSource] = React.useState([]);
const [start,setStart] = React.useState(0);





React.useEffect(()=>{
StorieDataAPI(start,query)
.then(response=>{
setDataSource(response)


})



},[])




return(
<View style={StorieStyle.StoryBase}>


<TouchableOpacity style={{alignItems:'center'}}>
    <View style={{position:'relative'}}>
        <Icon name={'add-circle'} size={20} type={'material-icons'} containerStyle={{position:'absolute',zIndex:10,right:-2,bottom:0}} />
        <Avatar size={50}  rounded={true} source={{uri:Auth.Authuser.length > 0 ? Auth.Authuser[0]?.ProfileImage:'https://mymiix.com/public/assets/img/no-avatar.jpg'}} />
    </View>

    <Text>Your story</Text>
</TouchableOpacity>



</View>)


} 

