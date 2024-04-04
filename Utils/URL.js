import { View, Text,TouchableOpacity,Linking,Modal,Platform,Dimensions,Switch} from 'react-native';
import { LinkPreview } from '@flyerhq/react-native-link-preview'

import * as WebBrowser from 'expo-web-browser';
import { Image } from '@rneui/themed';
import { UrlPreview } from '../component/previewUrl/PreviewUrl';





export function OpenUrl(url,data,postimage,postId,status){
  
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
          return <TouchableOpacity style={{justifyContent:'center',height:Dimensions.get('window').height -470,width:'100%'}} onPress={()=>{
        
          
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
               // navigation.navigate('Profile',{Id: U});

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

            //navigation.navigate('Profile',{Id: u});
           

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
          {<View style={{width:'100%',flexWrap:'wrap',flexDirection:'row'}}>{contentss}</View>}
          {contents}
          
          
          </View>
      
    );
    
    }
    }