import React from "react";
import {View,Text, Dimensions,Button,TouchableOpacity} from 'react-native';
import { Icon, Image } from "@rneui/themed";
import FastImage from "react-native-fast-image";


export default Cover = ({Auth,navigation}) =>{


    return(<View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',zIndex:2,flex:0.7,gap:5}}>

    <FastImage  source={{uri:Auth.mediaDataSource[Auth.index].cover,priority:'high'}} style={{width:'100%',height:300}} />
    <Text style={{fontSize:25,fontWeight:'600',color:'black',textAlign:'center'}}>{Auth.mediaDataSource[Auth.index].artist.song}</Text>
    {Auth.mediaDataSource[Auth.index].artist.tag.split(',').length > 0?<View style={{display:'flex',flexDirection:'row',justifyContent:'center',paddingHorizontal:10,alignItems:'center',width:'100%',gap:5}}>
    {Auth.mediaDataSource[Auth.index].artist.tag.split(',').map((item,index)=>{
        return(<TouchableOpacity onPress={()=>{
            navigation.navigate('Profile',{username:item.replace('@','')})
        }}><Text style={{color:'blue',fontWeight:'600',fontSize:18}}>{item}</Text></TouchableOpacity>)
    })}

    </View>:null}


    </View>)
}
