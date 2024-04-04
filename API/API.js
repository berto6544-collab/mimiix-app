export async function userData(){
    
   const data = fetch('https://mymiix.com/public/api/userData')
   .then(res=>res.json());

   return data;

}


//login
export async function FeedsData(start){
    
    const data = fetch('https://mymiix.com/public/api/postsNative?start='+start)
    .then(res=>res.json());
 
    return data;
 
 }