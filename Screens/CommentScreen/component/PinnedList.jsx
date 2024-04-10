import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {FlashList,} from "@shopify/flash-list";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { ListStyle } from "../Style/style";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "./Items";



export default PinnedList = ({dataSource,navigation}) =>{




    return(
    <View >
   {dataSource.map(({item,index})=>{
    return(<Items item={item} index={index} navigation={navigation} isPinned={true} />)
   })}
    
    </View>)
    
    }