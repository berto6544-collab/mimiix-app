import { Image,Text,Icon } from '@rneui/themed';
import React from 'react';
import { Dimensions, TouchableOpacity,View } from 'react-native';
import { PreviewURLstyles } from '../../StyleComponent/Style';



export const UrlPreview = ({data}) =>{


       
    

if(data.DataURL.length == 0)return(
<View style={PreviewURLstyles.container} >
<Icon type={'evil-icons'} name={'external-link'} size={50} style={{position:'absolute',zIndex:4,left:'50%',top:'40%'}}></Icon>
<Image source={{uri:''}} style={PreviewURLstyles.PreviewImage} containerStyle={PreviewURLstyles.PreviewImage} />


</View>)


else

return(<View  style={PreviewURLstyles.container} >


<Image source={{uri:data.DataURL[0].img}} width={Dimensions.get('screen').width} height={Dimensions.get('screen').height - 470} containerStyle={PreviewURLstyles.PreviewImage} />
<Icon type={'feather'} name={'external-link'} size={50} color={'white'} containerStyle={{position:'absolute',zIndex:8,left:'45%',top:'45%'}}></Icon>


</View>)

}