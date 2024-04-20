import { View, Text,TouchableOpacity,Linking,Modal,Platform,Dimensions,Switch,StyleSheet} from 'react-native';
import { LinkPreview } from '@flyerhq/react-native-link-preview'

import * as WebBrowser from 'expo-web-browser';
import { Avatar, Icon, Image } from '@rneui/themed';
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
      var rgx_link = url.toString().split(/(https?:\/\/)/gi);
     var dataUrl = data.DataURL;
     
      var contents = dataUrl.map(function(word, i) {
        var separator = i < (words.length - 1) ? ' ' : '';
       

        if(postimage == ""){
          return <TouchableOpacity activeOpacity={1} style={{justifyContent:'center',height:Dimensions.get('window').height -470,width:'100%',marginBottom:10}} onPress={()=>{
        
          
            handlePress(word.url)
          
          }} >
            
          <UrlPreview data={data} />
        </TouchableOpacity>
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
          {contents[0]}
          
          
          </View>
      
    );
    
    }



    }



    export function OpenUrls(url,isTrue,setisTrue,setDataSourceLink,userid,otheruserid,navigation){
       

        
      if(url.length > 0){
      
      
      
        // Split the content on space characters
       

        
          
        const ViewURL = ({word,image,i}) =>{

          return(<TouchableOpacity onPress={()=>{
            navigation.navigate('Web',{url:word.Link}) 
          }} style={{width:'100%',position:'relative',justifyContent:'space-between',backgroundColor:'lightgrey',gap:10,marginBottom:10,display:'flex',padding:10,borderRadius:10,flexDirection:'row',alignItems:'center'}}>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
          <Avatar   source={{uri:image}} />
          
          <Text onPress={()=>{
          navigation.navigate('Web',{url:word.Link}) }} >
          {word.LinkText}
        
          </Text>
          </View>

        
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>  
          {otheruserid == userid ?<Text onPress={async()=>{
            
            const formData = new FormData();
            formData.append('id',word.Id)

            const responseJSON = await fetch('https://mymiix.com/public/api/RemoveLink',{
            method:'POST',  
            body: formData})
            .then(res=>res.json());

           
              if(responseJSON.length > 0){
                url.splice(i,1)
                setDataSourceLink([...url])
              }

          }}>Remove</Text>:null}

         <Icon name={'right'}  type={'ant-design'}  />
         </View>

          </TouchableOpacity>)
        }




        var contentss = url.map(function(word, i) {
      
          
          
          
          if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) {
            return <ViewURL i={i} word={word} image={'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'} />
            
            
            
            
            
            

            // The word is not a URL, return the word as-is
            } 
    
            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
              return <ViewURL i={i} word={word} image={'https://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png'} />
              
              
             
              
              
              
              
              
              // The word is not a URL, return the word as-is
              } 
    
              else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?kick\.com\/([a-zA-Z0-9_]+)/)) {
                return<ViewURL i={i} word={word} image={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD////x8fHp6emlpaVDQ0P8/PyGhoatra3u7u4QEBAiIiK2trb5+fnS0tIEBAQ9PT3IyMhtbW3a2toZGRlmZmaXl5cNDQ0nJyfi4uJHR0c5OTlhYWHQ0NAeHh6NjY0wMDB5eXmampqnp6dXV1fAwMDp6VoBAAAD3UlEQVR4nO2bi1biMBBA26DRwpaisBbwuSr//4ubPiiPDikJsaDeq8eDp+10bqcNIQlRBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt7HAdGeXobSLXlYbtbTxtfsUe9GqPZditOFOtKm0y63F8Eo6YNxtqK6rjUraeNN9ir1o1Z7XYrRdw7G0yxWGv9gwO8EwWx8fxDDLGkPhYT2xhpGfYZTZTuFomDXRxlJr5Gs4u54YHq89DaP55NEc/3ZEW3pEDaO3Mpu3acgaPiXK/CSJr+F7miilkjSEYRStVIkOafi3iCVGPM7wiOIda2gew7v6Xy1cMW9DW079GhrupG01GLbAMO7VMP8Cw+dq29OBVqbMqT/DOtOV5XhHQx2nVXOl9EHBHg11ai60+U0t7zquhroy0+sXYk79GWrjWPyxHO9mWAZsYh/Mqb+7NE1NRrYKetcwtpSwT8PiDrXdTrFHS9ON9jZs3/vGILEZWrLQcdUWhjfU/jXUrX6gydNaQ2seX2E4KJlOPA3VYrAY7GD+nfrWMCljJQ9BDddHZn6GfyzJONcwvrdEO9nQs4YYuoEhhiI/1lDrqpFXl2Co46RMJnkKaBiPX2YFL+c3LLoyN1GZTN6MMgYwnIrHn8dQN8PqnYLf0jBuDLv9nAwzKeC5avhQCWaBa9hMRZzXsFCspkYy8aqfYChwvpamJg9nOJ7PR4b5ZRi+Dotc5kNLNFfDNFZpwUW84+u0wrzjB7xL11yCYQO9NgxFMIy/v6Fppl9Go9zXMBsJ+Br+G5aHz4IaJgVq4TuaqJKBSvZZeBqmVSj1HtSwTnTpaSgOXaeehuuh14/ghtp/zDttD8+baN6GXiPCpquQVicuJrYO0OfcU/GbWicunA3rYKZbdBGGxRSYDjl/aK7XuoYXM3+4zukArvOH9eXSqfDMNDn1OAdczq0FNDTPbj2P//lD5/H17pqoQzl949UmGNY5YXjBhnFjeF+81nJH61yGcifE1/BzWiKurD7G8LU6Xlyf6m54WyWjgq6Czsvh0ZmnYZZnwdZ5bwZGx1I3xNewjpl5GlpP4Wy4WckuFNG1T7O9kt1Ezj0NHVayW9fT7NUwPr2GTZ+mpuvbCK3VMY411E0Nl4cMtwZFnwMY7n8bQarh5vNh+3Ta+S7dfD6UGsrdcXvn71t8dBhmp39nRjzFtl/3c7hVQ7Flt33Gf0gGLZLVjmGuhF3Wa6IW7W2D5KbzFHvU4zSTqbCryncMV9IJbWuiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+C/8BNqBMrd8etMYAAAAASUVORK5CYII='} /> 
                
                
                
                
                // The word is not a URL, return the word as-is
              } 


              else if (word.Link.match(/http(?:s?):\/\/(?:www\.)?(?:m\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌[\w\?‌=]*)?/)) {
                  return <ViewURL i={i} word={word} image={'https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png'} />
                  
                 
                  
                  
                  
                  // The word is not a URL, return the word as-is
                } 
    
                else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/)) {
                  return  <ViewURL i={i} word={word} image={'https://cdn-icons-png.flaticon.com/512/3621/3621435.png'} />
                  
                  
                  
                  
                 
                  } 
    
                  else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/)) {
                      return <ViewURL i={i} word={word} image={'https://cdn-icons-png.flaticon.com/512/124/124010.png'} />
                      
                      
                      
                      
                      
                      // The word is not a URL, return the word as-is
                    } 
                    else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?onlyfans\.com\/([a-zA-Z0-9_]+)/)) {
                      return<></>
                      
                      // The word is not a URL, return the word as-is
                      } 
                      else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)|(?:open\.)?spotify\.com\/([a-zA-Z0-9_]+)/)) {
                          return <ViewURL i={i} word={word} image={'https://www.edigitalagency.com.au/wp-content/uploads/Spotify-Icon-png-rgb-black.png'} />
                          
                          
                          
                          
                          
                          // The word is not a URL, return the word as-is
                        } 
    
                        else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
                        
                          return <ViewURL i={i} word={word} image={'https://e1.pngegg.com/pngimages/1001/845/png-clipart-somacro-45-300dpi-social-media-icons-soundcloud-soundcloud-logo-thumbnail.png'} />
                          
                          
                          
                          
                          
                                                      
                            // The word is not a URL, return the word as-is
                          } 
    
                          else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?artstation\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://cdn-icons-png.flaticon.com/512/5968/5968654.png'} />
                              
                              
                              
                              
                                                         
                                  // The word is not a URL, return the word as-is
                            }

                            
                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?tiktok\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://w7.pngwing.com/pngs/814/840/png-transparent-tiktok-tiktok-logo-tiktok-icon-thumbnail.png'} />
                                                       
                                  // The word is not a URL, return the word as-is
                            }


                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?shopify\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/shopify-512.png'} />
                              
                                                         
                                  // The word is not a URL, return the word as-is
                            }
          

                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?reddit\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png'} />
                              
                              
                              
                              
                                                        
                                  // The word is not a URL, return the word as-is
                            }

                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?cameo\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Cameo_Icon.svg/1200px-Cameo_Icon.svg.png'} />
                                                       
                                  // The word is not a URL, return the word as-is
                            }

                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9_]+)/)) {
                              return <ViewURL i={i} word={word} image={'https://cdn-icons-png.flaticon.com/512/25/25231.png'} />
                              
                              
                              
                                                           
                                  // The word is not a URL, return the word as-is
                              }
                              else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?cash\.app\/([a-zA-Z0-9_]+)/)) {
                                return <></>;
                                // The word is not a URL, return the word as-is
                                }
                                else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?mymiix\.com\/@([a-zA-Z0-9_]+)/)) {
                                  return <ViewURL i={i} word={word} image={'https://image.winudf.com/v2/image1/Y29tLm1pbmdsZW1paXhfaWNvbl8xNjQ4ODU4NzUwXzA2MA/icon.png?w=184&fakeurl=1'} />
                                  
                     
                                    
                                    // The word is not a URL, return the word as-is
                                  } 
    
                    
        
        });
    
      
        
        
      
      // The nested content was something else than a plain string
      // Return the original content wrapped in a <Text> component
      
      
      
      return (
        
          <View style={{width:'100%',textAlign:'center',marginBottom:10}}>
            
            {url.length > 0 ?<View style={{width:'100%'}}>
              {isTrue == false ?<View style={{width:'100%',display:'flex',flexDirection:'column',position:'relative',alignItems:'center'}}>
                {contentss[0]}
                <Icon name={'down'} type={'ant-design'} style={{cursor:'pointer'}} onPress={()=>{setisTrue(true)}} />
                </View>
                :
                <View style={{width:'100%',display:'flex',flexDirection:'column',position:'relative',alignItems:'center'}}>
                {contentss}
                <Icon name={'up'} type={'ant-design'} style={{cursor:'pointer'}} onPress={()=>{setisTrue(false)}} />
                </View>}
    
            </View>:null}
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