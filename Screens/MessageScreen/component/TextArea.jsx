import React from "react";
import { Dimensions, TouchableOpacity, View,TextInput,Button,KeyboardAvoidingView, Platform, ScrollView  } from "react-native";
import { ListStyle } from "../style/style";
import { Avatar} from "@rneui/themed";
import { AuthContext } from "../../../AuthContext/context";
import { SafeAreaView } from "react-native-safe-area-context";
import {  PostMessageAPi } from "../../../API/API";

export default TextArea = ({dataSource,setDataSource,Receiver,Sender,Profile}) =>{

    const [comment,setComment] = React.useState('')
    const [errorMessage,setErrorMessage] = React.useState('')

    const Auth = React.useContext(AuthContext)



    const Sendmessage = () =>{

        if(comment == "") return;
const Formdata = new FormData();

Formdata.append('body',comment)
Formdata.append('receiver',Receiver)




        PostMessageAPi(Sender,Formdata)
        .then(res=>{
            if(res?.Data.length == 0 || res.length == 0)return;
            dataSource.unshift(res.Data[0])
            setDataSource([...dataSource]);

            setComment("")
        })
        
    }


    function addElementAtStarting(array, target){
        return [target, ...array]
    }



    return(

        <SafeAreaView edges={['bottom']} style={ListStyle.TextAreaBase}>



        <View style={{width:Dimensions.get('screen').width,paddingVertical:10}}>
        
        
        </View>       

<View  style={ListStyle.TextArea}>

        <View
        style={{borderWidth:1,padding:8,display:'flex',backgroundColor:'lightgrey',borderColor:'lightgrey',flexDirection:'row',alignItems:'center',overflow:'hidden',gap:5,position:'relative',borderRadius:10,width:Dimensions.get('screen').width /1.05}}
        >
           <Avatar rounded={true}  source={{uri:Auth.Authuser.length >0?Auth.Authuser[0].ProfileImage:Profile}} /> 
            
            <TextInput
      placeholder='Send Message'
      errorStyle={{ color: 'red' }}
      editable={true}
      onSubmitEditing={Sendmessage}
      style={{width:Dimensions.get('screen').width /1.55}}
      errorMessage={errorMessage}
      enterKeyHint={'done'}
      onChangeText={(e)=>{setComment(e)}}
      value={comment}
   
    />

    <Button onPress={Sendmessage} color={comment == ""?'darkgrey':''} title={'Send'} ></Button>
    </View>

</View>


        </SafeAreaView>
    )

}