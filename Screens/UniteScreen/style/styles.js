import { Platform, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  containerBackdrop: {
  
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  container: {
  
    width: '100%',
    height: Dimensions.get('window').height - 140,
   // backgroundColor:'#1E90FF',
    zIndex: -1,
    
    
  },
  wrapGroupHeart: {
    marginBottom: 70
  },
  selfView: {
    width: width,
    height: height,
    zIndex: -1
  },
  remoteView: {
    width: width,
    height: height,
  },
  listMessages: {
    flex: 1
  },
  wrapBottom: {
    zIndex: 100,
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },

  wrapBottomm: {
    position:'absolute',
    flexDirection:'column',
    alignItems:'flex-end',
  
    zIndex: 100,
    bottom: 10,
    width: '100%'
  },
  wrapBotttom: {
    zIndex: 200,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height:100
  },
  buttonCloseModal: {
    height: 40,
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  TextChat: {
    height: 40,
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    left: 15,
    color:'white',
    fontSize:20,
    fontWeight:'500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white'
  },
  wrapWebview: {
    flex: 0.8,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 20
  },

  wrapWebviewww: {
    position:'absolute',
    flex: 0.6,
    backgroundColor:'#1E90FF',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    width:'100%',
    height:500,
    shadowColor: "black",
   
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {
      height: 0.2,
      width: 0.2
    },
    bottom:0,
  
  },
  wrapWebviewwww: {
    position:'absolute',
    flex: 1,
    backgroundColor:'#1E90FF',
   
    width:'100%',
    height:500,
    shadowColor: "black",
   
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {
      height: 0.2,
      width: 0.2
    },
    bottom:0,
  
  },
  wrapWebvieww: {
    flex: 0.3,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  beginLiveStreamButton: {
    
    alignSelf:'flex-end',
    right:10,
    backgroundColor: '#0087ff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    borderRadius: 10
  },
  beginLiveStreamButtton: {
    
    alignSelf:'center',
    backgroundColor:'#ff6b6b',
    paddingVertical: 5,
    paddingHorizontal: 3,
    alignItems:'center',
    borderRadius: 2
  },

  beginLiveStreamTextt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white'
  },
  beginLiveStreamText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },

  finishLiveStreamButton: {
  
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    borderRadius: 10
  },

  wrapListMessages: {

    position: 'absolute',
    bottom: 70,
    zIndex:0,
    height: 300,
    width: width
  },
  chatItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5
  },
  messageItem: {
    flexDirection: 'column',
    marginHorizontal: 10,
    width:"50%",
    marginEnd:40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    zIndex:100
  },
  heartButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  textInput: {
    position: 'absolute',
    bottom: 4,
    left: 15,
    right: 120,
    zIndex:100,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 42
  },
  wrapIconHeart: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    width: 42,
    height: 42,
    zIndex:100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconHeart: {
    width: 42,
    height: 42
  },
  wrapAvatar: {
    width: 44,
    height: 44,
    borderRadius: 40,
    zIndex:50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconAvatar: {
    width: 44,
    height: 44,
    borderRadius:60,
    zIndex:100
  },
  name: {
    fontSize: 15,
    fontWeight: '700'
  },
  content: {
    fontSize: 13
  },
  wrapIconSend: {
    position: 'absolute',
    bottom: 5,
    right: 65,
    width: 42,
    height: 42,
    zIndex:100,
    borderRadius: 42,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  
  wrapIconnSend: {
    
    bottom: 5,
    
    width: 42,
    height: 42,
    zIndex:100,
    borderRadius: 42,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },

  wrapIconSendd: {
    position: 'relative',
    bottom: 5,
    right: 15,
    width: 42,
    height: 42,
    zIndex:100,
    borderRadius: 42,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSend: {
    width: 33,
    height: 33,
    zIndex:100
  },
  wrapLiveText: {
    position: 'absolute',
    top: height-10,
    left: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  liveText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white'
  },
  wrapIconView: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    right:40,
    alignItems: 'center'
  },

  wrapIconVieww: {
    height: 20,
    flexDirection: 'row',
    
    
  
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconView: {
    width: 25,
    height: 25,
    tintColor: 'white'
  },
  iconVieww: {
    width: 20,
    height: 20,
    tintColor: 'white'
  },
  wrapTextViewer: {
    marginLeft: 5
  },
  textViewer: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  }

});

export default styles;
