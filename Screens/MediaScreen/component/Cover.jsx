import React from "react";
import {View,Text, Dimensions,Button,TouchableOpacity} from 'react-native';
import { Icon, Image } from "@rneui/themed";


export default Cover = ({Auth}) =>{


    return(<View style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',zIndex:2,gap:5,position:'absolute',top:0}}>

    <Image  source={{uri:Auth.mediaDataSource[Auth.index].cover}} style={{width:400,height:400}} />
    <Text style={{fontSize:30,fontWeight:'600',color:'white',textAlign:'center'}}>{Auth.mediaDataSource[Auth.index].artist.song}</Text>
    
    </View>)
}
