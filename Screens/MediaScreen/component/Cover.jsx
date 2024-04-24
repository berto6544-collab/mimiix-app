import React from "react";
import {View,Text, Dimensions,Button,TouchableOpacity} from 'react-native';
import { Icon, Image } from "@rneui/themed";
import FastImage from "react-native-fast-image";


export default Cover = ({Auth}) =>{


    return(<View style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',zIndex:2,gap:5,position:'absolute',top:0}}>

    <FastImage  source={{uri:Auth.mediaDataSource[Auth.index].cover,priority:'high'}} style={{width:'100%',height:300}} />
    <Text style={{fontSize:25,fontWeight:'600',color:'white',textAlign:'center'}}>{Auth.mediaDataSource[Auth.index].artist.song}</Text>
    
    </View>)
}
