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
      alignContent:'flex-start',
      width:Dimensions.get('screen').width,
      marginBottom:20,
      paddingHorizontal:5
    },



  })

  export const StorieStyle = StyleSheet.create({

    StoryBase:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      paddingTop:15,
      paddingHorizontal:5
    }


  })


export const FeedItemstyles = StyleSheet.create({
    container: {
      flex:1,
      width:'100%',
      position:'relative',
      backgroundColor: 'rgb(240, 244, 248)',
      alignItems: 'center',
      marginBottom:40,
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
      backgroundColor:'rgb(240, 244, 248)',
      paddingHorizontal:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingBottom:10,
      

    },

    BottomNav:{
      width:'100%',
      paddingTop:10,
      backgroundColor:'white',
      paddingHorizontal:15,
      paddingBottom:10,
      zIndex:80,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      

    },
    

    AvatarBase:{
      width:'100%',
      alignItems:'center',
      display:'flex',
      flexDirection:'row',
      position:'relative',
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
      width:'100%',
      backgroundColor:'lightgrey',
      height:Dimensions.get('window').height -470,
      position:'relative'

    },

    PreviewImage: {
      width:'100%',
      height:Dimensions.get('window').height -470,
      margin:0,
      padding:0,
      objectFit:'cover',
    },

    

    

  });