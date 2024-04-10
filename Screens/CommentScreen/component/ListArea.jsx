import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {FlashList,} from "@shopify/flash-list";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { ListStyle } from "../Style/style";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "./Items";




export default ListArea = ({handleItem,dataSource,navigation}) =>{


return(
<SafeAreaView style={ListStyle.container}>

<FlashList
data={dataSource}
renderItem={({item,index})=><Items navigation={navigation} item={item} index={index} />}
estimatedItemSize={100}

/>

</SafeAreaView>)

}