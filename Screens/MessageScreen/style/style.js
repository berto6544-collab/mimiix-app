import { StyleSheet,Dimensions} from 'react-native';


export const ListStyle = StyleSheet.create({

container:{
    flex:1,
    paddingTop:0,
    marginTop:0
    
},

listFeed:{

    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    paddingHorizontal:10,
    flex:1

},


commentBox:{


    backgroundColor:'light',
    paddingTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:5,
    width:'100%',

},



TextArea:{

    width:Dimensions.get('screen').width,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white'
},
TextAreaBase:{

    display:'flex',
    flexDirection:'column',
    paddingHorizontal:10,
    backgroundColor:'white',
    paddingBottom:10
}



})