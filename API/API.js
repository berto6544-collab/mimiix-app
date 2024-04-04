//UserData when logged grabs users Data API
export async function userData(){
    
   const data = fetch('https://mymiix.com/public/api/userData')
   .then(res=>res.json());

   return data;

}


//Grabbing Feed items data API 
export async function FeedsData(start){
    
    const data = fetch('https://mymiix.com/public/api/postsNative?start='+start)
    .then(res=>res.json());
 
    return data;
 
 }