//UserData when logged grabs users Data API
export async function userData(){
    
   const data = fetch('https://mymiix.com/public/api/userData')
   .then(res=>res.json());

   return data;

}

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

//Grabbing Feed items data API 
export async function FeedsData(start){
    
    const data = fetch('https://mymiix.com/public/api/postsNative?start='+start)
    .then(res=>res.json());
 
    return data;
 
 }


 //Grabbing Feed items data API 
export async function ProfileDataAPI(username){
    
  const data = fetch('https://mymiix.com/public/api/userDatta?id='+username)
  .then(res=>res.json());

  return data;

}

export async function GetNotificationAPI(start){

const data  = await fetch('https://mymiix.com/public/api/notificationn?start='+start)
.then((response) => response.json())

  return data;
}



export async function PostcommentsAPi(postid,Message){

  const data = await fetch('https://mymiix.com/public/api/commentsNative?postid='+postid+'&func=Comment',{
    method:'POST',
    body:JSON.stringify({"comment":Message})
  })
  .then(response=>response.json())


  return data;
}

export async function GetcommentsAPi(postid,start){

  const data = fetch('https://mymiix.com/public/api/commentsRN?postid='+postid+'&start='+start)
  .then(response=>response.json())

  return data;
}

export async function CommentsHideAPi(postid,commentid){

  const data = fetch('https://mymiix.com/public/api/commentsHide?postid='+postid+'&commentid='+commentid)
  .then(response=>response.json())

  return data;
}


export async function PostDeleteAPi(postid){

  const data = fetch('https://mymiix.com/public/api/Deletepost?posttid='+postid)
  .then(response=>response.json())

  return data;
}
export async function CommentsDeleteAPi(postid,commentid){

  const data = fetch('https://mymiix.com/public/api/commentsDelete?postid='+postid+'&commentid='+commentid)
  .then(response=>response.json())

  return data;
}

export async function GetPinnedcommentsAPi(postid){

  const data = fetch('https://mymiix.com/public/api/commentsPinned?postid='+postid+'start=0')
  .then(response=>response.json())

  return data;
}

export async function StorieDataAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/storieNative?start='+start+'&q='+q)
  .then(res=>res.json());

  return data;

}

export async function ProfilePostAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/profilepostsNative?id='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}

export async function ProfileBlogAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/ProfileBlogList?username='+q+'&start='+start)
  .then(res=>res.json());

  return data;

}


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


export async function BlogAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/Blog?uniqId='+q)
  .then(res=>res.json());

  return data;

}