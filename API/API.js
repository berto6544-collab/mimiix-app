//UserData when logged in grabs users Data API
export async function userData(){
    
   const data = fetch('https://mymiix.com/public/api/userData')
   .then(res=>res.json());

   return data;

}


//Sign-in using the sign-in API
export async function SigninAPI(userEmail,userPassword){

   const data = await fetch('https://mymiix.com/public/api/autth',{
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        // we will pass our input data to server
        email: userEmail,
        password: userPassword
      })
      
    })
    .then((response) => response.json());

    return data;


}

//Grabbing Posts data API 
export async function FeedsData(start){
    
    const data = fetch('https://mymiix.com/public/api/postsNative?start='+start)
    .then(res=>res.json());
 
    return data;
 
 }


 //Grabbing Posts items data based on user API 
export async function ProfileDataAPI(username){
    
  const data = fetch('https://mymiix.com/public/api/userDatta?id='+username)
  .then(res=>res.json());

  return data;

}


//Grab notification data from the notification API
export async function GetNotificationAPI(start){

const data  = await fetch('https://mymiix.com/public/api/notificationn?start='+start)
.then((response) => response.json())

  return data;
}


//Post comments based on Post

export async function PostcommentsAPi(postid,Message){

  const data = await fetch('https://mymiix.com/public/api/commentsNative?postid='+postid+'&func=Comment',{
    method:'POST',
    body:JSON.stringify({"comment":Message})
  })
  .then(response=>response.json())


  return data;
}

//Post comments based on Post

export async function PostMessageAPi(sender,body){

  const data = await fetch('https://www.mymiix.com/public/api/messagesReactNativve?sender='+sender,{
    method:'POST',
    body:body
  })
  .then(response=>response.json())


  return data;
}


//Grab comments based on Post
export async function GetcommentsAPi(postid,start){

  const data = await fetch('https://mymiix.com/public/api/commentsRN?postid='+postid+'&start='+start)
  .then(response=>response.json())

  return data;
}


//Hide comments based on Post
export async function CommentsHideAPi(postid,commentid){

  const data = await fetch('https://mymiix.com/public/api/commentsHide?postid='+postid+'&commentid='+commentid)
  .then(response=>response.json())

  return data;
}

//Delete Post based on Post
export async function PostDeleteAPi(postid){

  const data = await fetch('https://mymiix.com/public/api/Deletepost?posttid='+postid)
  .then(response=>response.json())

  return data;
}



//Delete comments based on Post
export async function CommentsDeleteAPi(postid,commentid){

  const data = await fetch('https://mymiix.com/public/api/commentsDelete?postid='+postid+'&commentid='+commentid)
  .then(response=>response.json())

  return data;
}



//Grab pinned comment based on Post
export async function GetPinnedcommentsAPi(postid){

  const data = await fetch('https://mymiix.com/public/api/commentsPinned?postid='+postid+'start=0')
  .then(response=>response.json())

  return data;
}


//When your watched the reward ads you will unlock content for 1 day
export async function PostWatchedAdAPi(postid){
  const formData = new FormData();
  formData.append("PostId",postid)
  const data = await fetch('https://mymiix.com/public/api/WatchedAd',{
    method:'POST',
    body:formData
  })
  .then(response=>response.json())

  return data;
}


//Grab Story data based on user or grabbing a list of user stories using API
export async function StorieDataAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/storiess?start='+start+'&q='+q)
  .then(res=>res.json());

  return data;

}
//https://mymiix.com/public/api/profilepostsNativeEventPost?id=robertsproduction&start=0



//Grabing users post data
export async function ProfilePostAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/profilepostsNative?id='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}


//Grabing users Live Event data
export async function ProfileLiveEventAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/UsersLiveEvent?q='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

//Grabing Trending Posts data
export async function GetTrendingPostsAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/TrendsReactNative?Topic='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

//Grabing Users
export async function GetUsersAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/queryy?q='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

//get random quotes and it will be pulled everytime the first loads.
export async function GetQuote(q){

  const data = await fetch('https://mymiix.com/public/api/mentioningQuote?q='+q)
  .then(res=>res.json());

  return data;
}



//Get specific Post by their uniqid 
export async function GetPostUL(q){

  const data = await fetch('https://mymiix.com/public/api/CopylinkedPost?uniq='+q)
  .then(res=>res.json());

  return data;

}

//get pinned post every time the app opens
export async function GetPinnedPost(){

  const data = await fetch('https://mymiix.com/public/api/postsNativePin?start=0')
  .then(res=>res.json());

  return data;

}


//Grabing users Future post data
export async function ProfileFuturePostAPI(start,q){
    
  const data = await fetch('https://mymiix.com/public/api/profilepostsNativeEventPost?id='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

// Grab users blog list
export async function ProfileBlogAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/ProfileBlogList?username='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

//Like or unlike a post using this API
export const PostLikeApi = async(Postid,likeCount,likeData,status) =>{

  const data = await fetch('https://mymiix.com/public/api/ReactNativelikes?idd='+Postid+status+"&func=Like",{
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
      })
      .then((response) => response.json())


      return data;
}


//Grabbing a specific blog based on this API
export async function BlogAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/Blog?uniqId='+q)
  .then(res=>res.json());

  return data;

}


// Grab Users that are following you
export async function MessageUsersAPI(start){
    
  const data = fetch('https://mymiix.com/public/api/followersReactNative?start='+start)
  .then(res=>res.json());

  return data;

}

// Grab Users that are following you
export async function MessageFromUserAPI(start,userid){
    
  const data = fetch('https://mymiix.com/public/api/messagesReactNative?sender='+userid+'&start='+start)
  .then(res=>res.json());

  return data;

}