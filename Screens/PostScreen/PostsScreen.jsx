import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from "react-native";
import { AuthContext } from "../../AuthContext/context";
import { GetPostUL } from "../../API/API";
import { FlashList } from "@shopify/flash-list";
import FeedItem from "./component/feedItem";
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from "react-native-safe-area-context";
import { OptimizedFlatList } from "react-native-optimized-flatlist";

const adUnitId = 'ca-app-pub-6989684433220866/6848090089';

const PostsScreen = ({route,navigation}) => {
const [dataSource,setDataSource] = React.useState([])
const [dataSourceRelated,setDataSourceRelated] = React.useState([])
const Auth = React.useContext(AuthContext)
const {uniqid} = route.params;


const FetchData = () =>{

  GetPostUL(uniqid)
  .then(response=>{
    if(response.length == 0)return;
    setDataSource(response)

fetch('https://mymiix.com/public/api/RelatedPost?uniq='+uniqid)
.then(resps=>resps.json())
.then(res=>{
  if(res.length == 0);
  setDataSourceRelated(res)

});

  });



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
    <SafeAreaView edges={['bottom']} style={{flex:1}} >
    <View style={{flex:1}}>
      <FlashList
      data={dataSourceRelated}
      estimatedItemSize={100}
      ListHeaderComponent={
        dataSource.length == 0 ?<></>:<View style={{flex:1,backgroundColor:'white'}}>
          <FeedItem  dataSource={dataSource} setDataSource={setDataSource} rewarded={Auth.rewarded} isProfile={false} navigation={navigation} Auth={Auth}  index={0} data={dataSource[0]} />
          

          <View style={{width:'100%',display:'flex',backgroundColor:'white',flex:1,paddingHorizontal:0,marginBottom:20,flexDirection:'column',gap:20,alignItems:'center'}}>
        
        <GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}



      
    />




  
        </View>
          <View style={{width:'100%',display:'flex',borderTopColor:'lightgrey',borderTopWidth:0.5,flexDirection:'column',alignItems:'center',padding:10,backgroundColor:'white'}}>
          <Text style={{fontSize:18,fontWeight:'700'}}>Related Post</Text>
          </View>
          </View>
      }
      renderItem={({item,index}) => {return(<FeedItem  dataSource={dataSourceRelated} rewarded={Auth.rewarded} setDataSource={setDataSourceRelated} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)}}
      getItemType={({item,index})=>{return ""+index}}
     
      extraData={{}}
      maintainVisibleContentPosition={{autoscrollToTopThreshold:0,minIndexForVisible:0}}
      windowSize={10}
      snapToEnd={false}
      snapToStart={false}
      overScrollMode="never" 
      nestedScrollEnabled 
      maxToRenderPerBatch={8}
      removeClippedSubviews={false}
      style={{backgroundColor:'white'}}
      keyExtractor={(item,index)=>""+item.Id}
      
      
      
      />


    </View>
    </SafeAreaView>
    )


    
  }




  export default PostsScreen;