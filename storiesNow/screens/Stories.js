import React, { useRef, useState } from 'react';
import { FlatList,Modal,Image,AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/themed';
//import { CubeNavigationHorizontal,CubeNavigationVertical } from 'react-native-3dcube-navigation';

//import StoryContainer from '../components/StoryContainer';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { FlashList } from '@shopify/flash-list';

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
  //await getSponsored();

//setAllsotries(props.storie)
await getStorie();
  

//console.log(AllStories)

}

},[])






getSponsored = async() =>{

  
  await fetch('https://mymiix.com/public/api/GETSponsoredAds?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {
    setAllSponsored(responseJson)
  })
}






scrollStorie = async() =>{
  await getSponsored();


  await fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {

    //if it fetches data
    if(responseJson.length > 0){
    setAllsotries(AllStoriess.concat(responseJson));
    setScroll(scrolIndex + 1);


   


  
  
    }


});
 

}



getStorie = async() =>{

  
  await fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {

    if(responseJson.length > 0){
    setAllsotries(responseJson);
    setScroll(scrolIndex + 1);
  

    

  }
  
  
  


});
 
  




}




 


  const onStorySelect = (index) => {
    
    setCurrentUserIndex(index);
   

   
    setModel(true);
  
  };

  const onStoryClose = () => {
    setModel(false);
   
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
 
 


  
  return(

    
    <TouchableOpacity style={{paddingHorizontal:10}} onPress={() => onStorySelect(index)}>
              <Avatar
                style={styles.circle}
                source={{ uri: item.profile }}
                
              />
              <Text style={[styles.title]}>{item.name}</Text>
            
            </TouchableOpacity>
          )

  



      


}
  



  return (
    <View style={[styles.container,{flex:1}]}>
      <OptimizedFlatList
        data={AllStoriess}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        //style={{flexDirection:'row',alignItems:'center'}}
        //estimatedItemSize={100}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem = {({item,index}) => renderr({item,index})
          
  }
      />


     

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
