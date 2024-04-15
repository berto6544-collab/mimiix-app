import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Share,
  Platform
} from 'react-native';
import io from 'socket.io-client';
import {Icon} from '@rneui/themed';
import SocketUtils from '../../Utils/SocketUtils';
import { RTCView} from 'react-native-webrtc';
import Utils from '../../Utils/Utils';
import styles from './style/styles';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';








export default NewLiveStreamScreen = ({route,navigation}) => {

  const {streamkey,username,usersType,ProfileImage} = route.params;

  
  
    const [isSelf, setIsSelf] = React.useState(true);
    const [userType, setUserType] = React.useState(usersType);
    const [countViewer, setCountViewer] = React.useState(0);
    const [donation, setDonation] = React.useState("$0.00");
    const [otherStreams, setOtherStreams] = React.useState([]);
    const [remoteList, setRemoteList] = React.useState([]);
    const [requestList, setRequestList] = React.useState([]);
    const [requests, setRequests] = React.useState(false);
    const [selfSrc, setSelfSrc] = React.useState(null);
    const [localStream, setLocalStream] = React.useState(Utils.getLocalStream());
    const [otherViewSrc, setOtherViewSrc] = React.useState([]);
    const [countHeart, setCountHeart] = React.useState(0);
    const [listMessages, setListMessages] = React.useState([]);
    const [liveHasEnded, setLiveHasEnded] = React.useState(props.dataIstream);
    const [inRemote, setInRemote] = React.useState(false);
    const [banList, setBanList] = React.useState([]);
    const [modList, setModList] = React.useState([]);
    const [showBanList, setShowBanList] = React.useState(false);
    const [isOnBanList, setIsOnBanList] = React.useState(true);
    const [pinnedMessages, setPinnedMessages] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [muted, setMuted] = React.useState(false);
    const [heightKeyboard, setHeightKeyboard] = React.useState(820);
    const [maxUsers, setMaxUsers] = React.useState(10);
    const [viewersMute, setViewersMute] = React.useState(true);
    const [startedLive, setStartedLive] = React.useState(false);
    const [visiblePrompt, setVisiblePrompt] = React.useState(false);
    const [visibleListMessages, setVisibleListMessages] = React.useState(true);
    const [modalPaymentVisible, setModalPaymentVisible] = React.useState(false);
    const [isMessaging, setIsMessaging] = React.useState(false);
    const [isBio, setIsBio] = React.useState(false);
    const [isBioData, setIsBioData] = React.useState([]);
    const [usernamme, setUsername] = React.useState("");
    const [type, setType] = React.useState("");
    const [isLogin, setIsLogin] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isLinkTrue, setIsLinkTrue] = React.useState(false);
    const [isSent, setIsSent] = React.useState(false);
    const [isMod, setIsMod] = React.useState(false);
    const [isBanned, setIsBanned] = React.useState(false);
    const [streamerMute, setStreamerMute] = React.useState(false);    
  


  React.useEffect(() => {


    const roomName = streamkey;

    getPinnedStat();

    if(UserType == 'VIEWER'){

    //SocketUtils.join(roomName, Utils.getRandomUsername());
    }
    else{
      donated();
      
      Utils.getLocalStreamDevice(true, stream =>{

        Utils.setLocalStream(stream)
        selfView(stream.toURL())
        
       

      })

    }

    


  },[]);

 const onFinishInputRoomName = roomName => {
    
  setVisiblePrompt(false)
  setStartedLive(true)
    SocketUtils.join(streamkey, username);
    
  };

 

const onBeginLive =() =>{
  //const roomName = Utils.getRoomid();
  setVisiblePrompt(false)
  setStartedLive(true)

  SocketUtils.beginLive(streamkey, username);

 

}


const getPinnedStat = () =>{

  


  
  fetch('https://mymiix.com/public/api/UpdatePinnedLivecommenttsReactNative?streamkey='+streamkey,{
    method: 'GET',
    headers:{
      'Accept':'json/application',
      'content-type':'json/application'
    }
    
  }).then((resp) => {
  
    setTimeout(() => null, 0);  // workaround for issue-6679
    
    return resp.json();
  })
  .then((responseJSON)=> {
  

    setPinnedMessages([])
    
  
    setPinnedMessages(responseJSON);
  
 
  
    }).catch((error) =>{
        
      

    });


}


const pinnedMessagge = (index) =>{
  
  
  
  pinnedMessages.pop();
  
  
  setPinnedMessages(pinnedMessages.concat({roomId: listMessages[index].roomId, message: listMessages[index].message,displayName: listMessages[index].displayName,avatar: listMessages[index].avatar}))
       
  
  
  SocketUtils.emitPinnedComments(streamkey,{
    roomId: streamkey,
    message: listMessages[index].message,
    displayName: listMessages[index].displayName,
    avatar: listMessages[index].avatar})}


 const UnpinnedMessagge = () =>{
    
    


SocketUtils.emitPinnedComments(streamkey,null);

    setPinnedMessages([])
   
    
         }



const onRemoveRequest =(post) =>{
  
  
 var index  = requestList.findIndex(fr => fr.displayName === post.displayName)
 var indexx  = remoteList.findIndex(fr => fr.displayName === post.displayName)
 if(index == -1){
 console.log('user not found')
 }
 else{

 //requestList.concat(otherStreams);
 if(post.displayName == username){
  
  Utils.getLocalStream().getAudioTracks()[0].enabled = false;

  Utils.getLocalStream().getAudioTracks().forEach((t) => {
    if (t.kind === 'audio') {
      t.muted = !t.muted
      setMuted(t.muted)
    
    }

    Utils.getLocalStream().getVideoTracks()[0].enabled = false;
    if (t.kind === 'video') {
      t.muted = !t.muted
      setMuted(t.muted)
    
    }

})
}

setOtherStreams(otherStreams.concat(requestList[index]))
   
 



 SocketUtils.requestLive(post.roomId,post.displayName,post.profileImg,post.socketId,'close',"");
  requestList.splice(index,1)
 
 }

 if(indexx == -1)
 console.log('user not found')
 else{

  
  if(post.displayName == username){
    setMuted(false)
    Utils.getLocalStream().getAudioTracks()[0].enabled = false;
    Utils.getLocalStream().getVideoTracks()[0].enabled = false;
    
  }

  
  setOtherStreams(otherStreams.concat(remoteList[indexx]))
   

  
  SocketUtils.requestLive(post.roomId,post.displayName,post.profileImg,post.socketId,'close');
   remoteList.splice(indexx,1)

   
 }

  
  
 

}

const onRequestToAnswer =(post) =>{
  //const roomName = Utils.getRoomid();
  console.log(JSON.stringify(requestList))
  
 var index  = requestList.findIndex(fr => fr.displayName === post.displayName)
 if(index == -1){
 console.log('user not found')
 }
 else{

 //requestList.concat(otherStreams);

 setRemoteList(remoteList.concat(requestList[index]))


 SocketUtils.requestLive(post.roomId,post.displayName,post.profileImg,post.socketId,'answer',"");

  requestList.splice(index,1)
 }

  
  
 

}


const renderRemoteList = (post,index) =>{
console.log(post)
  return(<View style={{position:'relative'}}>
              
              
  <TouchableOpacity onPress={()=>{

    fetch('https://mymiix.com/public/api/userDatta?id='+post.displayName,{method:'GET'})
    .then(res=> res.json())
    .then(responseJSON =>{
      setUsername(post.displayName)
      setIsBioData(responseJSON)
      setIsBio(true)
      setInRemote(true)
     
    })
    
    

  }} key={index}>
    <View style={{alignItems:'center',flexDirection:'column'}}>
      <View style={{position:'relative'}}>
      {post.displayName != username && post.muted == false? null :  post.displayName != username && post.muted == true? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon type={'font-awesome'}  name="microphone-slash" size={20} color="black" /></View>:null}
      {post.displayName == username &&  !viewersmute ? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon name="microphone" size={20} color="black" /></View> : post.displayName == username &&  viewersmute?  <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon type={'font-awesome'}  name="microphone-slash" size={20} color="black" /></View> :null}
                    
    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: post.profileImg}} />
    </View>
    <TouchableOpacity  onPress={()=>this.onRemoveRequest(post)} style={[styles.beginLiveStreamButtton]}>
    <Text  style={styles.beginLiveStreamTextt}>Remove</Text>
    </TouchableOpacity> 

    </View>
{<RTCView  stream={post.streamObject} />}

  </TouchableOpacity>
  </View>)
}




const onRequestToBeLivve =(post) =>{
  //const roomName = Utils.getRoomid();
  console.log(JSON.stringify(otherStreams))
  

 var index  = otherStreams.findIndex(fr => fr.displayName === post.displayName)

 let item = {
  socketId: post.socketId,
  displayName: post.displayName,
  profileImg: post.profileImg,
  type: "Admin"
}
 if(index == -1){
 console.log('user not found')
 }
 else{

 //requestList.concat(otherStreams);

 setRequestList(requestList.concat(item))
 setType("Admin")


 SocketUtils.requestLive(post.roomId,post.displayName,post.profileImg,post.socketId,'request','Admin');


  otherStreams.splice(index,1)
 }

  
  
 

}


const onRequestToBeLive =(post) =>{
  //const roomName = Utils.getRoomid();
  console.log(JSON.stringify(otherStreams))
  

 var index  = otherStreams.findIndex(fr => fr.displayName === post.displayName)
let item = {
  socketId: post.socketId,
  displayName: post.displayName,
  profileImg: post.profileImg,
  type: ""
}

 if(index == -1){
 console.log('user not found')
 }
 else{



 setRequestList(requestList.concat(item))
 setType("")

 SocketUtils.requestLive(post.roomId,post.displayName,post.profileImg,post.socketId,'request',"");

  otherStreams.splice(index,1)


 }

  
  
 

}

const closeDonationForm = () => {
 setModalPaymentVisible(false)
    }



    const renderDonatedText = () => {
    
      return (
        <View style={{alignSelf: 'flex-start', marginTop: 10, marginLeft: 20}}>
          <Text style={{color: 'white'}}>
            Dontated: {Donation}
          </Text>
        </View>
      );
    };

const donated = () => {

  
  fetch("https://mymiix.com/public/api/LiveDonation?streamId="+streamkey).then((response) => response.json())
  .then((responseJson)=>{
    setDonation(responseJson[0].Total)
  
 


  }).catch(error => {

   
        
  })

}



const onFinishLive =() =>{

  setStartedLive(false)
 
SocketUtils.emitFinishbroadcast();
 

}


const onLeaveLive =() =>{
  //const roomName = Utils.getRoomid();
  
 // SocketUtils.leave(Utils.getStreamerSocketId());


 

}




  


  renderVideo = () => {
    
    if (isSelf) {
      return <RTCView zOrder={10} objectFit={'cover'} streamURL={selfViewSrc} style={styles.selfView} />;
    } else if (!isSelf) {

      return <RTCView zOrder={1} objectFit={'cover'}  streamURL={otherViewSrc} style={styles.selfView} />;
    }
  };

  onChangeMessageText = value => {
    setMessage(value);
  };

  renderWrapBottom = () => {
    
    if (Platform.OS === 'ios') {
      if(isBanned == false || userType === 'STREAMER' ){
      return (
        
          <View style={[styles.wrapBottom]}>
            <TextInput
              style={styles.textInput}
              placeholder="Comment input"
              underlineColorAndroid="transparent"
              onChangeText={this.onChangeMessageText}
              value={message}
            />
            <TouchableOpacity
              style={styles.wrapIconSend}
              onPress={this.onPressSend}
              activeOpacity={0.6}
            >
              <FastImage
                source={require('./assets/ico_send.png')}
                style={styles.iconSend}
                //tintColor={'white'}
              />
            </TouchableOpacity>
                        
                         
                    
            
            
          </View>

       
      );
          }


          else{

            return(

              <View
     style={{
      //height: keyboardHeight - 180,
      zIndex: 5,
      bottom: Dimensions.get('window').height - heightKeyboard,
      width:'100%',
      
      backgroundColor:'rgba(0,0,0,0.5)',
      justifyContent:'center'
    }}

    >
      <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>You Have been banned</Text>

    </View>
            )

          }

    } else {

      if(isBanned == false || userType === 'STREAMER' ){
      return (
       
        <KeyboardAvoidingView 
        style={[styles.wrapBotttom,{
          bottom: Dimensions.get('window').height - heightKeyboard
        }]}

        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <View
          style={[styles.wrapBotttom,{
          }]}

          >
        
          <TextInput
            style={styles.textInput}
            placeholder="Comment input"
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeMessageText}

            onFocus={() => {
              
            }}
            onEndEditing={() => {
              Keyboard.dismiss();
             
          }
}
           
            value={message}
          />
          <TouchableOpacity
            style={styles.wrapIconSend}
            onPress={this.onPressSend}
            activeOpacity={0.6}
          >
            <FastImage
              source={require('./assets/ico_send.png')}
              style={styles.iconSend}
              
            />
          </TouchableOpacity>

          {userType == "STREAMER"?

muted == true? <TouchableOpacity  onPress={()=>{

setMuted(!muted)

Utils.getLocalStream().getAudioTracks()[0].enabled = muted
SocketUtils.emitUnMute(streamkey,username)

}} style={styles.wrapIconSendd}><Icon type={'font-awesome'}  name="microphone-slash" size={16}  color="black" /></TouchableOpacity> : <TouchableOpacity  onPress={()=>{

setMuted(!muted)
Utils.getLocalStream().getAudioTracks()[0].enabled = muted
SocketUtils.emitMute(streamkey,username)


}} style={styles.wrapIconSendd}><Icon type={'font-awesome'}  name="microphone" size={20}  color="black" /></TouchableOpacity>

:<></>}
          

          {Utils.getCurrentType() != 'STREAMER' ? this.renderDonateButton() : <></>}
         
        </View>
         </KeyboardAvoidingView>
        
      );
    }

    else{

      return(

        <View
style={{
//height: keyboardHeight - 180,
zIndex: 5,
bottom: Dimensions.get('window').height - heightKeyboard,
width:'100%',

backgroundColor:'rgba(0,0,0,0.5)',
justifyContent:'center'
}}

>
<Text style={{color:'white',fontSize:20,fontWeight:'700'}}>You Have been banned</Text>

</View>
      )

    }




  }
  
  };


  

if(userType == "STREAMER")

{
  //When streaming
    return (
      <View style={[styles.container,{backgroundColor:'#1E90FF',}]}>
        
         {this.renderDonatedText()}
         
            <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>




            <View style={styles.wrapIconView}>
              <FastImage
                source={require('./assets/ico_view.png')}
                style={styles.iconView}
                tintColor={'white'}
              />
              <View style={styles.wrapTextViewer}>
                <Text style={styles.textViewer}>{countViewer}</Text>
              </View>
            </View>

           

            {startedLive == false? (<TouchableOpacity  onPress={()=>this.onBeginLive()} style={[styles.beginLiveStreamButton,{alignSelf:'flex-end'}]}>
              <Text  style={styles.beginLiveStreamText}>Start</Text>
            </TouchableOpacity>)



            :(<TouchableOpacity  onPress={()=>this.onFinishLive()} style={styles.finishLiveStreamButton}>
              <Text  style={styles.beginLiveStreamText}>Finish</Text>
            </TouchableOpacity>)}
            

            </View>
           
            <View style={{width:'100%'}}>
            <Text style={{color:'white'}}>Speakers {remoteList.length}/{maxUsers}</Text>
            <View  style={{width:'100%',flexDirection:'row'}}>
              
            <View style={{position:'relative'}}>
                    <View style={{position:'relative'}}>

                    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: ProfileImage}} />
                    {muted == true? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}}><Icon type={'font-awesome'}  name="microphone-slash" size={16}  color="black" /></View> : <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25}}><Icon type={'font-awesome'}  name="microphone" size={16}  color="black" /></View>}

                    </View>
                    <RTCView   streamURL={selfViewSrc} />

                  </View>
              
              <FlatList
              data={remoteList}
              renderItem={({item,index})=>renderRemoteList(item,index)}
              horizontal={false}
              numColumns={5}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        style={{width:'100%'}}
        
        
      

              
              />
              
            
           </View>


           {requestList.length > 0 ?
            <View style={{width:'100%'}}>
           <Text style={{color:'white'}}>Requesting To Speak</Text>
            <View style={{width:'100%',flexDirection:'row'}}>
              
            {
              
              

                <FlatList
                data={requestList}
                
                horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          numColumns={5}
          updateCellsBatchingPeriod={100}
          style={{width:'100%'}}
          
          renderItem={({item,index})=>{

                return(
                  <TouchableOpacity onPress={()=>{

                    fetch('https://mymiix.com/public/api/userDatta?id='+item.displayName,{method:'GET'})
                    .then(res=> res.json())
                    .then(responseJSON =>{
                      setIsBioData(responseJSON)
                        setUsername(item.displayName)
                        setIsBio(true)
                        setInRemote(false)
                    })
                    
                    

                  }} key={index}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                      <View style={{position:'relative'}}>
                      {item.badge != ""? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><FastImage  style={{width:20,height:20}} source={{uri: 'https://mymiix.com/public/assets/img/badge.png'}} /></View> : <></>}

                    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    </View>
                   {item.type != "Admin" ? <TouchableOpacity  onPress={()=>onRequestToAnswer(item)} style={[styles.beginLiveStreamButtton]}>
              <Text  style={styles.beginLiveStreamTextt}>Accept</Text>
            </TouchableOpacity> : null}

           
                    <TouchableOpacity  onPress={()=>onRemoveRequest(item)} style={[styles.beginLiveStreamButtton]}>
              <Text  style={styles.beginLiveStreamTextt}>Remove</Text>
            </TouchableOpacity> 
                    </View>
                

                  </TouchableOpacity>

                )



              }}
  
                
              />

            
              
            }
           </View>
           </View>
:null }


           <Text style={{color:'white'}}>Listeners</Text>
            <View horizontal={true} style={{width:'100%',flexDirection:'row'}}>
              
            {
              otherStreams.length > 0 ?
              <FlatList
                data={otherStreams}
                numColumns={5}
                horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          style={{width:'100%'}}
       
          viewabilityConfig={{
            // itemVisiblePercentThreshold: 10,
             waitForInteraction: true,
             viewAreaCoveragePercentThreshold: 95
           }}
          renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{

                    fetch('https://mymiix.com/public/api/userDatta?id='+item.displayName,{method:'GET'})
                    .then(res=> res.json())
                    .then(responseJSON =>{
                      setIsBioData(responseJSON);
                      setUsername(item.displayName);
                      setIsBio(true)
                      setInRemote(false)

                      
                    })
                    
                    

                  }} key={index}>
                    <View style={{width:50,height:50,borderRadius:50,}}>
                      <View style={{position:'relative'}}>
                      {item.badge != ""? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><FastImage  style={{width:20,height:20}} source={{uri: 'https://mymiix.com/public/assets/img/badge.png'}} /></View> : <></>}

                    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    </View>
                    </View>
                    {/*<RTCView  streamURL={post.stream} />*/}
                    <TouchableOpacity  onPress={()=>onRequestToBeLivve(item)} style={[styles.beginLiveStreamButtton]}>
              <Text  style={styles.beginLiveStreamTextt}>Request</Text>
            </TouchableOpacity> 

                  </TouchableOpacity>

                )}}
                />

              
              :null
            }
           </View>
            </View>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          
        >

          <View   style={styles.container}>
           
            
           
            
            

          
           
          
            {/*this.renderVideo()*/}
            
           

           
         
          </View>
          
          
        </TouchableWithoutFeedback>
        
        
        

        <View style={[styles.wrapBottomm]}>
            
            <TouchableOpacity
              style={[styles.wrapIconnSend,{position:'relative'}]}
              onPress={()=>{setIsMessaging(true)}}
              activeOpacity={0.6}
            >
              <FastImage
                source={require('./assets/ico_send.png')}
                style={[styles.iconSend,{position:'absolute'}]}
                
              />
              <Text style={{fontWeight:'800'}}>{formatToUnits(listMessages.length)}</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.wrapIconnSend,{position:'relative'}]}
              onPress={()=>{
               
                  setIsList(true)
                
              }}
              activeOpacity={0.6}
            >
             
              <Icon type={'font-awesome'}  name="ban" size={24} color="white" />

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.wrapIconnSend,{position:'relative'}]}
              onPress={()=>{


              }}
              activeOpacity={0.6}
            >
              <Icon type={'font-awesome'}  name="share-alt" size={24} color="white" />
            

            </TouchableOpacity>
                        
                          {usersType == "STREAMER"?

                        muted == true? <TouchableOpacity  onPress={()=>{
                      
                      setMuted(!muted)
                      Utils.getLocalStream().getAudioTracks()[0].enabled = muted
                      //Utils.getLocalStream().getVideoTracks()[0].enabled = muted;
                      
                    }} style={styles.wrapIconnSend}><Icon type={'font-awesome'}  name="microphone-slash" size={16}  color="black" /></TouchableOpacity> : <TouchableOpacity  onPress={()=>{
                      
                     setMuted(!muted)
                      Utils.getLocalStream().getAudioTracks()[0].enabled = muted
                      //Utils.getLocalStream().getVideoTracks()[0].enabled = muted;
                      
                    }} style={styles.wrapIconnSend}><Icon type={'font-awesome'}  name="microphone" size={20}  color="black" /></TouchableOpacity>
                    
                    :null}
                    
                    


            
            
            {userType != 'STREAMER' ? this.renderDonateButton() : null}
          </View>


          


        

       
       
      
      </View>
    );
            }







            else if(userType == "VIEWER"){
              //Viewers 
              return (
                <View style={[styles.container,{backgroundColor:'#1E90FF',}]}>


<View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>


            <View style={styles.wrapIconView}>
              <FastImage
                source={require('./assets/ico_view.png')}
                style={styles.iconView}
                tintColor={'white'}
              />
              <View style={styles.wrapTextViewer}>
                <Text style={styles.textViewer}>{countViewer}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=>{
                        SocketUtils.emitLeaveServer()
                        this.props.dataNav.goBack()
                        }} style={{alignSelf:'flex-end',right:20,zIndex:50}}>
                      <FastImage
                          source={''}
                          style={styles.iconVieww}
                          tintColor={'white'}
                        />
                      </TouchableOpacity>

          
            

            </View>
            <View style={{width:'100%'}}>
            <Text style={{color:'white'}}>Speakers {remoteList.length}/{maxUsers}</Text>
            
            <View horizontal={true} style={{width:'100%',flexDirection:'row'}}>
             
            {
              
              <FlatList
                data={remoteList}
                numColumns={5}
                horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          style={{width:'100%'}}
      
          viewabilityConfig={{
            // itemVisiblePercentThreshold: 10,
             waitForInteraction: true,
             viewAreaCoveragePercentThreshold: 95
           }}
          renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{
                  console.log(item.displayName)
                    fetch('https://mymiix.com/public/api/userDatta?id='+item.displayName,{method:'GET'})
                    .then(res=> res.json())
                    .then(responseJSON =>{
                      setIsBioData(responseJSON)
                        setUsername(item.displayName)
                        setIsBio(true)
                        setInRemote(true)
                    })
                    
                    

                  }} key={index}>
                    
                    {item.displayName== username? 
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{
                      
                     
                      
                    }} >
                      <View style={{position:'relative'}}>

                    <FastImage   style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    { !viewersmute ? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon type={'font-awesome'}  name="microphone" size={20} color="black" /></View> :  <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon type={'font-awesome'}  name="microphone-slash" size={20} color="black" /></View>}
                    
                    </View>
                    
                    
                    </TouchableOpacity>

                   

                    {item.displayName == username || isMod == true && item.userType != "streamer"?<TouchableOpacity  onPress={()=>this.onRemoveRequest(item)} style={[styles.beginLiveStreamButtton]}>
                     <Text  style={styles.beginLiveStreamTextt}>Remove</Text>
                    </TouchableOpacity>
                    :null}
                    </View>
                    :<View style={{flexDirection:'column',alignItems:'center'}}>
                    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    {item.muted === false? null :   <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><Icon type={'font-awesome'}  name="microphone-slash" size={20} color="black" /></View>}

                    </View>
                  
                  }
                 
                    {/*<RTCView  streamURL={item.streamObject} />*/}
                    
                  </TouchableOpacity>

                )

              }} />
              
            }
           </View>

           {requestList.length > 0 ?
            <View style={{width:'100%'}}>
           <Text style={{color:'white'}}>Requesting To Speak</Text>
            <View horizontal={true} style={{width:'100%',flexDirection:'row'}}>
              
            {
              
              <FlatList
                data={requestList}
                numColumns={5}
                horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          style={{width:'100%'}}
  
          viewabilityConfig={{
            // itemVisiblePercentThreshold: 10,
             waitForInteraction: true,
             viewAreaCoveragePercentThreshold: 95
           }}
          renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{

                    fetch('https://mymiix.com/public/api/userDatta?id='+item.displayName,{method:'GET'})
                    .then(res=> res.json())
                    .then(responseJSON =>{
                      setIsBioData(responseJSON)
                      setUsername(item.displayName)
                      setIsBio(true)
                      setInRemote(false)

                    })
                    
                    

                  }} key={index}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                      <View style={{position:'relative'}}>
                      {item.badge != ""? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><FastImage  style={{width:20,height:20}} source={{uri: 'https://mymiix.com/public/assets/img/badge.png'}} /></View> : <></>}

                    <FastImage style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    
                    </View>
                    {item.type == "Admin" && item.displayName == username || isMod == true && item.type != "Admin"? <TouchableOpacity  onPress={()=>this.onRequestToAnswer(item)} style={[styles.beginLiveStreamButtton]}>
                   <Text  style={styles.beginLiveStreamTextt}>Accept</Text>
                   </TouchableOpacity> : <></>}

                    {item.displayName == username || isMod == true && item.type != "Admin"?<TouchableOpacity  onPress={()=>this.onRemoveRequest(item)} style={[styles.beginLiveStreamButtton]}>
              <Text  style={styles.beginLiveStreamTextt}>Remove</Text>
            </TouchableOpacity>:<></>}
                    </View>
                {/*<RTCView  streamURL={post.stream} />*/}

                  </TouchableOpacity>

                )

                }} 
                />
              
            }
           </View>
           </View>
:null}



            <View style={{width:'100%'}}>
           <Text style={{color:'white'}}>Listeners</Text>
           {otherStreams.length > 0 && otherStreams.length < 40 ?
            <View horizontal={true} style={{width:'100%',flexDirection:'row'}}>
              
            {
              
              <FlatList
                data={otherStreams}
                numColumns={5}
                horizontal={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          style={{width:'100%'}}
  
          viewabilityConfig={{
            // itemVisiblePercentThreshold: 10,
             waitForInteraction: true,
             viewAreaCoveragePercentThreshold: 95
           }}
          renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{
                    
                    fetch('https://mymiix.com/public/api/userDatta?id='+item.displayName,{method:'GET'})
                    .then(res=> res.json())
                    .then(responseJSON =>{
                      
                        setIsBioData(responseJSON)
                        setUsername(item.displayName)
                        setIsBio(true)
                        setInRemote(false)
                        
                      
                    })
                    
                    

                  }} key={index}>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                      <View style={{position:'relative'}}>
                      {item.badge != ""? <View style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',padding:2,borderRadius:30, width:25,height:25,zIndex:10}} ><FastImage  style={{width:20,height:20}} source={{uri: 'https://mymiix.com/public/assets/img/badge.png'}} /></View> : <></>}

                    <FastImage  style={{width:50,height:50,borderRadius:50,}}  source={{uri: item.profileImg}} />
                    </View>
                    {item.displayName == username  && remoteList.length < maxUsers || item.displayName == username  && this.props.FollowedData !="0" && remoteList.length < maxUsers || item.displayName == username  && this.props.SubsData != "0" && remoteList.length < maxUsers ?<TouchableOpacity  onPress={()=>this.onRequestToBeLive(item)} style={[styles.beginLiveStreamButtton]}>
                    <Text  style={styles.beginLiveStreamTextt}>Request</Text>
                  </TouchableOpacity>
          :null 
          }
                    </View>
                {/*<RTCView  streamURL={JSON.parse(item.stream)} />*/}

                  </TouchableOpacity>

                )

        }} 
        />
              
            }
           </View>
            :null}
           </View>

           
            </View>

                  
                  
                  
                  

                 


                  
                


       



{liveHasEnded? 
<View style={{width:'80%',height:'80%',alignItems:'center',flexDirection:'column',justifyContent:'center',alignSelf:'center',position:'absolute',zIndex:0,padding:50}}>


<Text style={{fontSize:20,color:'white',}}>Speaker Has Ended</Text>


</View> : null}


{isBanned? 
<View style={{width:'80%',height:'80%',alignItems:'center',flexDirection:'column',justifyContent:'center',alignSelf:'center',position:'absolute',zIndex:0,padding:50}}>


<Text style={{fontSize:20,color:'white',}}>You Have been Banned</Text>


</View> : null}

<FastImage tintColor={'white'} style={{width:200,height:30,position:'absolute',top:0,left:-50}} source={{uri:'https://mymiix.com/public/assets/img/mymiix-dark.png'}} />

                </View>
              );

            }
  
}






function formatToUnits(value, fixed) {
  if (value >= 1100000){
    return (value / 1000000).toFixed(fixed) + 'M'
  }
if (value >= 1000000){
    return (value / 1000000).toFixed(0) + 'M'
}
if (value >= 100000){
    return (value / 1000).toFixed(0) + 'K'
}
if (value >= 10000)
{
    return (value / 1000).toFixed(0) + 'K'
}
if (value >= 1100)
{
    return (value / 1000).toFixed(fixed) + 'K'
}
if (value >= 1000)
{
    return (value / 1000).toFixed(0) + 'K'
}
return value

}