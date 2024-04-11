import React from "react";
import { Dimensions, TouchableOpacity,View} from "react-native";

import Items from "./Items";



export default PinnedList = ({dataSource,setDataSource,navigation}) =>{




    return(
    <View  >
   {dataSource.map((item,index)=>{
    return(<Items item={item} index={index} dataSource={dataSource} setDataSource={setDataSource} navigation={navigation} isPinned={true} />)
   })}
    
    </View>)
    
    }