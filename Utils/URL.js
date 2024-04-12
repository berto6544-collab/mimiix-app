import { View, Text,TouchableOpacity,Linking,Modal,Platform,Dimensions,Switch,StyleSheet} from 'react-native';
import { LinkPreview } from '@flyerhq/react-native-link-preview'

import * as WebBrowser from 'expo-web-browser';
import { Image } from '@rneui/themed';
import { UrlPreview } from '../component/previewUrl/PreviewUrl';





export function OpenUrl(url,data,navigation,postimage,postId,status){
  
    const handlePress = async (word) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(word);
      
      fetch('https://mymiix.com/public/api/PostInteraction?postid='+postId+status+"&func=Website",{
  method:'GET'
})
.then(response =>response.json())

  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
      
        // await Linking.openURL(word);
      
        await WebBrowser.openBrowserAsync(word)
      
      } else {
       
      }
    
    
    
    }
    
    if(url != undefined){

    if (typeof(url === 'string')) {
    
      // Split the content on space characters
      var words = url.toString().split(/\s/);
      
     
     
      var contents = words.map(function(word, i) {
        var separator = i < (words.length - 1) ? ' ' : '';
        if (word.match(/^https?\:\//)) {

        if(postimage == ""){
          return <TouchableOpacity activeOpacity={1} style={{justifyContent:'center',height:Dimensions.get('window').height -470,width:'100%',marginBottom:10}} onPress={()=>{
        
          
            handlePress(word)
          
          }} >
            
          <UrlPreview data={data} />
        </TouchableOpacity>
        }

        }

      })
      
      var contentss = words.map(function(word, i) {
        
        // Space if the word isn't the very last in the set, thus not requiring a space after it
        var separator = i < (words.length - 1) ? ' ' : '';
    
    
        // The word is a URL, return the URL wrapped in a custom <Link> component
        if (word.match(/^https?\:\//)) {
          
          
        // The word is not a URL, return the word as-is

        if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {

        
         

        }
        else{

         
            return (<Text title={true} style={{fontWeight:'600',color:'#0086ff'}} onPress={()=>{
              

              if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?mymiix\.com\/(?:@[a-zA-Z0-9_]+)/)) {     
                var U =word.replace(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?mymiix\.com\/(?:@+)/),'');
               
                fetch('https://mymiix.com/public/api/PostInteraction?postid='+postId+status+"&func=Profile",{
  method:'GET'
})
.then(response =>response.json())
               navigation.navigate('Profile',{username:u});

              }else{
              
              handlePress(word)
              }
            
            }} >{word + separator}</Text>);
  
            
        }

        } 
       


        else if(word.match(/([@])/)){
       
       
       
        u = word.replace('@','');
          
         
          return(<Text style={{fontWeight:'600',color:'#0086ff'}} onPress={()=>{
            fetch('https://mymiix.com/public/api/PostInteraction?postid='+postId+status+"&func=Profile",{
  method:'GET'
})

            navigation.navigate('Profile',{username:u});
           

        }}>{word+ separator}</Text> );

            
      
      
      }
            else if(word.match(/([#])/)){
              return(<Text style={{fontWeight:'600',color:'#0086ff'}} >{word + separator}</Text>);
    
            }
        
        else {
          return <Text style={{color: 'black'}}>{word + separator}</Text>;
        }
      });
    
    // The nested content was something else than a plain string
    // Return the original content wrapped in a <Text> component
    }
    
    // Return the modified content wrapped in a <Text> component
    
    return (
      
        <View style={{width:'100%'}}>
          {<View style={{width:'100%',paddingHorizontal:10,paddingBottom:10,flexWrap:'wrap',flexDirection:'row'}}>{contentss}</View>}
          {contents}
          
          
          </View>
      
    );
    
    }



    }



    export function OpenStorieUrl(url,postimage,onReadMore,onImageLoaded,onOpen,Idd,PostId){
  
      const handlePress = async (word) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(word);
      
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
         // await Linking.openURL(word);
         await WebBrowser.openBrowserAsync(word)
        } else {
         
        }
      
      
      
      }
      
      if(url != undefined){
    
      if (typeof(url === 'string')) {
      
        // Split the content on space characters
        var words = url.toString().split(/\s/);
        
       
        // Loop through the words
        var contents = words.map(function(word, i) {
      
          // Space if the word isn't the very last in the set, thus not requiring a space after it
          var separator = i < (words.length - 1) ? ' ' : '';
          
    
          
          // The word is a URL, return the URL wrapped in a custom <Link> component
          if (word.match(/^https?\:\//)) {
           
    
            if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
    
              var u = word.replace('https://www.twitch.tv/','');
              if(postimage == ""){
    
              
              }
    
            }
    
           
    
            else{
          
    
          if(postimage == ""){
    
           
            }
            
          }
    
    
    
          } 
    
         
          else{
            
          }
        });
      
        
        var contentss = words.map(function(word, i) {
          
          // Space if the word isn't the very last in the set, thus not requiring a space after it
          var separator = i < (words.length - 1) ? ' ' : '';
      
      
          // The word is a URL, return the URL wrapped in a custom <Link> component
          if (word.match(/^https?\:\//)) {
            
            
    
            if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
    
              var u = word.replace(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\//,'');
              if(postimage == ""){
    
              return <TouchableOpacity onPress={()=>{
                onOpen();
              
    
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
              
                }
    
              }}  style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              onLoadEnd={onImageLoaded}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              allowsInlineMediaPlayback={true} style={{width:'100%', height:Dimensions.get('window').height -470,backgroundColor:'black'}} source={{uri: 'https://player.twitch.tv/?channel='+u+'&parent=mymiix.com&autoplay=false'}} ></WebView></TouchableOpacity>
              }
    
            }
    
          if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/)) {
    
              
              if(postimage == ""){
    
                var U =word.replace('https://open.spotify.com/track/','');
              return <TouchableOpacity onPress={()=>{
                onOpen();
                
    
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              scalesPageToFit={true}
              onLoadEnd={onImageLoaded}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              allowsInlineMediaPlayback={true} style={{width:'100%',height:Dimensions.get('window').height -470,borderRadius:10}} source={{uri:'https://open.spotify.com/embed/track/'+U+':autoplay:0'}} ></WebView></TouchableOpacity>
              }
    
            }
    
    
            if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?episode\/([a-zA-Z0-9_]+)/)) {
    
              
              if(postimage == ""){
    
                var U =word.replace('https://open.spotify.com/episode/','');
              return <TouchableOpacity onPress={()=>{
                onOpen();
                
    
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              scalesPageToFit={true}
              onLoadEnd={onImageLoaded}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              allowsInlineMediaPlayback={true} style={{width:'100%',height:Dimensions.get('window').height -470,borderRadius:10}} source={{uri:'https://open.spotify.com/embed-podcast/episode/'+U+':autoplay:0'}} ></WebView></TouchableOpacity>
              }
    
            }
    
    
    
            if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed-podcast\/?episode\/([a-zA-Z0-9_]+)/)) {
    
              
              if(postimage == ""){
    
                var U =word.replace('https://open.spotify.com/embed-podcast/episode/','');
              return <TouchableOpacity onPress={()=>{
                onOpen();
                
    
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              scalesPageToFit={true}
              onLoadEnd={onImageLoaded}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              allowsInlineMediaPlayback={true} style={{width:'100%',height:Dimensions.get('window').height -470,borderRadius:10}} source={{uri:word}} ></WebView></TouchableOpacity>
              }
    
            }
    
            if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/)) {
    
              
              if(postimage == ""){
    
                var U =word.replace('https://open.spotify.com/album/','');
              return <TouchableOpacity onPress={()=>{
                onOpen();
              
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              scalesPageToFit={true}
              onLoadEnd={onImageLoaded}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
            cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              allowsInlineMediaPlayback={true} style={{width:'100%',height:Dimensions.get('window').height -470,borderRadius:10}} source={{uri:'https://open.spotify.com/embed/album/'+U+''}} ></WebView></TouchableOpacity>
              }
    
            }
            
            if ( word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/)) {
    
              
              if(postimage == ""){
    
                var U =word.replace('https://open.spotify.com/playlist/','');
              return <TouchableOpacity onPress={()=>{
                onOpen();
              
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} style={{justifyContent:'center',width:'100%',height:Dimensions.get('window').height -470,backgroundColor:'black'}}><WebView 
              javaScriptEnabled={true} 
              injectedJavaScript={runFirst}
              onMessage={(event) => {}}
              allowsLinkPreview={true}
              scalesPageToFit={true}
              thirdPartyCookiesEnabled={true}
              cacheEnabled={true}
              cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
              onLoadEnd={onImageLoaded
    
              
              
              }
              allowsInlineMediaPlayback={true} style={{width:'100%',height:Dimensions.get('window').height -470,borderRadius:10}} source={{uri:'https://open.spotify.com/embed/playlist/'+U+''}} ></WebView></TouchableOpacity>
              }
    
            }
    
    
          else{
    
            if(postimage == ""){
              
    
              return <TouchableOpacity style={{justifyContent:'center',height:Dimensions.get('window').height -470,width:'100%'}} onPress={()=>{
                onReadMore();
              
                if(Idd != null){
                fetch('https://www.mymiix.com/public/api/SponsoredAd?Id='+Idd+'&userId='+Utils.getUserId(),{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                 
                  fetch('https://mymiix.com/public/api/videoViewersReactNative?idd='+PostId,{
                  method:'GET',
                  header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                  
                })
                .then((response) => response.json())
                 .then((responseJson)=>{
                    
                  
                  
                 
                  
                
                  
                
                 });
                 
                  
                
                  
                 });
                }
              
              }} >
                
              <RNUrlPreview title={true} style={{margin:0,padding:0,width:'100',height:Dimensions.get('window').height -470}}
              
              onLoad={onImageLoaded}
             
              
              imageProps={{resizeMode: 'cover'}}  imageStyle={{width:'100%',height:Dimensions.get('window').height -670,margin:0,padding:0,backgroundColor:'lightgrey', borderTopLeftRadius: 10,borderTopRightRadius: 10, }} containerStyle={{flexDirection:'column',height:Dimensions.get('window').height -470,backgroundColor:'lightgrey',borderRadius:10}} text={word}  />
            </TouchableOpacity>
              
          }
    
            else{
              if(postimage != "")
              return <Text title={true} style={{fontWeight:'600',color:'#0086ff'}} onPress={()=>handlePress(word)} >{word + separator}</Text>;
    
              }
          }
    
          } 
         
          
          else {
            return <Text style={[styles.sWord,{color: themes[Utils.getThemeMode()].Color}]}>{word + separator}</Text>;
          }
        });
      
      // The nested content was something else than a plain string
      // Return the original content wrapped in a <Text> component
      } else {
        //return <></>;
      }
      
      // Return the modified content wrapped in a <Text> component
      
      return (
        
          <View style={{width:'100%'}}>
            <View style={{width:'100%',flexWrap:'wrap',alignItems:'center',flexDirection:'row'}}>{contentss}</View>
            <View style={ contents.length > 0 ?{width:'100%',backgroundColor:'lightgrey',borderRadius:20}:{width:'100%',backgroundColor:'lightgrey',borderRadius:20}}>
            {contents}
            </View>
            
            
            </View>
        
      );
      
      }
      }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { 
    width: '100%',
    height: '100%',
    position:'absolute',
    alignItems:'center',
    justifyContent:'center'

  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute'
  },

});