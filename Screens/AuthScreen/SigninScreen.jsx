import React from "react";
import { Text,View,TouchableOpacity,TextInput,AsyncStorage } from "react-native";
import { Image } from "@rneui/themed";
import { FeedsData, SigninAPI } from "../../API/API";
import { AuthContext } from "../../AuthContext/context";



export default function SigninScreen({navigation}){

 
  


  const [userEmail,setUserEmail] = React.useState('');
  const [userPassword,setUserPassword] = React.useState('')
  const [status,setStatus] = React.useState('')
  const Auth = React.useContext(AuthContext);
  




 login = () => {
   
 
  
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(userEmail==""){
    //alert("Please enter Email address");
   setStatus('Please enter Email address')
  }
  
  else if(reg.test(userEmail) === false)
  {
  //alert("Email is Not Correct");
  setStatus('Email is Not Correct')
    }

  else if(userPassword==""){
  setStatus('Please enter password')
  }


 
  
else{
    SigninAPI(userEmail,userPassword)
    .then(responseJson=>{
     if(responseJson?.resp == "ok"){
       // redirect to profile page
       


       Auth.setToken(responseJson.Token)
       Auth.setAuthUser([...responseJson.userAutth])
       Auth.setPostDataSource([])
       FeedsData(0).then(res=>{
        if(res.length == 0)
        return;
        Auth.setPostDataSource(res)
        Auth.setStart(Auth.start+1)
        navigation.goBack()
        
       })

          //AsyncStorage.setItem('SCOM', responseJson.Token);
          //AsyncStorage.setItem('AuthUser', JSON.stringify(responseJson.userAuth));
          //AsyncStorage.setItem('AutthUser', JSON.stringify(responseJson.userAutth));
          //AsyncStorage.setItem('ProfileImage',responseJson.userAuth.ProfileImage);
         
       
    
          //navigation.replace('Home');
     }
          
   })
  
}
  
}


 
  return(
    <View style={{ flex:1,width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
       
       <View style={{ padding:60,width:'100%',alignItems:'center',backgroundColor:'white'}}>
       <View style={{alignItems:'center',width:'100%',paddingBottom:10,justifyContent:'center'}}>
          <Image style={{width:170, height:80, alignItems:'center'}} source={require('../../assets/img/logo(3).png')} />
        
        </View> 
        <View style={{width:'100%'}}>
        <Text style={{color:'black',fontWeight:'600',fontSize:12}}>EMAIL</Text>
        <TextInput
          style={{color:'black',borderRadius:5,borderColor:'grey', borderWidth: 1,padding:12, marginBottom:15,width:'100%'}}
          //placeholder="Email Address"
          textContentType="emailAddress"
          onChangeText={userEmaill => setUserEmail(userEmaill)}
          secureTextEntry={false}
        />
      
  
        <Text style={{color:'black',fontWeight:'600',fontSize:12}}>PASSWORD</Text>
        <TextInput
          style={{color:'black',borderRadius:5, borderWidth: 1,borderColor:'grey', padding:12 , marginBottom:20,width:'100%'}}
          //placeholder="password"
          textContentType = "password"
          secureTextEntry={true}
          onChangeText={userPasswordd=> setUserPassword(userPasswordd)}
        />
        </View>
        <View style={{width:'100%', alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%',alignItems:'center',padding:15,backgroundColor:'#147EFB',borderRadius:40,marginBottom:35}} onPress={this.login}><Text style={{color: 'white',fontSize:18,}}>Log in</Text></TouchableOpacity>
        <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={() => navigation.navigate('passwordForgot')}><Text style={{color: '#147EFB',fontSize:14}}>Forgot Password?</Text></TouchableOpacity>
        </View>
        
       
        </View>
        <View style={{width:'100%',borderTopWidth:1,justifyContent:'center',position:'absolute',bottom:20,flexDirection:'column',borderTopColor:'lightgrey',padding:10}}>
       <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
        <Text>Don't have an account yet?</Text>
        </View>
        <View style={{paddingHorizontal:60}}>
          <TouchableOpacity style={{width:'100%',padding:15,borderWidth:1,borderColor:'#147EFB',borderRadius:30,alignItems:'center'}} onPress={() => navigation.navigate('Signup')}><Text style={{color: '#147EFB',fontSize:18,fontWeight:'800'}}>Sign Up</Text></TouchableOpacity>
        </View>
        </View>
        
        
        
    </View>)

}


