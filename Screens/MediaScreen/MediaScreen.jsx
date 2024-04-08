import React from "react";
import {View,Text, Dimensions,Button} from 'react-native';
import Video from "react-native-video";
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

return(<View style={{flex:1,backgroundColor:'black',width:Dimensions.get('screen').width}}>
    
    {/*<Video  style={{width:Dimensions.get('screen').width,flex:1}} controls={true} source={{uri:url}}  />*/}
    
    
    </View>)


}


else if(Auth.mediaType == "audio"){

    return(<View></View>)
    
}

else{
    return(<View></View>)
}


}