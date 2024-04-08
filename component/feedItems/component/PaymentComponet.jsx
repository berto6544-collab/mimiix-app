import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { FeedItemstyles } from "../../../StyleComponent/Style";



export default PaymentComponet = ({navigation,data}) =>{



   if(data.Stat == "Contributor" && data.SubsData == "0"){
    return(<View style={{display:'flex',flexDirection:'column',gap:5,alignItems:'center'}}>
<View style={{justifyContent:'center',alignItems:'center',zIndex:22,position:'relative'}}>{
    data.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<View style={{justifyContent:'center',alignItems:'center',zIndex:22,position:'relative'}}>
    {/*<AntDesign name="lock"  style={{fontWeight:'200',fontSize:27,color:'white'}}  />*/}
    <Text style={{color:'white',fontWeight:'800',fontSize:19}}>Subscribe To See Post</Text>
    
    
   
      
      
      <TouchableOpacity  
    onPress={async()=>{
  
     
      
     
     await navigation.navigate('Web',{url:'https://mymiix.com/@'+data.UserName+'/subscription',title:'@'+data.UserName})
      
      
      
      }}
    
    style={{padding: 20,justifyContent:'center',backgroundColor:'#0aafff',alignItems:'center',marginVertical:10,borderRadius:30,flexDirection:'column',color:'white'}}><Text style={{color:'white',fontWeight:'400'}}>Subscribe To See Post</Text></TouchableOpacity>
    
    
    
    
    </View>
            :<Text style={{color:'white',fontWeight:'400'}}></Text>



}
</View>

    </View>)

   }




   //Buy content section
   if(data.Stat == "Donor" && data.StatData == "0"){

    return(<View style={{justifyContent:'center',alignItems:'center',zIndex:22,position:'relative'}}>{
      data.Payment.match(/acct\_([a-zA-Z0-9_]+)/)?<View style={{justifyContent:'center',alignItems:'center',zIndex:22,position:'relative'}}>
      {/*<AntDesign name="lock"  style={{fontWeight:'200',fontSize:27,color:'white'}}  />*/}
  <Text style={{color:'white',fontWeight:'800',fontSize:19}}>Buy Content ${data.Amount}</Text>
      
      
     
        
        
        <TouchableOpacity  
      onPress={async()=>{
        
        
       
         // await WebBrowser.openBrowserAsync();
const url = 'https://mymiix.com/post/payment/'+data.UniqeId;

          await navigation.navigate('Web',{url:url,title:'@'+data?.UserName})
      
        }}
      
      style={{padding: 20,justifyContent:'center',backgroundColor:'#0aafff',alignItems:'center',marginVertical:10,borderRadius:30,flexDirection:'column',color:'white'}}><Text style={{color:'white',fontWeight:'400'}}>Pay ${data.Amount} To See Post</Text></TouchableOpacity>
      
      
      
      
      </View>
              :null
  
  
  
  }
  </View>)
   }



}