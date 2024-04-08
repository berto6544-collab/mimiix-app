import React from "react";
import {View,Text, Dimensions,Button} from 'react-native';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { AuthContext } from "../../AuthContext/context";

export default MediaScreen  = ({route,navigation}) =>{

    const {title,type,url} = route;

const Auth = React.useContext(AuthContext)


React.useEffect(()=>{

    navigation.setOptions({
        headerLeft:()=>(<View></View>),
        headerTitle:()=>(<View><Text style={{fontSize:18,fontWeight:'700'}}>{title}</Text></View>),
        headerRight: () => (
          <Button onPress={() => {
            Auth.setMediaType(null)
            Auth.setMediaDataSource([])
            Auth.setIndex(0)    
            navigation.goBack();
        
        }} title="Done" />
        ),
      });


},[])


if(Auth.mediaType == "video"){

return(
    
    <VideoPlayer    
    
     videoProps={{
        shouldPlay: true,
        style:{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height},
        resizeMode: ResizeMode.COVER,
        slider:{visible:true},
        defaultControlsVisible:true,
        source: {
            uri: ""+url,
        },
      }}
    
    
      />)


}


else if(Auth.mediaType == "audio"){

    return(<View></View>)
    
}

else{
    return(<View></View>)
}


}