import React, { useState,useRef } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  View
} from 'react-native';
import WebView from 'react-native-webview';
import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';
import { concat } from 'react-native-reanimated';
import { AuthContext } from '../../AuthContext/context';


const SCREEN_WIDTH = Dimensions.get('window').width;

const StoryContainer = (props) => {
  const { user,userId,RetrieveData,dataItem} = props;
  const { stories = [] } = user || {};
  const [currentIndex, setCurrentIndex] = useState(0) || userId;
  const [isModelOpen, setModel] = useState(false);
  const [isModelEditOpen, setEditModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const setRefPlayer = useRef();
  const [duration, setDuration] = useState(3);
  const [durationConst, setDurationConst] = useState(3);
  
  const story = stories.length ? stories[currentIndex] : {};
  const { isReadMore, url } = story || {};
  const Auth = React.useContext(AuthContext)
  let storedObject = {};
  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  React.useEffect(() => {

   
   

  },[])


  const changeStory = (evt) => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }


    
  };

  const nextStory = async() => {
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(10);

     
      
    
     
    
    } else {
      
      setCurrentIndex(0);
      props.onStoryNext();

      
     
     
      
    }
 

    
    if(currentIndex == stories.length - 1){
      

      let countries = await AsyncStorage.getItem('stories-seenItems');
     
      storedObject = JSON.parse(countries);
     
     
     storedObject[user.username] = true;
     
     storedObject[user.username+'-Date'] = stories[stories.length-1].time;
     
 
     AsyncStorage.mergeItem('stories-seenItems',JSON.stringify(storedObject));
 console.log(stories[stories.length-1].time);
     //RetrieveData();
 
     }
    
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(15);
      
     
       

    
  //setRefPlayer.current.seek(0);


    } else {
     
      
      setCurrentIndex(0);
      props.onStoryPrevious();
     
      
      
    }
  };

  const onImageLoaded = async(length) => {
   
    setDuration(8);
    setDurationConst(8)
    setLoaded(true);
    

  };

  const onVideoLoaded = async(length) => {
    
    setDuration(length);
    setDurationConst(length)
    setLoaded(true);
   
   

  };


 
  const onPause = (result) => {
    setIsPause(result);
    
  };


  const onPausing = (result) => {
    if(result == true){
    setIsPause(result);
    setDuration(0);

    }else{
      setIsPause(result);
      setDuration(durationConst);
    }

    
  };

  const onOpen = () => {
    setIsPause(true);
    
  };

  const onReadMoreOpen = () => {
    setIsPause(true);
 
    setDuration(0);
    
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);

    setModel(false);
   
    setDuration(durationConst);
  };


  
  const onEditOpen = () => {
    setIsPause(true);
 
    setDuration(0);
    
    setEditModel(true);
  };
  const onEditClose = () => {
    setIsPause(false);

    setEditModel(false);
   
    setDuration(durationConst);
  };

  const loading = () => {
    if (!isLoaded) {
      

      
      return (
        <View style={styles.loading}>
          <View style={{ width: '100%', height: '100%' }}>
            <Story dataItemm={dataItem}   dataS={props.dataS} onSetDuration={setDuration} onImageLoaded={onImageLoaded} onPausing={onPausing} onReadMore={onReadMoreOpen}  onOpenn={onOpen} pause onVideoLoaded={onVideoLoaded} story={story} />
          </View>
          {<ActivityIndicator color="white" />}
        </View>
      );
    }

    
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      onReadMoreOpen();
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={e => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <View  style={styles.container}>
          
          <Story dataS={props.dataS} onSetDuration={setDuration} onImageLoaded={onImageLoaded} onPausing={onPausing} onOpenn={onOpen} onReadMore={onReadMoreOpen} dataItemm={dataItem} dataIndex={currentIndex} pause={isPause} isNewStory={props.isNewStory} onVideoLoaded={onVideoLoaded} story={story} />

          {loading()}

          <UserView   name={user.username} isUser={Auth.Authuser.length > 0? Auth.Authuser[0].UserName == user.username :false } dataS={props.dataS} onEditOpen={onEditOpen} onPause={onPause} story={story} time={user.time} profile={user.profile} onClosePress={props.onClose} />

          {isReadMore && stories[currentIndex].linkText != "" ? <Readmore linkText={stories[currentIndex].linkText} onReadMore={onReadMoreOpen} />:null}

          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={isPause? 0 : duration}
            pause={isPause}
            navigation={props.dataS} 
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{ id: currentIndex }}
          />
        </View>

       

      </TouchableOpacity>
      <Modal style={styles.modal} position="bottom" swipeToClose={false}  isOpen={isModelOpen} onClosed={onReadMoreClose}>
          <View style={styles.bar} />
          <WebView allowsInlineMediaPlayback={true} sharedCookiesEnabled={true} javaScriptEnabled={true}  source={{ uri: stories[currentIndex].link }} />
        </Modal>
        <Modal style={styles.modal} position="bottom" swipeToClose={false}  isOpen={isModelEditOpen} onClosed={onEditClose}>
          <TouchableOpacity onPress={onEditClose} style={styles.bar} />
          <WebView 
          allowsInlineMediaPlayback={true} 
          onMessage={(event)=>{
            let responseJson = JSON.parse(event.nativeEvent.data)
            console.log(responseJson)
           props.AllStoriess[props.dataIndex].stories[currentIndex] = responseJson[0];
           props.setAllStories(...[props.AllStoriess])

           onEditClose();
          }}
          sharedCookiesEnabled={true} 
          thirdPartyCookiesEnabled={true}  
          javaScriptEnabled={true}  
          source={{ uri: 'https://mymiix.com/edit/storie/'+stories[currentIndex].idd }} />

          {/*<Story dataS={props.dataS}   onImageLoaded={onImageLoaded} onOpenn={onOpen} onReadMore={onReadMoreOpen} dataItemm={dataItem} dataIndex={currentIndex} pause={isPause} isNewStory={props.isNewStory} onVideoLoaded={onVideoLoaded} story={story} />*/}
        </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingTop: 30,
    backgroundColor: 'red',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: { width: '100%',
    height: '100%',
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 80,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
    marginBottom:6
  },
});

export default StoryContainer;
