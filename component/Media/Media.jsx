import React from "react";
import { Text,Card,Image,Avatar, Icon } from "@rneui/themed";
import { TouchableOpacity,Dimensions, View } from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { FeedItemstyles } from "../../StyleComponent/Style";
import { AuthContext } from "../../AuthContext/context";


const {width: screenWidth} = Dimensions.get('window');
 
export const MultiMedias = ({data,navigation}) =>{
const [dataSource,setDataSource] = React.useState([]);
const [dataSourceMusic,setDataSourceMusic] = React.useState([]);
const [musicPlayer,setMusicPlayer] = React.useState([])
const [ActiveSlide,setActiveSlide] = React.useState(0)
const reffed = React.useRef(null)
const Auth = React.useContext(AuthContext)
const carouselRef = React.useRef(null);


React.useEffect(()=>{

    GetData();
   
},[])
    


const GetData = () =>{
    
    let con = data.PostImage.split(",");
    let conn = data.PostImage.split(",");
    
    var tmp = [];
  
     

  conn = conn.filter(ar => conn.find(rm => (rm.match(/^.*\.(jpg|jpeg|png|JPG|gif|mp4|avi|MOV|mov|mkv)$/) === ar.match(/^.*\.(jpg|jpeg|png|JPG|gif|mp4|avi|MOV|mov|mkv)$/) ) )) 





    setDataSource([...con])
    setDataSourceMusic([...conn]);



    conn.map((posts,index)=>{
        const varrr = index+1;
        const filename = posts.replace("https://mymiix.com/public/assets/img/images/","");
        //console.log('log song', filename + ' post url = '+posts)
        if(data.Music.length > 0 ){
        
          musicPlayer.push({
            trackNumber:index+1,
            url:posts,
            uniqueId:data.UniqeId,
            cover: ''+data.Poster,
            artist:{
              name:data.Music[index].artist,
              song:data.Music[index].name,
              duration:data.Music[index].duration,
              tag:data.Music[index].tag,
              genre:data.Music[index].genre,
        
        
            }
          })
        
        }else{
            musicPlayer.push({
              trackNumber:index+1,
              url:posts,
              uniqueId:data.UniqeId,
              cover: ''+data.Poster,
              artist:{
                name:"",
                song:"Track "+varrr,
                duration:'unknown',
                tag:'',
                genre:'',
              }
            })
          }
        
          })



setMusicPlayer([...musicPlayer])




}
  







const content = ({item,index}) => {

if(item.match(/\.jpg|\.png|\.jpeg|\.gif/gi)){


    return(
    <TouchableOpacity activeOpacity={1} style={{height: Dimensions.get('window').height -470,position:'relative',zIndex:2, width: Dimensions.get('window').width}}>


    
      <Image style={{
        width: "100%",
        zIndex:2,
        marginHorizontal: 0,
        height: Dimensions.get('window').height -370, 
        resizeMode: 'cover',
        }} source={{uri:item}} />
    </TouchableOpacity>)


}else if(item.match(/\.mp4|\.mov|\.avi|\.mkv/gi)){


    return(
    <TouchableOpacity onPress={()=>{

      Auth.setMediaType('video')
     // Auth.setMediaDataSource([{url:item}])
      navigation.navigate('Media',{title:data?.UserName, url:data.PostImage,type:'video'})

    }} activeOpacity={1} style={{height: Dimensions.get('window').height -470,position:'relative',zIndex:2, width: Dimensions.get('window').width,}}>

    <Icon name={'play'} containerStyle={{position:'absolute',top:'45%',zIndex:3,left:'45%'}} size={70} color={'#0086ff'}  type={'font-awesome'} /> 

    <Image style={{
        width: "100%",
        zIndex:2,
        marginHorizontal: 0,
        height: Dimensions.get('window').height -370, 
        resizeMode: 'cover',
        }} source={{uri:data.Poster}} />
    </TouchableOpacity>)


}else if(item.match(/\.mp3|\.ogg|\.wav/gi)){
        

        return(
        <TouchableOpacity activeOpacity={1} onPress={()=>{

        
          Auth.setMediaType('audio')
         // Auth.setMediaDataSource([{url:item}])
          navigation.navigate('Media',{title:data?.UserName})

        }}  style={{height: Dimensions.get('window').height -470,position:'relative',zIndex:2, width: Dimensions.get('window').width,}}>
        <Icon name={'play'} containerStyle={{position:'absolute',top:'45%',zIndex:3,left:'45%'}} size={70} color={'#0086ff'}  type={'font-awesome-5'} /> 

        <Image style={{
        width: "100%",
        zIndex:2,
        marginHorizontal: 0,
        height: Dimensions.get('window').height -370, 
        resizeMode: 'cover',
        }} source={{uri:data.Poster}} />
        </TouchableOpacity>
        
            )
          }
           

}


const goForward = () => {
  carouselRef.current.snapToNext();
};




return(

  <View style={{width:'100%',justifyContent:'center',marginBottom:10,alignItems:'center',flexDirection:'column',zIndex:2}}>
          


          
  {/*dataSource.length > 1 ? <View style={{position:'absolute',right:10,zIndex:10,top:30,flexDirection:'column',backgroundColor:'rgba(52, 52, 52, 0.8)',padding:5,paddingHorizontal:10,borderRadius:80}}><Text style={{fontWeight:'300',color:'white'}}>{activeSlide +1 +'/'+dataSource.length}</Text></View>:null*/}
        
  <Carousel
  ref={carouselRef}
 layout={'default'} 
 
 sliderWidth={screenWidth} 
 sliderHeight={screenWidth}
 itemWidth={screenWidth}
 style={{width:'100%', height: Dimensions.get('screen').height -470,zIndex:2}}
 data={dataSource || dataSourceMusic}
 ParallaxImage={true}
 renderItem={content} />
 </View>
)


}