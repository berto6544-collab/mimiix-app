import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";


const Post = ({navigation}) => {
const Auth = React.useContext(AuthContext)


    React.useEffect(()=>{

        navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])
    
    
    return (<WebView 
      javaScriptEnabled={true} 
      
      
      onMessage={(event) => {
        // console.log(event.nativeEvent.data) // Client received data
         let responseJson = JSON.parse(event.nativeEvent.data) 

        if(responseJson.length > 0){
         console.log(responseJson)
        

          const newdataSource = 
          [{
         PostId: responseJson[0].PostId,
         PostBody: responseJson[0].PostBody,
         PostedBy: responseJson[0].PostedBy,
         PostDate: responseJson[0].PostDate,
         PostImage: responseJson[0].PostImage,
         ProfileImg: responseJson[0].ProfileImg,
         TopicHeader: responseJson[0].TopicHeader,
         isOnline: responseJson[0].isOnline,
         followerID: responseJson[0].usersID,
         usersID: responseJson[0].usersID,
         Poster: responseJson[0].Poster,
         SharedusersID: responseJson[0].SharedusersID,
         Sharedname: responseJson[0].Sharedname,
         Sharedprofile: responseJson[0].Sharedprofile,
         SharedData: responseJson[0].SharedData,
         thisID: responseJson[0].thisID,
         DataURL:responseJson[0].DataURL,
         Payment: responseJson[0].Payment,
         Verified: responseJson[0].Verified,
         VerifiedData:responseJson[0].VerifiedData,
         LikesData:responseJson[0].LikesData,
         CommentData: responseJson[0].CommentData,
         usersTagged: responseJson[0].usersTagged,
         Music: responseJson[0].Music,
         StatData:responseJson[0].StatData,
         Stat:responseJson[0].Stat,
         Amount:responseJson[0].Amount,
         Link:responseJson[0].Link,
         LikesCount: responseJson[0].LikesCount,
         VideoCount: responseJson[0].VideoCount,
         LikedPost: [],
         Likes: responseJson[0].Likes
      
        }];
        
        Auth.PostDataSource.push(responseJson)
    
        Auth.setPostDataSource([...Auth.PostDataSource])
       

      }

      }}
      allowFileAccess={true} 
      sharedCookiesEnabled={true} 
      style={{width:Dimensions.get('screen').width,backgroundColor:'transparent',flex:1}}  
      thirdPartyCookiesEnabled={true} 
      scalesPageToFit={true} 
      allowingReadAccessToURL={'file://'}
      showsVerticalScrollIndicator={false} 
      source={{uri: 'https://mymiix.com/create/post'}} 
      
      
      />);
  }


  export default Post;