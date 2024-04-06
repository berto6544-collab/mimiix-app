import React from "react";
import { Text,TouchableOpacity,View } from "react-native";
import { Icon } from "@rneui/themed";
import { ProfileDataAPI } from "../../API/API";
import AvatarItems from "./components/AvatarItems";
import { Profilestyles } from "./styles/styles";
import UserCounts from "./components/Status";
import { AuthContext } from "../../AuthContext/context";
import DrawerProfileDialog from "../../Dialog/DrawerProfileDialog";
import DrawerDialog from "../../Dialog/DrawerDialog";

import DrawerCompMain from "../../component/DrawerComponents/DrawerCompMain";
import DrawerProfileCompMain from "../../component/DrawerComponents/DrawerProfileCompMain";

export default function Profile({route,navigation}){
    const { username,isMine} = route.params;
    const [dataSource,setDataSource] = React.useState([])
    const [isVisible,setIsVisible] = React.useState(false);
    const Auth = React.useContext(AuthContext);

React.useEffect(()=>{


    navigation.setOptions({
        
            
        title:username,
        headerRight: () => (

            <TouchableOpacity onPress={()=>{
                setIsVisible(true)
            }}><Icon name={'bars'} type={'ant-design'} /></TouchableOpacity>
          
        ),
      });



ProfileDataAPI(username).then((response)=>{


    
    setDataSource(response)

    if(response[0].MyUserName != response[0].UserName){
    navigation.setOptions({
        
        

        headerTitle:()=>(
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}} >
                <Text style={{fontSize:17,fontWeight:'600'}}>{username}</Text>
                {response[0].verified == "1"?<Icon name={'verified'} fontSize={15} type={'material-icons'} />:null}
                </View>
        ),
        headerRight: () => (

            <TouchableOpacity onPress={()=>{setIsVisible(true)}} ><Icon name={'bars'} type={'ant-design'} /></TouchableOpacity>
          
        ),
      });
    }else{

        navigation.setOptions({
        
            
            title:username,
            headerRight: () => (
    
                <TouchableOpacity onPress={()=>{setIsVisible(true)}} ><Icon name={'bars'} type={'ant-design'} /></TouchableOpacity>
              
            ),
          });

    }


})


},[])

const content = dataSource.map((item,index)=>{

    return(
        <View style={Profilestyles.container} key={index} >
            <AvatarItems data={item} index={index}  username={item.UserName} profileImage={item.ProfileImage} userStats={''} />
            <UserCounts data={item} index={index}  /> 





{item.MyuserId == item.OtheruserId?<DrawerDialog
setClose={()=>{
    setIsVisible(false)
}}
Auth={Auth}
username={item.UserName}
profileImage={item.ProfileImage}
userStats={item.UsersStat}
navigation={navigation} onshow={isVisible} title={''}   >
<DrawerCompMain  setClose={()=>{setIsVisible(false)}}navigation={navigation} Auth={Auth} />

</DrawerDialog>

:
<DrawerProfileDialog
setClose={()=>{
    setIsVisible(false)
}}
Auth={Auth}
username={item.UserName}
profileImage={item.ProfileImage}
userStats={item.UsersStat}
navigation={navigation} onshow={isVisible} title={''}   >

<DrawerProfileCompMain setStart={0} data={item}  setClose={()=>{setIsVisible(false)}} navigation={navigation} Auth={Auth} />

</DrawerProfileDialog>}




        </View>
    )

})


    return(
    <View style={Profilestyles.container} >
    
{content}

    </View>)
}