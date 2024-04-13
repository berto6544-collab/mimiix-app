import React from "react";
import { View,TouchableOpacity,Text,StyleSheet, Dimensions } from "react-native";
import { Avatar } from "@rneui/themed";

export default UserItem = ({item,index,navigation}) =>{

    return(
        <TouchableOpacity onPress={()=>{
            
            navigation.navigate('Messages',{userName:item?.UserName,MyUserId:item?.MyUserId,MyUsername:item?.MyUserName,userid:item?.PostId,Profile:item?.ProfileImg,isOnline:item?.isOnline,name:item?.PostedBy})

        }} style={styles?.userContainer}>
        <Avatar  size={60} rounded={true} source={{uri:item?.ProfileImg}} />
        <View style={styles?.TextContainer}>
        <Text style={styles?.TextH1}>{item?.PostedBy}</Text>
        <Text style={{color:'grey'}}>{item?.Body}</Text>

      
        </View>
    
        
    
    
        </TouchableOpacity>)
}


const styles = StyleSheet.create({

    userContainer:{
        width:Dimensions.get('screen').width / 1.2,
        padding:10,
        marginBottom:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        zIndex:5,
        gap:5
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