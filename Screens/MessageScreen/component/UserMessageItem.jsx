import React from "react";
import { View,TouchableOpacity,Text,StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";


export default UserMessageItem = ({item,index,navigation,isUser}) =>{



    return(
        <View  style={[styles?.userContainer,{justifyContent:isUser?'flex-end':'flex-start'}]}>
        {isUser?null:<Avatar size={40} rounded={true} source={{uri:item?.profileimg}} />}
        <View style={[styles?.userBaseContainer,{backgroundColor:isUser?'cornflowerblue':'lightgrey'}]}>
        
        <View style={styles?.TextContainer}>
        {isUser?null:<Text style={styles?.TextH1}>{item?.Sender}</Text>}
        <Text>{item?.body}</Text>
    
        </View>
        </View>
    
    
        </View>)
}


const styles = StyleSheet.create({

    userContainer:{
        width:'100%',
        padding:10,
        marginBottom:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        gap:10
    },

    userBaseContainer:{
        padding:10,
        marginBottom:5,
        maxWidth:'80%',
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        borderRadius:10,
        flexWrap:'wrap',
        gap:5,
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