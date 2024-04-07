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


export async function BlogAPI(start,q){
    
  const data = fetch('https://mymiix.com/public/api/Blog?uniqId='+q)
  .then(res=>res.json());

  return data;

}