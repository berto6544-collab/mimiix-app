import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";
import { GetPostUL } from "../../API/API";
import { FlashList } from "@shopify/flash-list";
import FeedItem from "./component/feedItem";
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-6989684433220866/6848090089';

const PostsScreen = ({route,navigation}) => {
const [dataSource,setDataSource] = React.useState([])
const Auth = React.useContext(AuthContext)
const {uniqid} = route.params;


const FetchData = () =>{

  GetPostUL(uniqid)
  .then(response=>{
    if(response.length == 0)return;
    setDataSource(response)

  })
}

    React.useEffect(()=>{

      FetchData();

        navigation.setOptions({
          headerLeft: ()=>(<View></View>),
            headerRight: () => (
              <Button onPress={() => {navigation.goBack();}} title="Done" />
            ),
          });
        

    },[])
    





    return(
    <View style={{flex:1}}>
      <FlashList 
      data={dataSource}
      renderItem={({item,index}) => {return(<FeedItem dataSource={dataSource} setDataSource={setDataSource} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)}}
      getItemType={({item,index})=>{return ""+index}}
      estimatedItemSize={500}
      removeClippedSubviews={false}
      keyExtractor={(item,index)=>""+index}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
     }}
      ListFooterComponent={
        <View style={{width:'100%',display:'flex',flex:1,paddingHorizontal:0,flexDirection:'column',gap:20,alignItems:'center'}}>
        
        <GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
    />




  
        </View>
        }
      
      />


    </View>)


    
  }




  export default PostsScreen;