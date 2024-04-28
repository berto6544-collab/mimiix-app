import React, { useRef, useState } from 'react';
import { Image,AsyncStorage, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native';
import { Avatar,Icon } from '@rneui/themed';

import { FlashList } from '@shopify/flash-list';
import BigList from 'react-native-big-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';


export default UniteViewer = ({navigation}) =>{

    const [liveIndex,setLiveIndex] = useState(0);
    const [AllLive, setAllLive] = useState([]);


React.useEffect(()=>{

    fetch('https://mymiix.com/public/api/allLive?start='+liveIndex)
    .then((response) => response.json())
    .then((resp)=> {

      if(resp.length == 0)return;
      setAllLive(resp)
      setLiveIndex(liveIndex+1)

    })


},[])


    const LoadMore = () =>{

    fetch('https://mymiix.com/public/api/allLive?start='+liveIndex)
    .then((response) => response.json())
    .then((resp)=> {

      if(resp.length == 0)return;
      
      setAllLive(AllLive.concat(resp))
      
      setLiveIndex(liveIndex+1)

    })
    }



const renderItem = ({item,index}) =>{

    return(<TouchableOpacity key={index} activeOpacity={1} style={{position:'relative',borderRadius:10,paddingBottom:10,width:'100%',flexDirection:'column',overflow:'hidden',alignItems:'center',backgroundColor:'white',}} onPress={() =>{
     navigation.navigate('UniteLive',{url:'https://mymiix.com/@'+item.UserName+'/dropin',viewer:true})

    }} >
    <View style={{position:'relative',width:'100%',flexDirection:'column',gap:10,alignItems:'center',backgroundColor:'white',}}>
      <FastImage size={50}  rounded={true} style={{width:'100%',height:150}} resizeMode={'cover'} source={{uri:item.ProfileImg}} />
      <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Text style={{fontSize:18,fontWeight:'800'}}>{item.UserName}</Text>
       
        <Text style={{fontSize:18}}>Unite</Text>
        
        </View>
      </View>
      </TouchableOpacity> )

}



    return(
        <SafeAreaView edges={['bottom']} style={{flex:1,padding:10}} >
            <BigList
            data={AllLive}
            renderItem={renderItem}
            numColumns={2}
            
            
            />


        </SafeAreaView>
    )

}



