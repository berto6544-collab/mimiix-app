import React from "react";
import { Text,View } from "react-native";
import { Icon } from "@rneui/themed";
import { ProfileDataAPI } from "../../API/API";

export default function Profile({route,navigation}){
    const { username,isMine} = route.params;
    const [dataSource,setDataSource] = React.useState([])

React.useEffect(()=>{


    navigation.setOptions({
        
            
        title:username,
        headerRight: () => (

            <Icon name={'bars'} type={'ant-design'} />
          
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

            <Icon name={'bars'} type={'ant-design'} />
          
        ),
      });
    }else{

        navigation.setOptions({
        
            
            title:username,
            headerRight: () => (
    
                <Icon name={'bars'} type={'ant-design'} />
              
            ),
          });

    }


})


},[])


    return(<Text >Profile Screen</Text>)
}