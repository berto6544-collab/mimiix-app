import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { Quotestyles } from "../../StyleComponent/Style";
import { GetQuote } from "../../API/API";



export default Quote = ({Auth,navigation}) =>{

    const [dataSource,setDataSource] = React.useState([]);


    React.useEffect(()=>{

        GetQuote('').then(response=>{
            setDataSource(response)
        })


    },[])

    if(dataSource.length > 0){
    return(
    <TouchableOpacity onPress={()=>{
        navigation.navigate('Profile',{username:dataSource[0].username});
    }} activeOpacity={1} style={[Quotestyles.QuoteBase,{alignSelf:'center',marginTop:-20}]}>
    <Text style={{fontWeight:'700',fontSize:16,paddingTop:0}}>{dataSource[0].Quote} - {dataSource[0].Name} - Posted By <Text onPress={()=>{

    navigation.navigate('Profile',{username:dataSource[0].username});

    }} style={{color:'#0086ff'}}>{dataSource[0].username}</Text></Text>


    </TouchableOpacity>)
    }
    else{
    return(null)
    }

}