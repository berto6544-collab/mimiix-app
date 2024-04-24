import { Icon } from "@rneui/themed";
import React from "react";
import { View,TouchableOpacity,Text,StyleSheet } from "react-native";


export default ItemList = ({item,ind,indexx,Auth,VideoRef,setProgress})=>{

    return(<TouchableOpacity  onPress={()=>{

//if(ind != 0 && Auth.index != 0){

console.log(ind)
if(VideoRef.current){
Auth.setIndex(ind)
VideoRef.current.setPositionAsync(0)
setProgress(0);
VideoRef.current.playAsync();
//}
        }

    }} activeOpacity={1} style={styles.baseContainer} >

{ind == Auth.index ?<Icon name={'pausecircleo'} size={40} type={'ant-design'} />:<Icon name={'playcircleo'} size={40} type={'ant-design'} />}
<View style={styles.TextContainer}>
<Text style={[styles.TextH1,{width:'70%'}]}>{item?.artist?.song}</Text>

</View>

<Text style={{textAlign:'right',position:'absolute',right:5}}>{item?.artist?.duration}</Text>


    </TouchableOpacity>)


}


const styles = StyleSheet.create({

    baseContainer:{
        width:'100%',
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
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