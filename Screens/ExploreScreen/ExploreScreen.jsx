import React,{useRef} from "react";
import { Card,Image,Avatar, Icon } from "@rneui/themed";
import {View,Text, Dimensions, TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Trending from "./component/Trending";
import UsersComp from "./component/UsersComp";
import UniteViewers from "./component/UniteViewers";


export default ExploreScreen = ({route,navigation}) =>{

const [index,setIndex] = React.useState(0);

    
return(
<SafeAreaView edges={['bottom']} style={{flex:1}}>

<View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5,paddingHorizontal:10,backgroundColor:'white',width:Dimensions.get('screen').width,height:60}}>
<TouchableOpacity onPress={()=>setIndex(0)}><Text style={{color: index == 0?'#007bff':'black',fontSize:15}}>Trending</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>setIndex(1)}><Text style={{color: index == 1?'#007bff':'black',fontSize:15}}>People</Text></TouchableOpacity>
{/*<TouchableOpacity onPress={()=>setIndex(2)}><Text style={{color: index == 2?'#007bff':'black',fontSize:15}}>Unite</Text></TouchableOpacity>*/}

</View>

{index == 0?<Trending navigation={navigation} />: index == 1?<UsersComp navigation={navigation} /> : <UniteViewers navigation={navigation} />}




</SafeAreaView>)

}