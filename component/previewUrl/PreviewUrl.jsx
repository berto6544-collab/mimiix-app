import { Image,Text } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity,View } from 'react-native';
import { PreviewURLstyles } from '../../StyleComponent/Style';



export const UrlPreview = ({data}) =>{


       
    

if(data.DataURL.length == 0)return(
<View style={PreviewURLstyles.container}>
<Image source={{uri:''}} style={PreviewURLstyles.PreviewImage} />
<Text h4={true}>{data.PostTitle}</Text>
<Text>{data.DataURL[0].description}</Text>

</View>)


else

return(<View  style={PreviewURLstyles.container} >
<Image source={{uri:data.DataURL[0].img}} style={PreviewURLstyles.PreviewImage} />
<Text h4={true}>{data.PostTitle}</Text>
<Text>{data.DataURL[0].description}</Text>
</View>)

}