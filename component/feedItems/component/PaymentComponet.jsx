import React from "react";
import { Card,Image,Avatar, Icon, Button } from "@rneui/themed";
import { Dimensions, Text,TouchableOpacity, View,Linking } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { FeedItemstyles } from "../../../StyleComponent/Style";
import * as Sharing from 'expo-sharing';
import { RewardedAdEventType} from 'react-native-google-mobile-ads';
import { PostWatchedAdAPi } from "../../../API/API";
 


  

export default PaymentComponet = ({navigation,data,rewarded,Auth,setAdUnitId,setPostId,dataSource,setDataSource,setStatus}) =>{

     

  



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
  <Text style={{color:'white',fontWeight:'800',fontSize:19}}>Unlock on our site!</Text>
      
      
     
        
        
        <TouchableOpacity  
      onPress={async()=>{
        
       // await navigation.navigate('Web',{url:'https://mymiix.com/post/payment/'+data.UniqeId+'',title:''+data.PostBody})

       const urls = 'https://mymiix.com/post/payment/'+data.UniqeId+''
       const supported = await Linking.canOpenURL(urls);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(urls);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urls}`);
    }
      
       /*

      rewarded.load();
      
        
       
      //await rewarded.show();
      rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          
            // Start loading the rewarded ad straight away
          rewarded.show();
        });
        
     rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
    
    
            
           //if(reward.type == "Reward"){
    
         PostWatchedAdAPi(data.PostId,'content')
            .then(response=>{  
              console.log(response)
              if(response[0].Success == "Rewarded"){      
            data.StatData = "1";
            data.PostImage = response[0].PostImage;
            Auth.setPostDataSource([...Auth.PostDataSource]);
              }
    
              
          });
        //}
    
        
            
          }
        );
    
       
    
      */



     

        }}
      
      style={{padding: 20,justifyContent:'center',backgroundColor:'#0aafff',alignItems:'center',marginVertical:10,borderRadius:30,flexDirection:'column',color:'white'}}><Text style={{color:'white',fontWeight:'400'}}>Go to Site To Unlock</Text></TouchableOpacity>
      
      
      
      
      </View>
              :null
  
  
  
  }
  </View>)
   }



}