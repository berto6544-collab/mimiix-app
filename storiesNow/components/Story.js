/* eslint-disable react/no-unused-prop-types */
import React,{useState,useRef} from 'react';
import { Dimensions, Image, StyleSheet,TouchableOpacity, View,Text } from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import UrlUti from '../../Utils/URL';
import Readmore from './Readmore';
import Utils from '../../Utils/Utils';
import WebView from 'react-native-webview';
const ScreenWidth = Dimensions.get('window').width;



  const Story = (props) => {
  const { story,dataItemm,dataIndex,onOpenn,onReadMore} = props;
  const { url, type,time,link,Poster } = story || {};
  const [didLoad, setLoad] = React.useState(false);
  let Player = React.useRef(null);
    

  React.useEffect(()=>{

    if(props.isNewStory){
if(type=="video"){

  //Player.current.seek(0)
}
    }

  },[props.isNewStory])

  
  
  if(dataItemm.type === "banner"){
    return (
      <View style={styles.container}>
        
        
        {type === 'image' ? (
       
        

       <Image  onPress={()=>{setLoad(false)}} PostImage={'https://mymiix.com/public/'+url} onProgress={()=>setLoad(true)} Videostyle={styles.content} pause={props.pause} Idd={dataItemm.Idd} userId={Utils.getUserId()} onImageLoaded={props.onImageLoaded} onVideoLoaded={props.onVideoLoaded} Poster={Poster} isNewStory={props.isNewStory} />

       
        
         
        ): type === 'video' ?  (
          
            
<Video  onPress={()=>{setLoad(false)}} PostImage={'https://mymiix.com/public/'+url} onProgress={()=>setLoad(true)} Videostyle={styles.content} pause={props.pause} Idd={dataItemm.Idd} userId={Utils.getUserId()} onVideoLoaded={props.onVideoLoaded} Poster={Poster} isNewStory={props.isNewStory} />
            
           
          ) 
          
          : type === 'post' ?  (
            
              <WebView source={{uri:url }} onLoad={()=>setLoad(false)} onLoadProgress={()=>setLoad(true)} onLoadEnd={()=>setLoad(true)}  style={{width:'100%',height:400,justifyContent:'center'}} />
            )


        :(
         
          
        

            
        
          
          
          
          
          <View style={{justifyContent:'center',width:'100%'}}>{UrlUti.OpenStorieUrl(link,url,onReadMore,props.onImageLoaded,props.onOpenn,dataItemm.Idd,dataItemm.PostId )}</View>
           
            
         
          
          
      
        )
        }
    
          
      </View>
    )
  }else{
  return (
    <View style={styles.container}>
      {/* !props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      ) */}
     

      {type === 'image' ? (
     
     <View style={styles.content}>
       
     <FastImage

     source={{uri: 'https://mymiix.com/public/'+url,priority: FastImage.priority.high,
     }}
     
     style={[styles.content]}
     resizeMode={FastImage.resizeMode.contain}

     onLoad={()=>props.onImageLoaded(15)}
     
   /> 
   </View>
      
       
      ): type === 'video' ?  (
          
          <View style={styles.content}>
           
        <Video
          source={{ uri:'https://mymiix.com/public/'+url }}
          paused={props.pause || props.isNewStory}
          playWhenInactive={false}
          ref={Player}  
          
          onLoad={(item)=>{
            props.onVideoLoaded(item.duration)
            
            Player.current.seek(0);
           
            
          }}
          
        
          
          resizeMode={'contain'}
          style={styles.content}
        />
        </View>
       
      )



      : type === 'post' ?  (
         <View style={{justifyContent:'center',flex:0.5,borderRadius:40}}> 
        <TouchableOpacity activeOpacity={1}>
        <WebView source={{uri:url }} onPress={()=>{
          setLoad(true)
          
        
        }} onLoadStart={()=>{
          setLoad(false)
          //props.onVideoLoaded('30')
        }}
        
        onLoadEnd={()=>{
          setLoad(false)
          props.onVideoLoaded('30')
        }}
        style={{width:Dimensions.get('screen').width,borderRadius:20,height:Dimensions.get('screen').height -850,backgroundColor:'transparent',justifyContent:'center'}} />
        </TouchableOpacity>
        </View>
     
    )


        : (
        
          
          <View style={style.content}>{UrlUti.OpenStorieUrl(link,url,onReadMore,props.onImageLoaded,props.onOpenn,null,null)}</View>
          
         
        )}
  
        
    </View>
  );
        }  
};

Story.propTypes = {
  story: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


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

export default Story;
