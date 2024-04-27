import React, { useRef, useState } from 'react';
import { FlatList,Modal,Image,AsyncStorage, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native';
import { Avatar,Icon } from '@rneui/themed';
import { CubeNavigationHorizontal,CubeNavigationVertical } from 'react-native-3dcube-navigation';

import StoryContainer from '../components/StoryContainer';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { FlashList } from '@shopify/flash-list';
import BigList from 'react-native-big-list';

const Stories = ({dataisActive,navigation,Auth,setShowDrawer}) => {


  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [AllStoriess, setAllsotries] = useState([]);
  const [scrolIndex,setScroll] = useState(0);
  const[isloaded, setloading] = React.useState(false);
 
  const modalScroll = useRef(null);

  
  React.useEffect(() => {
//if(dataisActive == 0){

getStorie();

//}else{
 // await getStorie();
//}

},[])













const scrollStorie = () =>{
 


  fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then(async(responseJson)=> {

    //if it fetches data
    if(responseJson.length == 0)return;
    setAllsotries(AllStoriess.concat(responseJson));
    setScroll(scrolIndex + 1);


   


  
  
    


});
 

}



const getStorie = async() =>{

  
  await fetch('https://mymiix.com/public/api/storiess?start='+scrolIndex)
  .then((response) => response.json())
  .then((responseJson)=> {

    if(responseJson.length == 0)return;
    setAllsotries(responseJson);
    setScroll(scrolIndex + 1);
  
    
    

  
  
  
  


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
  
const  Renderr = ({item,index}) => {
  
 



  
  return(

    <TouchableOpacity onPress={() => onStorySelect(index)} >
  <View style={{position:'relative'}}>
    <Avatar size={50}  rounded={true} source={{uri:item.profile}} />
    </View>
    </TouchableOpacity>

          )

  



      


}
  


const renderHeader = () =>{
return(<TouchableOpacity onPress={()=>setShowDrawer(true)} >
  <View style={{position:'relative'}}>
    <Icon name={'add-circle'} size={20} type={'material-icons'} containerStyle={{position:'absolute',zIndex:10,right:-2,bottom:0}} />
    <Avatar size={50}  rounded={true} source={{uri:Auth.Authuser.length > 0 ? Auth.Authuser[0]?.ProfileImage:'https://mymiix.com/public/assets/img/no-avatar.jpg'}} />
    </View>
    </TouchableOpacity>)};


  return (
    <View style={[styles.container,{flex:1}]}>
      <FlashList
        data={AllStoriess}
        ListHeaderComponent={renderHeader}
        horizontal={true}
        estimatedItemSize={65}
        onEndReached={scrollStorie}
        onEndReachedThreshold={0.9}
        style={{width:'100%',paddingHorizontal:5,gap:10,display:'flex',flexDirection:'row'}}
        contentContainerStyle={{width:'100%',paddingHorizontal:5,gap:5,display:'flex',flexDirection:'row'}}
        ListHeaderComponentStyle={{paddingRight:5}}
        ItemSeparatorComponent={()=><View style={{paddingHorizontal:2}}></View>}
        renderItem={Renderr}
        
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
              dataS={navigation}
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
