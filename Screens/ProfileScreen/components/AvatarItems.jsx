import React, { Children } from "react";
import { Avatar,Icon } from "@rneui/themed";
import { Dimensions,Image, Text, View } from "react-native";


export default AvatarItem = ({data,username,index,profileImage,userStats}) =>{



return(
<View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<View style={{width:'100%',position:'relative',marginBottom:50}}>    
    <Image   style={{width:Dimensions.get('screen').width, height: 100}} source={{uri:profileImage}}  />
    


    <Image style={{width:80,height:80,borderWidth:2,borderColor:'white',borderRadius:100,objectFit:'cover',position:'absolute',left:Dimensions.get('screen').width / 2 -40,bottom:-35}} size={80}rounded={true}  source={{uri:profileImage}} />
    </View>

    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontSize:20,fontWeight:'400'}}>@{username} </Text>
        {data.Verified == "1"?<Icon name={'verified'} color={'blue'} size={20} type={'materialicons'} />:null}
        
        
        </View>
    <Text style={{fontSize:18,fontWeight:'700'}}>{data?.UsersStat}</Text>
    
    
</View>

)



}
