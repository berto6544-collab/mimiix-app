import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { Quotestyles } from "../../StyleComponent/Style";



export default Quote = ({Auth,navigation}) =>{

    if(Auth.Authuser.length > 0 && Auth.Authuser[0].UsersQuote.length >0){
    return(
    <View style={Quotestyles.QuoteBase}>
    <Text style={{fontWeight:'700',fontSize:16}}>{Auth.Authuser[0].UsersQuote[0].Quote} - {Auth.Authuser[0].UsersQuote[0].Name} - Posted By <Text onPress={()=>{

navigation.navigate('Profile',{username:Auth.Authuser[0].UsersQuote[0].username});

    }} style={{color:'#0086ff'}}>{Auth.Authuser[0].UsersQuote[0].username}</Text></Text>


    </View>)
    }
    else{
    return(null)
    }

}