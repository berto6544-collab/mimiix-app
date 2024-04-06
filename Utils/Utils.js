
import {AsyncStorage} from 'react-native';

let userType = null;
let container = null;
let postContainer  = null;
let storieContainer = null;
let userId = null;
let roomName = null;
let userName = null;
let userProfile = '';
let streamKey = null;
let OtherUserId = null;
let timeOutMessages = [];
let usersNameId = null;
let myStreamKey = null;
let streameruserId = null;
let userTypeStream = null;
let pushToken = null;
let remoteStream = {toURL: () => null};
let themeMode = 'light';
let socketActive = false;
let userStreamIstrue = false;
let isRequested = "";
let postData = [];
let UserIddd = null;
let token = null;
let SSID = null;
let SSUSERID = null;
let TrendContainer = null;
let MessageContainer = null;
let RemoveMessageContainer = null;
let StatusType= "";

let StreamId= null;
let userPlan= "";
/**
 * CHANGE THIS ---------------------------------
 */
const socketIOIP = 'https://mymiix.com:49263/';
const websocketIOIP = new WebSocket('ws://mymiix.com:49632');
const  API_URI_Peer = 'https://mymiix.com:49854/';
//const socketIOIP = 'https://glacial-island-40327.herokuapp.com:443/';
const rtmpPath = 'rtmp://mymiix.com:53253/live/';

/**
 *----------------------------------------------
 */



const getSocketIOIP = () => {
  return socketIOIP;
};

const getSocketPeerIOIP = () => {
  return API_URI_Peer;
};


const getWebSocketIOIP = () => {
  return websocketIOIP;
};

const getRtmpPath = () => {
  return rtmpPath;
};




const clearTimeOutMessages = () => {
  for (let i = 0; i < Utils.getTimeOutMessages().length; i += 1) {
    clearTimeout(Utils.getTimeOutMessages()[i]);
  }
  timeOutMessages = [];
};

const getTimeOutMessages = () => {
  return timeOutMessages;
};

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = () => {
  return container;
};
const getStorieContainer = () => {
  return storieContainer;
};
const setStorieContainer = (con) => {
  storieContainer = con;
};
const getTrendContainer = () => {
  return TrendContainer;
};
const setTrendContainer = (con) => {
   TrendContainer = con;
};

const getMessageContainer = () => {
  return MessageContainer;
};
const setRemoveMessageContainer = (con) => {
  RemoveMessageContainer = con;
};


const getRemoveMessageContainer = () => {
  return RemoveMessageContainer;
};
const setMessageContainer = (con) => {
   MessageContainer = con;
};

const setPostContainer = con => {
  container = con;
};

const getPostContainer = () => {
  return container;
};

const setToken = con => {
  token = con;
};

const getToken = () => {
  return token;
};

const setUserPlan = con => {
  userPlan = con;
};

const getUserPlan = () => {
  return userPlan;
};


const setStreamId = con => {
  StreamId = con;
};

const getStreamId= () => {
  return StreamId;
};

const setSSIDToken = con => {
  SSID = con;
};

const getSSIDToken = () => {
  return SSID;
};


const setSSUSERID = con => {
  SSUSERID = con;
};

const getSSUSERID = () => {
  return SSUSERID;
};

const setStatusType = con => {
  StatusType= con;
};

const getStatusType = () => {
  return StatusType;
};

const setContainer = con => {
  container = con;
};

const setUserType = type => {
  userType = type;
};



const getUserType = () => {
  return userType;
};


const setUserIddd = type => {
  UserIddd = type;
};



const getUserIddd = () => {
  return UserIddd;
};


const setThemeMode = type => {
  themeMode = type;
};



const getThemeMode = () => {

  
  
  return themeMode;
};

const setUserTypeStream = type => {
  userTypeStream = type;
};



const getUserTypeStream = () => {
  return userTypeStream;
};


const setUserStreamIsTrue = type => {
  userStreamIsTrue = type;
};



const getUserStreamIsTrue = () => {
  return userStreamIsTrue
};

const setUserId = id => {
  userId = id;
};


const getUserId = () => {
  return userId;
};


const setPostData = id => {
  postData.push(id);
};


const getPostData = () => {
  return postData;
};

const setRemoteStream = id => {
  remoteStream = id;
};

const getRemoteStream = () => {
  return remoteStream;
};

const setSocket = id => {
  socketActive = id;
};

const getSocket = () => {
  return socketActive;
};

const setPushToken = id => {
  pushToken = id;
};

const getPushToken = () => {
  return pushToken;
};

const setOtherUserId = id => {
  OtherUserId = id;
};

const getOtherUserId = () => {
  return OtherUserId;
};

const setIsRequested = id => {
  isRequested = id;
};

const getIsRequested = () => {
  return isRequested;
};

const setStreamerUserId = id => {
  streameruserId = id;
};

const getStreamerUserId = () => {
  return streameruserId;
};

const setUserName = id => {
  userName = id;
};
const setUserNameId = id => {
  usersNameId = id;
};

const getUserName = () => {
  return userName;
};
const getUserNameId = () => {
  return usersNameId;
};
const setUserProfile = id => {
  userProfile = id;
};

const getUserProfile = () => {
  return userProfile;
};
const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};

const setStreamKey = Key => {
  streamKey = Key;
};

const getStreamKey = () => {
  return streamKey;
};

const setMyStreamKey = Key => {
  myStreamKey = Key;
};

const getMyStreamKey = () => {
  return myStreamKey;
};

function hex2bin(input) {
  return decodeURIComponent(input.replace(/(.{1,2})/g, "%$1"));
}





const Utils = {
  isNullOrUndefined,
  getWebSocketIOIP,
  getUserType,
  setUserType,
  getContainer,
  setContainer,
  getStorieContainer,
  setStorieContainer,
  setPostContainer,
  getPostContainer,
  getUserId,
  setUserId,
  setSocket,
  getSocket,
  getRoomName,
  getSocketPeerIOIP,
  setRoomName,
  setUserName,
  getUserName,
  setUserNameId,
  getUserNameId,
  setUserProfile,
  getUserProfile,
  setStreamKey,
  getStreamKey,
  setIsRequested,
  getIsRequested,
  setStreamerUserId,
  getStreamerUserId,
  setOtherUserId,
  getOtherUserId,
  setMyStreamKey,
  getMyStreamKey,
  setRemoteStream,
  getRemoteStream,
  setPushToken,
  getPushToken,
  setPostData,
  getPostData,
  setUserTypeStream,
  getUserTypeStream,
  setThemeMode,
  getThemeMode,
  getTimeOutMessages,
  setUserStreamIsTrue,
  getUserStreamIsTrue,
  clearTimeOutMessages,
  setUserIddd,
  getUserIddd,
  setSSIDToken,
  getSSIDToken, 
  getSocketIOIP,
  setSSUSERID,
  getSSUSERID,
  setToken,
  getToken,
  getRtmpPath,
  hex2bin,
  setTrendContainer,
  getTrendContainer,
  setMessageContainer,
  getMessageContainer,
  setStatusType,
  getStatusType,
  getRemoveMessageContainer,
  setRemoveMessageContainer,
  setStreamId,
  getStreamId,
  setUserPlan,
  getUserPlan

};

export default Utils;
