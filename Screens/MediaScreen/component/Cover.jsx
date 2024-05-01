import React from "react";
import {View,Text, Dimensions,Button,TouchableOpacity} from 'react-native';
import { Icon, Image } from "@rneui/themed";
import FastImage from "react-native-fast-image";
import { ProfileDataAPI } from "../../../API/API";
import DrawerProfileDialog from "../../../Dialog/DrawerProfileDialog";
import ProfileItem from "./ProfileItem";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import { FlashList } from "@shopify/flash-list";


export default Cover = ({Auth,navigation}) =>{

const [profileDialog,setProfileDialog] = React.useState(false);
const [profileDataSource,setProfileData] = React.useState([]);

const setClose = () =>{
    setProfileDialog(false)
}

    return(<View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',zIndex:2,flex:0.7,gap:5}}>

    <FastImage  source={{uri:Auth.mediaDataSource[Auth.index].cover,priority:'high'}} style={{width:'100%',height:300}} />
    <Text style={{fontSize:25,fontWeight:'600',color:'black',textAlign:'center'}}>{Auth.mediaDataSource[Auth.index].artist.song}</Text>
    {Auth.mediaDataSource[Auth.index].artist.tag.split(',').length > 0?<View style={{display:'flex',flexDirection:'row',justifyContent:'center',paddingHorizontal:10,alignItems:'center',width:'100%',gap:5}}>
    {Auth.mediaDataSource[Auth.index].artist.tag.split(',').map((item,index)=>{
        return(<TouchableOpacity onPress={()=>{

            //navigation.navigate('Profile',{username:item.replace('@','')})
                

              const username  =  item.replace('@','');
              ProfileDataAPI(username)
              .then(response =>{
                if(response.length == 0) return;
                setProfileData(response)
                setProfileDialog(true)

              })


        }}><Text style={{color:'blue',fontWeight:'600',fontSize:18}}>{item}</Text>
        </TouchableOpacity>)
    })}

    </View>:null}


    {<DrawerProfileDialog 
    setClose={setClose} 
    onshow={profileDialog}
    navigation={navigation}
    Auth={Auth}
    profileImage={''}
    username={''}
    userStats={''}
    title={'Profile'}
    >
    <FlashList
    style={{paddingHorizontal:0}} 
ListHeaderComponent={ () =>
    profileDataSource.map((item,index) =>{
        return<ProfileItem navigation={navigation} item={item} index={index} data={profileDataSource} setData={setProfileData} />
        
    })
}
    
        />

    </DrawerProfileDialog>}


    </View>)
}
