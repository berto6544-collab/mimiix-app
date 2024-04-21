import React from "react";
import {View,Text, Dimensions,Button,TouchableOpacity} from 'react-native';
import { ResizeMode,Video} from 'expo-av'
import { AuthContext } from "../../AuthContext/context";
import { Icon, Image,Slider } from "@rneui/themed";
import Cover from "./component/Cover";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";
import { MultiMedias } from "../../component/Media/Media";
import { FlashList } from "@shopify/flash-list";
import ItemList from "./component/ItemList";
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from "react-native-safe-area-context";


const adUnitId = 'ca-app-pub-6989684433220866/6848090089';

export default MediaScreen  = ({route,navigation}) =>{

    const {title,type,url} = route.params;


const [progress,setProgress] = React.useState(0)
const [durationMills,setDurationMills] = React.useState(0);
const [isPlaying,setIsPlaying] = React.useState(true)
const [isLooping,setIsLooping] = React.useState(false);
const [durationTime,setDurationTime] = React.useState('00:00');
const [show,setShow] = React.useState(false);


const Auth = React.useContext(AuthContext)

const VideoRef = React.useRef(null)



function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    if(Auth.mediaType == 'video'){
    return hours + ":" + minutes + ":" + seconds;
    }else{
    return minutes + ":" + seconds;
    }
  }

const onPlaybackStatusUpdate = async (playbackStatus) =>{


    if (!playbackStatus.isLoaded) {
        // Update your UI for the unloaded state
        if (playbackStatus.error) {
          console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
          
        }
      } else {

 
        

        

          
          
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {

            if(isLooping){
                VideoRef.current.setPositionAsync(0);
                setProgress(0);
                VideoRef.current.playAsync();
            }else{

            if(Auth.mediaDataSource.length -1 == Auth.index){
 
            }else{
                Auth.setIndex(Auth.index+1)
                VideoRef.current.setPositionAsync(0)
                setProgress(0);
                VideoRef.current.playAsync();

            }
           
          }
        }

      }


}




React.useEffect(()=>{

    navigation.setOptions({
        headerLeft:()=>(<View></View>),
        headerTitle:() => (<Text style={{fontSize:18,width:'100%',color:'white',paddingRight:70,fontWeight:'700'}}>{Auth.mediaDataSource.length == 0?title:Auth.mediaDataSource[Auth.index]?.artist?.song}</Text>),
        headerStyle: {
            backgroundColor: 'black'
          },
        headerRight: () => (
          <Button onPress={() => {
            Auth.setMediaType(null)
            Auth.setMediaDataSource([])
            Auth.setIndex(0)     
            navigation.goBack();
         
        }} title="Done" />
        ),
      });



    //function updating the position
const updatePosition =async () =>{

    
      if(VideoRef.current){
const status = await VideoRef.current.getStatusAsync();
if(status){
    setDurationMills(status.durationMillis)
    setProgress(status.positionMillis)
    setDurationTime(msToTime(status.positionMillis))
}

      }
      
    }



//if the media type is an audio then update the progress bar
    if(Auth.mediaType == 'audio'){
const interval = setInterval(updatePosition,1000);
return ()=>clearInterval(interval)
    }

},[])



if(Auth.mediaDataSource.length > 0){




  if(Auth.mediaType == "image"){
  
  
  <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,backgroundColor:'black',flex:1}}>

<MultiMedias data={Auth.mediaDataSource} navigation={navigation} />

  </View>
  
  
  }


if(Auth.mediaType == "video"){

return(
    <SafeAreaView edges={['bottom']} style={{flex:1,width:'100%',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:'black'}}>
    <Video   
   
source={{uri:Auth.mediaDataSource[Auth.index].url}}
shouldPlay={true}
resizeMode={ResizeMode.CONTAIN}
useNativeControls={true}
volume={1.0}
style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,backgroundColor:'black',flex:1}}

 
    
    
    
      />

<GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.BANNER]}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
      </SafeAreaView>
      
      )


}


else if(Auth.mediaType == "audio"){

    return(<View style={{flex:1,width:'100%',backgroundColor:'black',position:'relative',display:'flex',alignItems:'center'}}>



<Cover Auth={Auth} />





<Video    
    
source={{uri:Auth.mediaDataSource[Auth.index].url}}
shouldPlay={isPlaying}
resizeMode={ResizeMode.CONTAIN}
volume={1.0}
progressUpdateIntervalMillis={1000}
style={{width:Dimensions.get('screen').width,display:'none',height:Dimensions.get('screen').height,flex:1}}
ref={VideoRef}
isMuted={false}
isLoaded={true}
onPlaybackStatusUpdate={onPlaybackStatusUpdate}



      />

<View style={{width:Dimensions.get('screen').width,height:200,position:'absolute',bottom:0,zIndex:5,display:'flex',flexDirection:'column',alignItems:'center',padding:10}}>

<View style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
<TouchableOpacity onPress={()=>{
setIsLooping(!isLooping)


}}>
<Icon  name={'retweet'} type={'ant-design'} color={isLooping?'blue':'white'} />

</TouchableOpacity>

<TouchableOpacity onPress={()=>{

if(isLooping)return;

if(Auth.index ==0){

}

else{



Auth.setIndex(Auth.index - 1)
VideoRef.current.setPositionAsync(0) 
setProgress(0);
VideoRef.current.playAsync();
}

}}>
<Icon  name={'stepbackward'} type={'ant-design'} color={'white'} />
</TouchableOpacity>



<TouchableOpacity onPress={()=>{

setIsPlaying(!isPlaying)

if(isPlaying){
VideoRef.current.isPlaying = false;

}else{
    VideoRef.current.isPlaying = true;

}

}}>
<Icon  name={isPlaying?'pause':'play'} type={'font-awesome-5'} solid={true} size={45} color={'white'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>{

if(isLooping)return;


if(Auth.mediaDataSource.length -1 == Auth.index){


}else{


Auth.setIndex(Auth.index + 1)
VideoRef.current.setPositionAsync(0)
setProgress(0);
VideoRef.current.playAsync();
}

}}>
<Icon  name={'stepforward'} type={'ant-design'} color={'white'} />

</TouchableOpacity>

<TouchableOpacity onPress={()=>{

setShow(true)

}}>
<Icon  name={'bars'} type={'ant-design'} color={'white'} />

</TouchableOpacity>

</View>


<View style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10}}>

<Text style={{color:'white'}}>{durationTime}</Text>
<Slider
  style={{width: Dimensions.get('screen').width /1.5,position:'relative', height: 40}}
  minimumValue={0}
  maximumValue={durationMills}
  

  
  maximumTrackTintColor="white"
  minimumTrackTintColor="blue"
  value={progress}
 
  trackStyle={{backgroundColor:'blue'}}
  allowTouchTrack={true}
  thumbTouchSize={{width:2,height:4}}
  thumbStyle={{ height: 1, width: 1, backgroundColor: 'transparent' }}
  onValueChange={(e)=>{

    if(VideoRef.current){
    
    VideoRef.current.setPositionAsync(e)
    setProgress(e)
   


    }

  }}
  
/>
<Text style={{color:'white'}}>{Auth.mediaDataSource.length > 0 ?Auth.mediaDataSource[Auth.index].artist.duration:'unkown'}</Text>
</View>


<GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.BANNER]}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
</View>


<DrawerProfileDialog onshow={show} setClose={()=>{setShow(false)}} username={Auth.mediaDataSource.length>0?Auth.mediaDataSource[Auth.index].artist.song:''} title={''} profileImage={Auth.mediaDataSource.length>0?Auth.mediaDataSource[0].cover:''} userStats={durationTime}  >


<FlashList 
data={Auth.mediaDataSource}
estimatedItemSize={100}
renderItem={({item,index})=><ItemList item={item} ind={index} indexx={Auth.index} setProgress={setProgress} VideoRef={VideoRef} Auth={Auth} />}


/>



  
</DrawerProfileDialog>


    </View>)
    
}

}

else{
    return(<View style={{flex:1,backgroundColor:'black'}}></View>)
}


}