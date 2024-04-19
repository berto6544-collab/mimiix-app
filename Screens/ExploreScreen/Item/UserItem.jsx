import React from "react";
import { View,TouchableOpacity,Text,StyleSheet, Dimensions } from "react-native";
import { Avatar } from "@rneui/themed";

export default UserItem = ({item,index,navigation}) =>{

    return(
        <TouchableOpacity key={item.username} onPress={()=>{
            
            navigation.navigate('Profile',{username:item?.username})

        }} style={[styles.userContainer,{backgroundColor:'white'}]}>
        <Avatar  size={60} rounded={true} source={{uri:item.profileImg}} />
        <View style={styles.TextContainer}>
        <Text style={styles.TextH1}>{item.name}</Text>
        

      
        </View>
    
        
    
    
        </TouchableOpacity>)
}


const styles = StyleSheet.create({

    userContainer:{
        width:Dimensions.get('screen').width,
        padding:10,
        marginBottom:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        zIndex:5,
        gap:5
    },

    TextContainer:{
        
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },

    TextH1:{
        fontSize:15,
        fontWeight:'700'
    }

})