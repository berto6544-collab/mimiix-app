import React from "react";
import { Dimensions, TouchableOpacity, View,TextInput,Button  } from "react-native";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { ListStyle } from "../Style/style";
import { Avatar} from "@rneui/themed";
import { AuthContext } from "../../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostcommentsAPi } from "../../../API/API";

export default TextArea = ({dataSouce,setDataSource,postId}) =>{

    const [comment,setComment] = React.useState('')
    const [errorMessage,setErrorMessage] = React.useState('')

    const Auth = React.useContext(AuthContext)



    const SendComment = () =>{

        PostcommentsAPi(postId,comment)
        .then(res=>{

            setDataSource(dataSouce.concat(res));
            setComment("")
        })
        
    }




    return(

        <SafeAreaView edges={['bottom']} style={ListStyle.TextAreaBase}>


        <View style={{width:Dimensions.get('screen').width,paddingVertical:10}}>
        
        
        </View>       

<View style={ListStyle.TextArea}>

        <TextInput
      placeholder='Comment'
      errorStyle={{ color: 'red' }}
      editable={true}
      onSubmitEditing={SendComment}
      style={{borderWidth:1,padding:10,borderRadius:5,width:Dimensions.get('screen').width /1.05}}
      errorMessage={errorMessage}
    
      enterKeyHint={'done'}
      onChangeText={(e)=>setComment(e)}
      value={comment}
   
    />

</View>
        </SafeAreaView>
    )

}