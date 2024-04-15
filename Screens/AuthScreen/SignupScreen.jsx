import React from "react";
import { Text,View,TextInput,ScrollView,TouchableOpacity,Modal } from "react-native";
import {CheckBox} from '@rneui/themed';
import WebView from 'react-native-webview';
import { AuthContext } from "../../AuthContext/context";
import { FeedsData,SigninAPI } from "../../API/API";
export default SignupScreen = ({navigation}) => {
    //const [selectedValue, setSelectedValue] = React.useState("private");
  
  
  

  
    let today = new Date();
    let date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();
   
      const [Name,setName] = React.useState('');
      const [userName,setUserName] = React.useState('');
      const [userEmail,setUserEmail] = React.useState('');
      const [userPassword,setUserPassword] = React.useState('');
      const [userGender,setUserGender] = React.useState('other');
      const [userSecurity,setUserSecurity] = React.useState('safeGaurd');
      const [userAgreement,setUserAgreement] = React.useState(0);
      const [isAccepted,setIsAccepted] = React.useState(false);
      const [userStatus,setUserStatus] = React.useState("");
      const [status,setStatus] = React.useState("");
      const AgreementModal = React.useRef(null)
  
      const Auth = React.useContext(AuthContext)
  

  
  
  
  
  
  
  
  
  
  
  
 const LoginAccount = () =>{
  
  SigninAPI(userEmail,userPassword)
  .then(responseJson=>{
   if(responseJson?.resp == "ok"){
     // redirect to profile page
     


     Auth.setToken(responseJson.Token)
     Auth.setAuthUser([...responseJson.userAutth])
     //Auth.setPostDataSource([])
     Auth.setStart(0)
     FeedsData(0).then(res=>{
      if(res.length == 0)
      return;
      Auth.setPostDataSource(res)
      Auth.setStart(Auth.start+1)
      navigation.goBack()
      
     })

    
     
   }
        
 })
  }
  
    CreateAccount = () => {
  
  
  
      
  
  fetch('https://mymiix.com/public/api/users', {
  method: 'POST',
  header:{
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  
    
  body: JSON.stringify({
  
  name: Name,
  username: userName,
  email: userEmail,
  gender: userGender,
  password: userPassword,
  privacy: 1,
  security: userSecurity,
  aboutme: "",
  Agreementt: userAgreement,
  timeZone: "",
  countryCode: "",
  DOB:"",
  Postsecurity: ""
  
  
  })
  
  
  
  }) .then((response) => response.json())
  .then((responseJson)=>{
  
    console.log(responseJson)
  if(responseJson.Success == "User Created") {
   
    LoginAccount();
   // setStatus(responseJson.Success);
   
    
   
    
  }
  else{
    
    setStatus(responseJson.Error);
  
  
  
  }
  
  })
  
  
  
  
    }
    
   
   
  
    

  
      
  
  
    return (
  
      
      <ScrollView alwaysBounceVertical={false}  Vertical={true} showsVerticalScrollIndicator={false} style={{backgroundColor:'white',color:'black',flex:1}}>
        
        
       
  
  
  
  
      <View style={{ backgroundColor:'white',justifyContent:'center'}}>
  
    
  
  
  <View style={{ paddingHorizontal:50,backgroundColor:'white',justifyContent:'center', paddingVertical:50}}>
          <View style={{alignItems:'center',flexDirection: 'column',justifyContent: 'center',paddingBottom:20}}>
          <Text style={{fontWeight: '600',color:'black',fontStyle: 'normal',textAlign:'center'}}>Connect with other creative minds.</Text>
  
          <Text style={{fontWeight: '600',color:'black',fontStyle: 'normal',fontSize:20,textAlign:'center'}}>Signup Today!</Text>
  
          </View>
          <Text style={{color:'black',fontWeight:'600',fontSize:12}}>FULL NAME</Text>
          <TextInput
            style={{height: 40, borderWidth: 1,borderColor:'#147EFB',color:'black',borderRadius:5,padding:5, marginBottom:15}}
            //placeholder="Full Name"
            textContentType="givenName"
            onChangeText={(value) => setName(value)}
            secureTextEntry={false}
          />
          
  
          
     
          <Text style={{color:'black',fontWeight:'600',fontSize:12}}>USER NAME</Text>
          <TextInput
            style={{height: 40, borderWidth:1,borderColor:'#147EFB',padding:5,borderRadius:5,color:'black', marginBottom:15}}
            //placeholder="User name"
            textContentType="username"
            onChangeText={(value) => setUserName(value)}
            secureTextEntry={false}
          />
  
  
  
  
  
  
          
  
  
         <Text style={{color:'black',fontWeight:'600',fontSize:12}}>EMAIL</Text>
          <TextInput
            style={{height: 40, borderWidth: 1,borderColor:'#147EFB',borderRadius:5,color:'black',padding:5, marginBottom:15}}
            //placeholder="Email Address"
            textContentType="emailAddress"
            onChangeText={(value) => setUserEmail(value)}
            secureTextEntry={false}
          />
    
          <Text style={{color:'black',fontWeight:'600',fontSize:12}}>PASSWORD</Text>
          <TextInput
            style={{height: 40, borderWidth: 1,borderColor:'#147EFB',borderRadius:5,color:'black', padding:5 , marginBottom:20}}
            //placeholder="password"
           textContentType = "password"
            secureTextEntry={true}
            onChangeText={(value) => setUserPassword(value)}
          />
  
  
          
          
          <View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
          
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          
          {<CheckBox  checked={isAccepted}  onPress={()=>{
            setIsAccepted(!isAccepted)
          if(isAccepted){
            
            setUserAgreement(0)

          }else{
            setUserAgreement(1)
          }
          
          }} onValueChange={(value) => {
         
          
        
        
        }} style={{marginRight: 10,borderRadius:5,color:'black'}} />}
        
  
          <Text>By signing up, you confirm that you agree to our </Text>
  
          </View>
  
          {<View style={{flexDirection: 'row', alignItems: 'center'}}>
          
          
          
  
      </View>}
          <TouchableOpacity onPress={()=> {

          }} ><Text style={{color: '#147EFB',fontWeight:'600'}}>Terms of Service and Privacy Policy</Text></TouchableOpacity>
          
          </View>
          
  
          
  
  
      
  </View>
  
  
  
            
  
            <TouchableOpacity  style={{alignItems:'center',marginVertical:15,padding:15,backgroundColor: !isAccepted? 'lightgrey':'#147EFB',borderRadius:30}} onPress={()=> this.CreateAccount()} disabled={isAccepted?false:true}><Text style={{color: 'white',fontWeight:'500'}}>Sign Up & Agree</Text></TouchableOpacity>
            <Text style={{marginVertical: 5,textAlign:'center'}}>{userStatus}</Text>
  
          
          
      
  </View>
      </View>
      </ScrollView>
    );
    
   
  
  
  }