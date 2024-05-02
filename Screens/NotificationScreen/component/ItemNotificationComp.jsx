import React from "react";
import { Text,Card,Image,Avatar, Icon,Tab } from "@rneui/themed";
import { Dimensions, TouchableOpacity, View, StyleSheet} from "react-native";

export default ItemNotificationComp = ({post,index,navigation}) =>{




        return(
        <TouchableOpacity key={index}  onPress={()=>{
        
           if(post.Posttype == 4){
               //started following you
               
            navigation.navigate('Profile',{username: post.PostUsername})
           }else if(post.Posttype == 3){
               //started live
        
           }
           else if(post.Posttype == 5){
            //started Invoice
          
            navigation.navigate('Web',{url: 'https://mymiix.com/public/invoice.php?token='+post.Token})
        }
           
           
           else{
        
            if(post.UniqId != ""){
                navigation.navigate('Post',{uniqid: post.UniqId,data:[]})
            }else{
                
            }
        
        
           }
        
        
        }} style={styles.feedItem}>
        <View  style={styles.feedProfileItem}>
        
        <Avatar source={{uri: post.ProfileImg}} size={50} rounded={true} />
        <View style={{flexDirection: "column", width:'100%'}}>
        <Text  style={styles.name}>{post.PostName}</Text>
        <Text style={{fontWeight:'200',color:'black'}}>{post.PostStatus}</Text>
        
        </View>
        
        </View>
        
        
        
        
        </TouchableOpacity>
        
        
        )
        
        

}



const styles = StyleSheet.create({
    
    header:{
   
    paddingBottom: 8,
    backgroundColor:'white',
    alignItems: "center",
    
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {height:5},
    shadowRadius: 15,
    shadowOpacity:0.2,
    zIndex:5,
    width: '100%',
    
    
    },
    

    bottom:{
        paddingBottom: 20,
        backgroundColor: 'white',
        
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height:5},
        shadowRadius: 15,
        shadowOpacity:0.2,
        zIndex:5,
        width: '100%',
        
        
        },
    headerTitle: {
    
        fontSize: 20,
        fontWeight: '500',
    
    },
    
    feed: {
    marginHorizontal:0,
    zIndex: 1,
    backgroundColor: 'white',
    },
    
    feedItem: {
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    flexDirection: "column",
    marginBottom:10,
    zIndex: 1
    
    },
    feedProfileItem: {
      backgroundColor: 'white',
      borderRadius: 30,
      alignItems:'center',
      gap:5,
      flexDirection: "row",
      
      
    
    },
    
    
    avatar: {
    width: 50,
    height:50,
    borderRadius:28,
    marginRight:16
    
    
    },
    name:{
    fontSize: 15,
    fontWeight: "500",
    color: 'black',
    
    },
    
    timestamp:{
        fontSize: 11,
        color: 'black',
        marginTop: 4
    
    },
    post: {
        marginTop: 16,
        marginBottom: 16,
        fontSize:14,
        color: "#838899",
       
    
    },
    
    story:{
        flex:1,
        flexDirection: "row",
        zIndex:12,
        width: '100%',
        marginTop: "20px",
       
    
    },
    postImage:{
    width: "100%",
    marginHorizontal: 0,
    height: 300,
    flex:1,
    borderRadius: 5,
    resizeMode: 'stretch',
    marginVertical: 16,
    
    
    }
    
    })