import React, { useRef, useState } from 'react';
import { FlatList, Image,Modal,AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CubeNavigationHorizontal,CubeNavigationVertical } from 'react-native-3dcube-navigation';

import StoryContainer from '../components/StoryContainer';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import FastImage from 'react-native-fast-image';

const Stories = (props) => {


  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  
  const [AllSponsored, setAllSponsored] = useState([]);
  const [AllStoriess, setAllsotries] = useState([]);
  const [StorieSeen, setstorieSeen] = useState([]);
  const [scrolIndex,setScroll] = useState(0);
  const[isloaded, setloading] = React.useState(false);
 
  const modalScroll = useRef(null);

  //alert(storieUrl);
  React.useEffect(async() => {
if(props.dataisActive == 0){
  await getSponsored();

//setAllsotries(props.storie)
await getStorie();
  

//console.log(AllStories)

}

},[])



const modifyData = (data) => {
  const  numColumns = 1;
  const addBannerAfterIndex = 3;
  const rand = Math.floor(Math.random()*AllSponsored.length);
  const arr = [];
  var tmp = [];

  if(AllSponsored.length > 0){


    
  data.forEach((val, index) => {
    if (index % numColumns == 0 ){
      arr.push({
        
        username: val.username,
        name: val.name,
        title: val.title,
        profile: val.profile,
        stories: val.stories
        
      });
      //tmp = [];
    }

   
    if(!arr.some(({Idd})=>AllSponsored[rand].Id === Idd))
    { 
    if(!arr.find(item => item.Idd === AllSponsored[rand].Id))
    {

    if (index % addBannerAfterIndex == 0 && index != 0){


      if(AllSponsored[rand].PostImage == ""){
        


      arr.push({
        username:AllSponsored[rand].PostedBy,
        name:AllSponsored[rand].PostedBy,
        title:"",
        profile:AllSponsored[rand].ProfileImg,
        type: 'banner',
        "Idd": AllSponsored[rand].Id,
        "PostId": AllSponsored[rand].PostId,
        stories: [{ bannerName: 'Spotlight',
        "id": AllSponsored[rand].PostedBy+"-"+AllSponsored[rand].Id+"",
        "url": "", 
        "type": "web",
        "time": "Spotlight Ad", 
        "duration": 60, 
        "isReadMore": false,
        "link": AllSponsored[rand].Links,
        
        "linkText": AllSponsored[rand].followerID}]});
      //tmp = [];
    }


    else{
      if(AllSponsored[rand].PostImage.match(/\.jpg|\.png|\.jpeg|\.gif/gi)){
          
      arr.push({
        username:AllSponsored[rand].PostedBy,
        name:AllSponsored[rand].PostedBy,
        title:"",
        profile:AllSponsored[rand].ProfileImg,
        type: 'banner',
        "Idd": AllSponsored[rand].Id,
        "PostId": AllSponsored[rand].PostId,
        stories: [{ bannerName: 'Spotlight',
        "id": AllSponsored[rand].PostedBy+"-"+AllSponsored[rand].Id+"",
        "url": AllSponsored[rand].PostImage,
        "Poster":AllSponsored[rand].Poster,
        "type": "image",
        "time": "Spotlight Ad", 
        "duration": 30,
        
        "isReadMore": false,
        "link": AllSponsored[rand].Links,"linkText": ""}]});
      //tmp = [];
      
      }else if(AllSponsored[rand].PostImage.match(/\.mp4|\.mov|\.avi|\.mp3|\.mkv/gi)){
        arr.push({
          username: AllSponsored[rand].PostedBy,
          name:AllSponsored[rand].PostedBy,
          title:"",
          profile:AllSponsored[rand].ProfileImg,
          type: 'banner',
          "Idd": AllSponsored[rand].Id,
          "PostId": AllSponsored[rand].PostId,
          stories: [{ bannerName: 'Spotlight',
          "id": AllSponsored[rand].PostedBy+"-"+AllSponsored[rand].Id+"", 
          "url": AllSponsored[rand].PostImage,
          "Poster":AllSponsored[rand].Poster,
          "type": "video","time": "Spotlight Ad", "duration": 30,
          "isReadMore": false,
          
          "link": AllSponsored[rand].Links,"linkText": ""}]});
        //tmp = [];
      
      }
        }
      
    }
    
  }
    }

    
   // tmp.push(val);
  });
  //arr.push(tmp);
  console.log(arr);
  return arr; 
}else{

  return data;
}
}





getSponsored = async() =>{

  
  await fetch('https://mymiix.com/public/api/GETSponsoredAds?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {
    setAllSponsored(responseJson)
  })
}




getStoriee = async() =>{

  
  
    //setScroll(scrolIndex + 1);


    if(await AsyncStorage.getItem('stories-seenItems') == null){
  
      for (var i = 0; i < AllStoriess.length; ++i){
    
    
      
      storedObject = '{"'+AllStoriess[i].username+'":false,"'+AllStoriess[i].username+'-Date": ""}';
      
      AsyncStorage.mergeItem('stories-seenItems',storedObject);
      
      const response = await AsyncStorage.getItem('stories-seenItems');
    
      setstorieSeen(JSON.parse(response));
      
      setloading(true)
    console.log(response);
    
    if(isloaded == false){

      setloading(true);
    }
    
    }
    
    
    }
    else{
    
    
      //AsyncStorage.removeItem('stories-seenItems');
    
     let response = await AsyncStorage.getItem('stories-seenItems');
      let co = JSON.parse(response); 
      for (var i = 0; i < AllStoriess.length; ++i){
    
       
    
    
      if(co[AllStoriess[i].username] != null){
      
    
        setstorieSeen(JSON.parse(response));
      
        setloading(true);
     
        if(isloaded == false){

          setloading(true);
        }
      
      
      
    
    }
     else{
    
    
      storedObject = '{"'+AllStoriess[i].username+'":false,"'+AllStoriess[i].username+'-Date": ""}';
      
       await AsyncStorage.mergeItem('stories-seenItems',storedObject)
       setloading(true)

       if(isloaded == false){

        setloading(true);
      }

    
      }
      
     
    
    
      
    
    
      }
      
    console.log(response);
    
    
    }


  
  
  



  




}


scrollStorie = async() =>{
  await getSponsored();


  await fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {

    //if it fetches data
    if(responseJson.length > 0){
    setAllsotries(AllStoriess.concat(modifyData(responseJson)));
    setScroll(scrolIndex + 1);


    if(await AsyncStorage.getItem('stories-seenItems') == null){
  
      for (var i = 0; i < responseJson.length; ++i){
    
    
      
      storedObject = '{"'+responseJson[i].username+'":false,"'+responseJson[i].username+'-Date": ""}';
      
      AsyncStorage.mergeItem('stories-seenItems',storedObject);
      
      const response = await AsyncStorage.getItem('stories-seenItems');
    
      setstorieSeen(JSON.parse(response));
      
      setloading(true)
    console.log(response);
    
    if(isloaded == false){

      setloading(true);
    }
    
    }
    
    
    }
    else{
    
    
      //AsyncStorage.removeItem('stories-seenItems');
    
     let response = await AsyncStorage.getItem('stories-seenItems');
      let co = JSON.parse(response); 
      for (var i = 0; i < responseJson.length; ++i){
    
       
    
    
      if(co[responseJson[i].username] != null){
      
    
        setstorieSeen(JSON.parse(response));
      
        setloading(true);
     
        if(isloaded == false){

          setloading(true);
        }
      
      
      
    
    }
     else{
    
    
      storedObject = '{"'+responseJson[i].username+'":false,"'+responseJson[i].username+'-Date": ""}';
      
       await AsyncStorage.mergeItem('stories-seenItems',storedObject)
       setloading(true)

       if(isloaded == false){

        setloading(true);
      }

    
      }
      
     
    
    
      
    
    
      }
      
    console.log(response);
    
    
    }


  
  
    }


});
 

}



getStorie = async() =>{

  
  await fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {

    if(responseJson != []){
    setAllsotries(modifyData(responseJson));
    setScroll(scrolIndex + 1);
  

    if(await AsyncStorage.getItem('stories-seenItems') == null){
  
      for (var i = 0; i < responseJson.length; ++i){
    
    
      
      storedObject = '{"'+responseJson[i].username+'":false,"'+responseJson[i].username+'-Date": ""}';
      
      AsyncStorage.mergeItem('stories-seenItems',storedObject);
      
      const response = await AsyncStorage.getItem('stories-seenItems');
    
      setstorieSeen(JSON.parse(response));
      
      setloading(true)
    console.log(response);
    
    if(isloaded == false){

      setloading(true);
    }
    
    }
    
    
    }
    else{
    
    
      //AsyncStorage.removeItem('stories-seenItems');
    
     let response = await AsyncStorage.getItem('stories-seenItems');
      let co = JSON.parse(response); 
      for (var i = 0; i < responseJson.length; ++i){
    
       
    
    
      if(co[responseJson[i].username] != null){
      
    
        setstorieSeen(JSON.parse(response));
      
        setloading(true);
     
        if(isloaded == false){

          setloading(true);
        }
      
      
      
    
    }
     else{
    
    
      storedObject = '{"'+responseJson[i].username+'":false,"'+responseJson[i].username+'-Date": ""}';
      
       await AsyncStorage.mergeItem('stories-seenItems',storedObject)
       setloading(true)

       if(isloaded == false){

        setloading(true);
      }

    
      }
      
     
    
    
      
    
    
      }
      
    console.log(response);
    
    
    }

  }
  
  
  


});
 
  




}




 


  const onStorySelect = (index) => {
    
    setCurrentUserIndex(index);
   

   
    setModel(true);
  
  };

  const onStoryClose = () => {
    setModel(false);
    getStoriee();
  };



  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (AllStoriess.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    
    if (currentUserIndex > 0 || AllStoriess.length - 1 < currentUserIndex) {
      setCurrentUserIndex(newIndex);
      

      if (!isScroll) {
        
        modalScroll.current.scrollTo(newIndex, true);

      }

    }
    
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue >= scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
     
      console.log('next');
      
    }
   else if (currentScrollValue <= scrollValue) {
      
      
      onStoryPrevious(true);
      setCurrentScrollValue(scrollValue);
      console.log('previous');
      
    }

    else if(currentScrollValue == scrollValue){
      onStoryClose();
      //setCurrentScrollValue(scrollValue);
    }

  };

  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: '#ccc' }} />
  );

renderr = ({item,index}) => {
  
 

 if(isloaded == false) {
  return(null)
 }
 
 
 if(item.type === "banner")
 {
 

 }
else{
if(StorieSeen[item.username+'-Date'] != item.stories[item.stories.length - 1].time){
  
  return(

    
    <TouchableOpacity style={{paddingHorizontal:10}} onPress={() => onStorySelect(index)}>
              <FastImage
                style={styles.circle}
                source={{ uri: item.profile }}
                
              />
              <Text style={[styles.title]}>{item.name}</Text>
            
            </TouchableOpacity>
          )

  }
  else{
    return(

    
      <TouchableOpacity style={{paddingHorizontal:10}} onPress={() => {onStorySelect(index);}}>
                <FastImage
                  style={styles.circleSeen}
                  source={{ uri: item.profile }}
                  
                />
                <Text style={[styles.title]}>{item.name}</Text>
              
              </TouchableOpacity>
            )

  }

}

      


}
  



  return (
    <View style={styles.container}>
      <OptimizedFlatList
        data={AllStoriess}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        style={{flexDirection:'row',alignItems:'center'}}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem = {({item,index}) => 
          renderr({item,index})
          
  }
      />


     


      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        
        coverScreen={false}
        onShow={()=>{

          
            if(Platform.OS == "android"){
              if (currentUserIndex > 0 ) {
                      
                modalScroll.current.scrollTo(currentUserIndex, false);
              }
            }
            
            
                


        }}

        
        onOrientationChange={()=>{
        if (currentUserIndex > 0 ) {
          
          modalScroll.current.scrollTo(currentUserIndex, false);
        }
       }}
       
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)}   ref={modalScroll} style={styles.container}>
          {AllStoriess.map((item, index) => (
            <StoryContainer
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              onStoryItem={item.stories.length -1}
              dataS={props.dataS}
              user={item}
              dataItem={item}
              setAllStories={setAllsotries}
              AllStoriess={AllStoriess}
              dataIndex={index}
              RetrieveData={()=>getStoriee()}
              userId={currentUserIndex}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  circle: {
    width: 53,
    margin: 4,
    height: 53,
    marginTop:10,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: 'cornflowerblue',
  },
  circleSeen: {
    width: 53,
    margin: 4,
    height: 53,
    marginTop:10,
    borderRadius: 33,
    
    
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 10,fontWeight:'200', textAlign: 'center',
    color:'black'
  },
});







export default Stories;
