import React,{useRef} from "react";
import { Text,Card,Image,Avatar, Icon, } from "@rneui/themed";
import { FeedsData } from "../../API/API";
import { Dimensions, TouchableOpacity, View,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../AuthContext/context";


export default DeactivationScreen = ({}) =>{
const Auth = React.useContext(AuthContext)

return(<SafeAreaView style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >

    <View style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<Text style={{fontSize:30,textAlign:'center'}}>Your Account Has been Deactivated</Text>

<TouchableOpacity onPress={()=>{


fetch('https://mymiix.com/public/api/accountactivation?type=activation')
.then(response=>response.json())
.then(response =>{
    if(response.length == 0)return;
Auth.setPostDataSource([])
Auth.setStart(0)
Auth.setDeactivate(false)
Auth.Authuser[0].IsActive == "0";
Auth.setAuthUser([...Auth.Authuser])
console.log(Auth.Authuser)

})

}} style={{backgroundColor:'blue',padding:10,borderRadius:5,marginTop:10}}><Text style={{color:'white'}}>Activate Account</Text></TouchableOpacity>

    </View>


</SafeAreaView>)

}