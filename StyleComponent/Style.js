import { StyleSheet,Dimensions} from 'react-native';


export const Containerstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(240, 244, 248)',
      alignItems: 'center',
      justifyContent: 'center',
    },


    

    TopNav:{
      width:'100%',
      height:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:'lightgrey',
      padding:10
    },

  });


  
  export const Quotestyles = StyleSheet.create({

    QuoteBase: {
      
      alignItems: 'center',
      width:'100%',
      marginBottom:20,
      paddingHorizontal:5,
      paddingVertical:10
    },



  })


export const FeedItemstyles = StyleSheet.create({
    container: {
      paddingTop:20,
      flex:1,
      width:'100%',
      backgroundColor: 'rgb(240, 244, 248)',
      alignItems: 'center',
      marginBottom:20,
      paddingBottom:10
    },

FeedItemBottom:{
display:'flex',
flexDirection:'row',
alignItems:'center',
width:'100%',
justifyContent:'space-between',
paddingHorizontal:10,
paddingVertical:0
},

    FeedItem: {
      backgroundColor: '#fff',
      alignItems: 'center',
      marginBottom:20,
      borderRadius:10,
      shadowColor:'black',
      paddingVertical:10
    },

    TopNav:{
      width:'100%',
      height:100,
      paddingTop:30,
      backgroundColor:'rgb(240, 244, 248)',
      paddingHorizontal:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      

    },

    BottomNav:{
      width:'100%',
      height:70,
      paddingVertical:20,
      backgroundColor:'rgb(240, 244, 248)',
      paddingHorizontal:10,
      zIndex:80,
      display:'flex',
      flexDirection:'row',
      position:'absolute',
      bottom:0,
      alignItems:'center',
      justifyContent:'space-between',
      

    },
    

    AvatarBase:{
      width:'100%',
      alignItems:'center',
      display:'flex',
      flexDirection:'row',
      paddingHorizontal:5,
      paddingBottom:10,
      gap:5,

    },

    textUser:{

    }

  });



  export const PreviewURLstyles = StyleSheet.create({
    container: {
      margin:0,
      padding:0,
      width:'100',
      paddingBottom:40,
      backgroundColor:'lightgrey'

    },

    PreviewImage: {
      width:'100%',
      height:Dimensions.get('window').height -670,
      margin:0,
      padding:0,
      objectFit:'cover',
    },

    TopNav:{
      width:'100%',
      height:50,
      
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:10,

    },

    AvatarBase:{
      width:'100%',
      alignItems:'center',
      display:'flex',
      flexDirection:'row',
      paddingBottom:10,
      gap:5,

    },

    

  });