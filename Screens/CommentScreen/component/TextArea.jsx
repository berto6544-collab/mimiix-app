import React from "react";
import { Dimensions, TouchableOpacity, View,Text,TextInput,Keyboard,Button  } from "react-native";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { ListStyle } from "../Style/style";
import { Avatar} from "@rneui/themed";
import { AuthContext } from "../../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostcommentsAPi } from "../../../API/API";

export default TextArea = ({dataSouce,setDataSource,postId}) =>{

    const [comment,setComment] = React.useState('')
    const [errorMessage,setErrorMessage] = React.useState('')
    const [isdisabled,setIsdisabled] = React.useState(false)
    const [keyBoard,setkeyboard] = React.useState(0)
    const Auth = React.useContext(AuthContext)



    const SendComment = () =>{
        
        if(comment == "")return;

        PostcommentsAPi(postId,comment)
        .then(res=>{

            setDataSource(dataSouce.concat(res));
            setComment("")
            setkeyboard(0)
            Keyboard.dismiss()
        })
        
    }




    return(

        <SafeAreaView edges={['bottom']} style={[ListStyle.TextAreaBase,{flex:keyBoard}]}>


        <View style={{width:Dimensions.get('screen').width,paddingVertical:10}}>
        
        
        </View>       

<View style={ListStyle.TextArea}>


<View style={{borderWidth:1,padding:8,display:'flex',backgroundColor:'lightgrey',borderColor:'lightgrey',flexDirection:'row',alignItems:'center',overflow:'hidden',gap:5,position:'relative',borderRadius:10,width:Dimensions.get('screen').width /1.05}}>
<Avatar 
rounded={true}  
source={{uri:Auth.Authuser.length >0?Auth.Authuser[0].ProfileImage:Profile}} 
/> 
            
        <TextInput
      placeholder='Comment'
      errorStyle={{ color: 'red' }}
      editable={true}
      onSubmitEditing={SendComment}
      style={{width:Dimensions.get('screen').width /1.55}}
      errorMessage={errorMessage}
      onFocus={()=>{
        setkeyboard(1.2)
      }}
      onBlur={()=>{
        setkeyboard(0)
        Keyboard.dismiss()
      }}
      enterKeyHint={'done'}
      onChangeText={(e)=>{
       
        setComment(e)
    
    }}
      value={comment}
   
    />

<Button  
color={comment == ""?"darkgray":""} 
onPress={SendComment} 
title={'Send'}  
/>

</View>


</View>
{errorMessage == ""?null:<Text style={{color:'red'}}>{errorMessage}</Text>}

        </SafeAreaView>
    )

}