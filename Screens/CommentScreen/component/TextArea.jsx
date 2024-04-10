import React from "react";
import { Dimensions, TouchableOpacity, View,TextInput,Button  } from "react-native";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { ListStyle } from "../Style/style";
import { Avatar} from "@rneui/themed";
import { AuthContext } from "../../../AuthContext/context";


export default TextArea = ({dataSouce,setDataSource}) =>{

    const [comment,setComment] = React.useState('')
    const [errorMessage,setErrorMessage] = React.useState('')

    const Auth = React.useContext(AuthContext)

    return(

        <View style={ListStyle.TextAreaBase}>


        <View style={{width:Dimensions.get('screen').width,paddingVertical:10}}>
        
        
        </View>       

<View style={ListStyle.TextArea}>

        <TextInput
      placeholder='Comment'
      errorStyle={{ color: 'red' }}
      editable={true}
      style={{borderWidth:1,padding:10,borderRadius:5,width:Dimensions.get('screen').width /1.05}}
      errorMessage={errorMessage}
      multiline={true}
      numberOfLines={4}
      enterKeyHint={'done'}
      onChangeText={(e)=>setComment(e)}
      value={comment}
   
    />

</View>
        </View>
    )

}