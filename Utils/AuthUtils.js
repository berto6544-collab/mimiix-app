let userType = null;
let container = null;
let postContainer =null;
let userId = null;
let roomName = null;
let tokenId = null;
let postData = [];
let userData = [];
let timeOutMessages = [];
let Login = "Login";





const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = () => {
  return container;
};

const setContainer = con => {
  container = con;
};
const getPostContainer = () => {
  return postContainer;
};

const setPostContainer = con => {
  postContainer = con;
};

const setUserType = type => {
  userType = type;
};

const getUserType = () => {
  return userType;
};

const setUserId = id => {
  userId = id;
};

const getUserId = () => {
  return userId;
};

const setLogin = id => {
  Login = id;
};

const getLogin= () => {
  return Login;
};

const setPostData = id => {
  postData = id;
};

const getPostData = () => {
  return postData;
};

const setUserData = id => {
  userData = id;
};

const getUserData = () => {
  return userData;
};

const setToken = id => {
  tokenId = id;
};

const getToken = () => {
  return tokenId;
};


const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};

const  retrieveData = async () => {

  try{
  
  const value = await AsyncStorage.getItem('SCOM');
  const user = await AsyncStorage.getItem('AuthUser');
  
  const jsonParse = JSON.parse(user);

 
  if(value !== null){
    

this.setToken(value);
this.setUserId(jsonParse.userId);

    console.log(value);
  }
  else{
    this.setToken("");
    this.setUserId("")
  }
  
  }catch (error) {
  
  }
  
  }


const fetchAsync = () => {

  
return retrieveData();



}

const fetchData = () =>  {

fetch('https://mymiix.com/public/api/autth',{
  method:'GET',
   header:{
     'Accept': 'application/json',
     'Content-type': 'application/json'
   }
   
  })
    .then((response) => response.json())
    .then((responseJson)=> {
  
      
      
      setToken(responseJson[0].SCOM);
      setUserId(responseJson[0].ID);
      
  
    }).catch((error) =>{
      
    });


}


const Utils = {
  isNullOrUndefined,
  getUserType,
  setUserType,
  setPostData,
  getPostData,
  getContainer,
  setContainer,
  getUserId,
  setUserId,
  setToken,
  getToken,
  getRoomName,
  setRoomName,
  fetchData,
  setLogin,
  getLogin,
  fetchAsync,
  setUserData,
  getUserData,
  setPostContainer,
  getPostContainer
  
};

export default Utils;
