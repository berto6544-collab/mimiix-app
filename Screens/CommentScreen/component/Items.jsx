import React from "react";
import { Avatar } from "@rneui/themed";
import { View,Text,Button } from "react-native";
import { ListStyle } from "../Style/style";
import { OpenUrl } from "../../../Utils/URL";
import { CommentsDeleteAPi, CommentsHideAPi } from "../../../API/API";


export default Items = ({item,index,dataSource,setDataSource,isPinned}) => {

const CommentHide = () =>{


    CommentsHideAPi(item.postsId,item.commentId)
    .then(res=>{


    })

    dataSource.splice(index,1);
    setDataSource([...dataSource])

}


const CommentDelete = () =>{


    
    CommentsDeleteAPi(item.postsId,item.commentId)
    .then(res=>{


    })

    dataSource.splice(index,1);
setDataSource([...dataSource])

}

return(<View style={{padding:10,width:'100%',alignItems:'flex-start',backgroundColor:'white',marginBottom:isPinned?0:10}} key={index} >
    {isPinned?<Text>pinned to the top</Text>:null}

<View style={[ListStyle.commentBox,{width:'100%',justifyContent:'space-between',alignItems:'center'}]}>
    <View style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'flex-start',gap:5}}><Avatar size={50} rounded={true} source={{uri:item?.Commentedimg}} />
    <View style={{display:'flex',flexWrap:'wrap',flexDirection:'column',alignItems:'flex-start'}}>
    <Text style={{fontSize:16,fontWeight:'700'}}>{item?.CommentedBy}</Text>
    <Text style={{paddingRight:45,flexWrap:'wrap'}}>{item?.Comment}</Text>
    </View>
    </View>


    {isPinned && item?.PostsUserid == item?.MyUserid?<Button title={'UnPin'}></Button>:null}

    {!isPinned && item?.PostsUserid == item?.MyUserid?<Button title={'Pin'}></Button>:null}
    </View>

    {!isPinned && item?.PostsUserid == item?.MyUserid || !isPinned && item?.CommentsUserid == item?.MyUserid?<View style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'flex-end'}}>
    <Button onPress={CommentHide} title={'Hide'}></Button>
    <Button onPress={CommentDelete} title={'Delete'}></Button>
    </View>:null}

</View>)

}