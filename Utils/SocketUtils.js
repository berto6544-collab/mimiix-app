import io from 'socket.io-client';
import Utils from './Utils';
import AuthUtils from './AuthUtils';
import Peer from 'react-native-peerjs';
let socket = null;
let friends = [];
let listServer = [];
let peers = {};
const getSocket = () => {
  return socket;
};

const getListServer = () => {
  return listServer;
};

const emitListServer = () => {
  socket.emit('list-server', {}, responseListServer => {
    console.log('list-server', responseListServer);
    Utils.getListContainer().setState({ listServer: responseListServer });
  });
};


const connect = () => {
  socket = io.connect('https://mymiix.com:49844',{ forceNode:true});
};





const emitJoinRoomPeer = (roomId,userId,profileImg,badge) =>{

  peerServer = new Peer(userId,{
secure:true,
port:49844,
host:'mymiix.com',
path:'/',
config: { 'iceServers': [
{ 'urls': 'stun:stun.l.google.com:19302'}

],}
    
  });
  
   

 
  
   
    // Got stream!
    
    if (Utils.getCurrentType() === 'STREAMER') {
      Utils.getLocalStream().getAudioTracks()[0].enabled = true;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
      
    }
    if (Utils.getCurrentType() === 'VIEWER') {
      console.log('Localstream: ',Utils.getLocalStream());
      Utils.getLocalStream().getAudioTracks()[0].enabled = false;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
      
    }
   
    
    
    
    
  



   socket.emit('join-room',{roomId,userId,userName: Utils.getUserNameId(), profileImg,stream:Utils.getLocalStream(),badge})


    
      //open peerjs 
   peerServer.on('open',(userId) => {
    //send join-room through socket.io
    
 console.log('peer Server Open');

  })


    //peerjs getuser connected to server
    socket.on('user-connected', (data) =>{
      
      const {roomId,userId,userName,profileImg,participant,admin} = data;

      //connect to new user and stream media
      connectToNewUser(userId,userName,profileImg,Utils.getLocalStream(),peerServer,participant,admin);
      console.log('userConnected');
     
      
     // profileIm = profileImg;

      

    })



    


  socket.on('user-connectedd',data =>{

      const {participant,userId,admin,profileImg,broadcasters,requesting} = data;
      
      


//call user
peerServer.on('call', (call) => {

      
  console.log('called');

  //answer user 
  call.answer(Utils.getLocalStream());

 

  //get stream of user
  call.on('stream',(userstream)=> {
  console.log(JSON.stringify(userstream))
    const listMessagesss = Utils.getContainer().state.otherStreams;
    const newListMessage = listMessagesss.concat(participant)

   //var filter = participant.filter((fil) => fil.profileImg !== Utils.getUserProfile());
   var filter = participant.sort(function(x,y){ return x.userId == userId ? -1 : y.userId == userId ? 1 : 0; });


   
    if(userstream){


      

    
      Utils.getContainer().setState({
        // otherViewSrc: userstream.toURL(),
        remoteList: broadcasters,
        requestList:requesting,
        remoteStream:Utils.getContainer().state.remoteStream.concat(userstream),
        otherStreams: filter,
    
        })
    


        console.log('UserStream  remote array',Utils.getContainer().state.remoteVideoStream)

    }
    
    
       

  



  })
  
 



  peers[userId] = call;

  })

      
    
    
    
       })





       


    
      
      peerServer.on('error',console.log)
    
 

  


   
 

  



  
}








function connectToNewUser(userId,userName,profileImg,stream,peer,participant,admin) {
  //peerServer = new Peer(userId);
  
  //call new user and send userId and stream

 
 var call = peer.call(userId,stream);
 

 

 //call stream and grab remotestream
call.on('stream', (remoteVideoStream) => {

  
console.log('Logged participant',participant)
if(remoteVideoStream){
  

    
item = {
  "badge": participant.badge,
  "displayName": participant.displayName,
  "muted":participant.muted,
  "profileImg":participant.profileImg,
  "socketId":participant.socketId,
  "stream":remoteVideoStream,
  "streamObject":remoteVideoStream,
  "userId":participant.userId,
  "userType":participant.userType



}
  




    Utils.getContainer().setState({
      otherViewSrc: remoteVideoStream.toURL(),
      remoteStream:Utils.getContainer().state.remoteStream.concat(remoteVideoStream),
      otherStreams: Utils.getContainer().state.otherStreams.concat(item)
    
     })


  






  //const newListMessagesss = listMessagesss.slice();

 

  
   }


   

    })

    peers[userId] = call;

  }

    


  const requestClient = () =>{

    socket.on('request-client',(data)=>{
      const {roomId,displayName,profileImg,socketId,status,type} = data;

      console.log(data);

      if(type == "Admin"){
        Utils.getContainer().setState({
          type:'Admin'
        })
      }else{
        Utils.getContainer().setState({
          type:""
        })

      }

      
      //request to Unite with broadcasters 
      if(status == "request"){
       var index = Utils.getContainer().state.otherStreams.findIndex((fr)=> fr.displayName === displayName);
       
       let item ={
        socketId,
        displayName,
        profileImg,
        type:data.type
      }

       if(index == -1)
       console.log('user not found')
       else{
        Utils.getContainer().setState({
          requestList: Utils.getContainer().state.requestList.concat(item),
          type:data.type
        })

        
        Utils.getContainer().state.otherStreams.splice(index,1)

        Utils.getContainer().setState({
        otherStreams: Utils.getContainer().state.otherStreams,
        type:data.type        
        })
       
       }
        
      }



//answer to Unite with broadcasters 
if (status == "answer"){

  var index = Utils.getContainer().state.requestList.findIndex((fr)=> fr.displayName === displayName);

  let item ={
    socketId,
    displayName,
    profileImg,
    type:""
  }

  if(index == -1)
  console.log('user not found')
  else{

   Utils.getContainer().setState({
     remoteList: Utils.getContainer().state.remoteList.concat(item),
    type:data.type
   })
  
   Utils.getContainer().state.requestList.splice(index,1);
   Utils.getContainer().setState({
   requestList: Utils.getContainer().state.requestList,
   type:data.type
  
  })
   
  }

}

// close audio connection with broadcaster 
if (status == "close"){

  var index = Utils.getContainer().state.remoteList.findIndex((fr)=> fr.displayName === displayName);
  var indexx = Utils.getContainer().state.requestList.findIndex((fr)=> fr.displayName === displayName);

  let item ={
    socketId,
    displayName,
    profileImg,
    type:""
  }

  if(index == -1)
  console.log('user not found');
  else{
   Utils.getContainer().setState({
     otherStreams: Utils.getContainer().state.otherStreams.concat(item),
     type

   })
   
   if(displayName == Utils.getUserNameId()){
    Utils.getContainer().setState({
      type,
    muted:false
  })
  Utils.getLocalStream().getAudioTracks()[0].enabled = false;
  Utils.getLocalStream().getVideoTracks()[0].enabled = false;
}

   Utils.getContainer().state.remoteList.splice(index,1)

   Utils.getContainer().setState({
    otherStreams: Utils.getContainer().state.otherStreams,
    type
   })
   
  }

  if(indexx == -1)
  console.log('user not found');
  else{
    Utils.getContainer().setState({
      otherStreams: Utils.getContainer().state.otherStreams.concat(Utils.getContainer().state.requestList[indexx]),
      type
    })
    
    if(displayName == Utils.getUserNameId()){
      Utils.getContainer().setState({
      type,
      muted:false
    })
    Utils.getLocalStream().getAudioTracks()[0].enabled = false;
    Utils.getLocalStream().getVideoTracks()[0].enabled = false;
  }

    Utils.getContainer().state.requestList.splice(indexx,1)
    
   Utils.getContainer().setState({
    otherStreams: Utils.getContainer().state.otherStreams,
    type
   })
   }


  

}




    })

  }
    

  // emit request to Unite 
  const requestLive = (roomId,displayName,profileImg,socketId,status,type) =>{
    socket.emit('requesting-live',
    { 
      roomId:Utils.getStreamKey(), 
      displayName,
      profileImg,
      socketId,
      status,
      type
  
    },data  => {
     
      console.log('request-client', data);

      
        

if(data.status == "close"){

 var index = Utils.getContainer().state.remoteList.findIndex((fr)=> fr.displayName === Utils.getUserNameId());
  var indexx = Utils.getContainer().state.requestList.findIndex((fr)=> fr.displayName === Utils.getUserNameId());


  if(index == -1){}
  else{


    if(displayName == Utils.getUserNameId()){
        Utils.getContainer().setState({
        
        muted:false,
        
      })
      Utils.getLocalStream().getAudioTracks()[0].enabled = false;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
    }
     
    }

    if(indexx == -1){}
    else{
      if(displayName == Utils.getUserNameId()){
        Utils.getContainer().setState({
        
        muted:false,
        
      })
      Utils.getLocalStream().getAudioTracks()[0].enabled = false;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
    }
      }
    
    
    }



    })
  
  
  }







//begin broadcast stream
const beginLive = (roomId,displayName) =>{
  socket.emit('begin-live',
  { 
    roomId, 
    displayName: Utils.getUserNameId(),
    profileImg: Utils.getUserProfile(),
    stream: Utils.getLocalStream()

  },data  => {
   
    console.log('begin-live', data);
  
 
   
  })
  emitJoinRoomPeer(Utils.getStreamKey(),AuthUtils.getUserData()[0].UserId,Utils.getUserProfile())


  fetch('https://www.mymiix.com/public/api/postLiveReact?id='+AuthUtils.getUserData()[0].UserId+'&status=LiveP2P',{
    method:'POST',
    headers:{
      'Accept-application': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({"streamkey": Utils.getMyStreamKey()})
  }).then(response => response.json)
  .then(responseJSON => {
  
  console.log(responseJSON[0].Success);
  
  });
  
  
    
  


}


//join broadcasters stream 
const join = (roomId, displayName,badge) => {

  socket.emit('join-server',
  { 
    roomId, 
    displayName: Utils.getUserNameId(),
    profileImg: Utils.getUserProfile(),
    stream: Utils.getLocalStream(),
    badge

  },data  => {
   
    console.log('join-serverrr', data);
  
   
  })
  emitJoinRoomPeer(Utils.getStreamKey(),AuthUtils.getUserData()[0].UserId,Utils.getUserProfile(),badge)
};


const emitFinishbroadcast = ()=>{

  socket.emit('finish-live',{
    roomId: Utils.getStreamKey(),
    userId: Utils.getSSUSERID(),
    displayName: Utils.getUserNameId(),
    socketId: Utils.getStreamerSocketId(),
    profileImg: Utils.getUserProfile(),
    status: Utils.getUserName()+' has ended their broadcast',
    

  })

} 


const emitPinnedComments = async(
  roomId,
  pinnedData

  
) => {


  
  socket.emit('PinnedComments', {
    roomId: Utils.getStreamKey(),
    pinnedData
  });


};

const handlePinnedComments = () => {
  socket.on('PinnedComments', (data) => {
    const {roomId, pinnedData} = data;

    Utils.getContainer().state.pinnedMessages.pop();

    if(pinnedData != null){    
      Utils.getContainer().setState({pinnedMessages:  Utils.getContainer().state.pinnedMessages.concat(pinnedData),
      
    
    
    });

  }else{
    Utils.getContainer().setState({pinnedMessages:[]});

  }
  });
};


const handleJoinClientPinnedComments = () => {
  
  socket.on('PinnedClientJoinedComments', (data) => {
    const {roomId, pinnedData} = data;

    Utils.getContainer().state.pinnedMessages.pop();

    if(pinnedData != null){    
      Utils.getContainer().setState({pinnedMessages:  Utils.getContainer().state.pinnedMessages.concat(pinnedData),
      
    
    
    });

  }else{
    Utils.getContainer().setState({pinnedMessages:[]});

  }
  });
};


const handleOnLeaveall = (data) =>{
socket.on('leaveall-client',(data)=>{

  if(peers[AuthUtils.getUserData()[0].UserId]) peers[AuthUtils.getUserData()[0].UserId].close();

  peers = {};
  Utils.getContainer().setState({
remoteList:[],
requestList:[],
otherStreams:[],
countViewer:0,
LiveHasEnded: true

  })




  


})


}



const handleOnLeave = () => {
  socket.on('leavve-client', data => {
const {socketId,profileImg,count} = data;
var index = Utils.getContainer().state.remoteList.findIndex((fa)=> {return fa.socketId === socketId});
  
var indexx = Utils.getContainer().state.otherStreams.findIndex((fa)=>{return fa.socketId === socketId})   



if(index == -1)
  console.log('user not found')
else
Utils.getContainer().state.remoteList.splice(index,1);



if(indexx == -1)
console.log('user not found')
else
Utils.getContainer().state.otherStreams.splice(indexx,1);



    leave(socketId);
    
  });
};

const handleOnConnect = () => {
  socket.on('connect', data => {
    console.log('connect');
    Utils.getLocalStreamDevice(true, stream => {
      Utils.setLocalStream(stream);
    });
  });
};

const emitExchangeServerSdp = (to, sdp,roomId) => {
  socket.emit('exchange-server', {
    to,
    sdp,
    roomId
  });
};

const emitExchangeServerCandidate = (to, candidate) => {
  socket.emit('exchange-server', {
    to,
    candidate,
    roomId: Utils.getStreamKey(),
  });
};

const emitLeaveServer = () =>{
socket.emit('leave-server',{roomId: Utils.getStreamKey(),userId:AuthUtils.getUserData()[0].UserId,profileImg: Utils.getUserProfile(),displayName:Utils.getUserNameId()})




}

const handleOnJoinClient = () => {
  socket.on('join-client', friend => {
    

    
    
    Utils.getContainer().setState({
      countViewer: friend.count
    });

    
    friends.push(friend.participant);

    console.log('join-server', friend);

    
    

   
    if (friend.participant.displayName == Utils.getUserNameId()) 
    {
      const friendd = friend.participant;
      const socketId = friendd.socketId;
      Utils.setStreamerSocketId(socketId);
      
      

  
      //PeerConnectionUtils.createPC(socketId, true);


      
if(Utils.getCurrentType() === "VIEWER"){
      Utils.getContainer().setState({
       //otherViewSrc: friend.admin[0].stream
      });



    }
    
    }



  });
};


const handleOnAdminMute = () => {
socket.on('remove-broadcaster',data=>{

  Utils.getLocalStream().getAudioTracks()[0].enabled = false;
  Utils.getLocalStream().getVideoTracks()[0].enabled = false;
  Utils.getContainer().setState({
    viewersmute: true,
  })
})

}





const handleDisconnect = () =>{
  socket.on('user-disconnected', (data)=>{

    const {userId} = data;
    
    if(peers[userId]) peers[userId].close();
    
    
    
    
    
    
    
    })


}
const emitSendMessage = (roomId, displayName, message,avatar) => {
  socket.emit(
    'send-message',
    {
      roomId,
      displayName,
      message,
      avatar
    },
    data => {}
  );
};

const handleOnMessage = () => {
  socket.on('send-message', data => {
    if (data.message === '#<3') {
      const { countHeart } = Utils.getContainer().state;
      Utils.getContainer().setState({ countHeart: countHeart + 1 });
    } else {
      const { listMessages } = Utils.getContainer().state;
    
      const newListMessages = listMessages.slice();
      newListMessages.push(data);
      Utils.getContainer().setState({ listMessages: newListMessages });
    }
  });
};


const EmitBanList = (userId,roomName,userName,userProfile) => {

  
  socket.emit('Push-To-Ban-List', {userId,roomName,userName,userProfile});

};

const EmitUnBanList = (userId,roomName,userName,userProfile) => {

  
  socket.emit('UnBan-List', {userId,roomName,userName,userProfile});

};

const handleBanList = () => {

  
  socket.on('bannedListItems', (datta) => {
    const {data} = datta;
   
    
   Utils.getContainer().setState({
     banList:data
   })
  console.log(data)

   
      
    
  });

};



const handleModListClient = () => {
  socket.on('modList-client',(data)=>{
    const {mod} = data;


    
 


 Utils.getContainer().setState({
   
  isMod: mod
 });

  })
  
 };

 
 const handleModList = () => {
  socket.on('modListItems',(datta)=>{
    const {data} = datta;


  

 Utils.getContainer().setState({modList: data});

  })
  
 };

const emitUnMod = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'UnMod-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  //console.log('Unmod');
  
  
  });
 };



 const emitUnMute = (roomName,userName) => {
  socket.emit(
  'UN_Mute',
  {
  roomId:roomName,
  displayName: userName,
  },
  () => {
  //console.log('Unmod');

  let allItems = Utils.getContainer().state.remoteList;
  let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == userName);

 if(index == -1){
   
 }
 else{
 allItems[index] = {...allItems[index],muted:false};
  Utils.getContainer().setState({
    remoteList:allItems
  })

  

}
  
  });
 };


 const handleUnMute = () => {
  socket.on('UN_Mute',(data) => {
 
 const { roomId,displayName} = data

 let allItems = Utils.getContainer().state.remoteList;
 let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == displayName);

 if(index == -1){

 }
 else{
  
  allItems[index] = {...allItems[index],muted:false};
  Utils.getContainer().setState({
    remoteList:allItems
  })

}
  
  
  });
 };


 const emitMute = (roomName,userName) => {
  socket.emit(
  'Mute',
  {
  roomId:roomName,
  displayName: userName,
  },
  (data) => {
  //console.log('Unmod');
  let allItems = Utils.getContainer().state.remoteList;
  let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == userName);

 if(index == -1){

 }
 else{
 
  

  
  allItems[index] = {...allItems[index],muted:true};
  Utils.getContainer().setState({
    remoteList:allItems
  })

}

  },
  );
 };



 const emitStreamMute = (roomName,userName,userId,isMuted) => {
  socket.emit(
  'Stream_Mute',
  {
  roomId:roomName,
  displayName: userName,
  userId,
  isMuted
  },
  (data) => {
  //console.log('Unmod');
  let allItems = Utils.getContainer().state.remoteList;
  let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == userName);

 if(index == -1){

 }
 else{
 
  

  
  allItems[index] = {...allItems[index],muted:true};
  Utils.getContainer().setState({
    remoteList:allItems
  })

}

  },
  );
 };



 const handleStreamMute = () => {
  socket.on('Stream_Mute', (data) => {
 
 const { roomId,displayName} = data
 let allItems = Utils.getContainer().state.remoteList;
 let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == displayName);


 if(index == -1){

 }
 else{

  
  Utils.getLocalStream().getAudioTracks()[0].enabled = false;
  
  allItems[index] = {...allItems[index],muted:true};
  Utils.getContainer().setState({
    remoteList:allItems,
    streamerMuted:data.isMuted,
    viewersmute: true,
  })

}
  
  
  });
 };


 const handleMute = () => {
  socket.on('Mute', (data) => {
 
 const { roomId,displayName} = data
 let allItems = Utils.getContainer().state.remoteList;
 let index = Utils.getContainer().state.remoteList.findIndex((m)=>m.displayName == displayName);

 if(index == -1){

 }
 else{

  

  
  allItems[index] = {...allItems[index],muted:true};
  Utils.getContainer().setState({
    remoteList:allItems
  })

}
  
  
  });
 };

const handleBanClientList = () => {

  
  socket.on('bannedList-client', (datta) => {
   
   
    
if(datta.banned == true){
   Utils.getContainer().setState({
     isBanned:true
   })
  }else{
    Utils.getContainer().setState({
      isBanned:false
    })
  }
  //console.log(data)

   
      
    
  });

};



const emitPushToMod = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'Push-To-Mod-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  //console.log('push to Mod list');
  

  },
  );
 };


const SocketUtils = {
  getSocket,
  connect,
  join,
  leave,
  handleOnConnect,
  handleOnExchange,
  handleOnLeave,
  handleOnJoinClient,
  handleOnLeaveClient,
  handleDisconnect,
  emitExchangeServerSdp,
  emitExchangeServerCandidate,
  emitListServer,
  getListServer,
  handleOnMessage,
  handleOnLeaveClientt,
  emitLeaveServer,
  emitSendMessage,
  beginLive,
  requestLive,
  handleOnAdminMute,
  emitFinishbroadcast,
  handleOnLeaveall,
  requestClient,
  emitPinnedComments,
  handlePinnedComments,
  handleJoinClientPinnedComments,
  handleBanList,
  EmitBanList,
  handleBanClientList,
  EmitUnBanList,
  emitUnMod,
  handleModList,
  handleModListClient,
  emitPushToMod,
  emitMute,
  handleMute,
  emitUnMute,
  handleUnMute,
  handleStreamMute,
  emitStreamMute, 
  emitJoinRoomPeer
};
export default SocketUtils;
