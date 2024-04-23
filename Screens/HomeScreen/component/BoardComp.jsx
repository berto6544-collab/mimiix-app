import React from "react"
import { Dimensions,TouchableOpacity,View,Text,FlatList } from "react-native"



export default BoardComp = ({navigation}) =>{

const [OpenData,setOpenData] = React.useState([
  
    {
    id:1,
    Title:"Write an inspirational Quote".toLocaleUpperCase(),
    Body:"Write an inspirational quote. Your quote will get picked in random and pushed to everyones screen.",
    Type:"Signup"
  },
  {
    id:4,
    Title:"Monetize your Content".toLocaleUpperCase(),
    Body:"Creators take 90% every transaction. Onboard with stripe Today. Stripe is one of the largest payment processing platforms in the world.",
    Type:"Signin"
  },

  {
    id:3,
    Title:"Create & Broadcast".toLocaleUpperCase(),
    Body:"Create a drop-in audio room that your followers & subscribers can be part of.",
    Type:"Signin"
  }
  
  
  
    
]);
const [sliderIndex,setSliderIndex] = React.useState(0)
const [MaxSlider,setMaxSlider] = React.useState(3)
const listRef = React.useRef(null);

React.useEffect(()=>{


  const intervalId =  setInterval(function() {
  
    let nextIndex = 0

    if(OpenData.length > 0){
    if (sliderIndex < OpenData.length-1) {
      nextIndex = sliderIndex + 1
    }
  }

    scrollToIndex(nextIndex, true)
   setSliderIndex(nextIndex)
  }, 20000)


  return () => clearInterval(intervalId);

},[])

const scrollToIndex = (index, animated) => {
    listRef.current && listRef.current.scrollToIndex({ index, animated })
  }

return(
<FlatList
showsVerticalScrollIndicator={false} 

ref={listRef}

removeClippedSubviews={true}
initialNumToRender={1} 
maxToRenderPerBatch={2}
snapToInterval={Dimensions.get('window').width}
decelerationRate={'fast'}
legacyImplementation={false}
showsHorizontalScrollIndicator={false}
horizontal={true}
extraData={this.state}
style={{width:Dimensions.get('window').width }}
keyExtractor={(item,index) => index}
data={OpenData}
onMomentumScrollEnd={(event) => {
  let sliderIndex = event.nativeEvent.contentOffset.x ? event.nativeEvent.contentOffset.x/Dimensions.get('screen').width : 0
 setSliderIndex(sliderIndex)
}}

renderItem={({item,index}) => {

  return(
    <TouchableOpacity onPress={()=>{
      navigation.navigate('Signin')
    }} activeOpacity={1} style={{paddingTop:12,paddingBottom:15,borderBottomWidth:1,borderTopWidth:1,borderColor:'lightgrey',flexDirection:'column',alignItems:'center'}}>
      <Text style={{fontSize:23,fontWeight:'600',textAlign:'center',paddingBottom:10,paddingHorizontal:10,width:Dimensions.get('screen').width}}>{item.Title}</Text>
  <Text style={{width:Dimensions.get('screen').width,fontSize:16,textAlign:'center',paddingHorizontal:10}}>{item.Body}</Text>
    

  <Text style={{fontSize:25,fontWeight:'700',marginTop:10}}>Signup Today</Text>

    

    </TouchableOpacity>
  )
}}



/>

)

}