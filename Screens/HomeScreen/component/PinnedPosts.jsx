import React,{useRef} from "react";
import { GetPinnedPost } from "../../../API/API";
import FeedItemPinned from "../../../component/feedItems/feedItemPinned";


export default PinnedPosts = ({navigation,Auth}) =>{

const [dataSource,setDataSource] = React.useState([])
    React.useEffect(()=>{
        GetPinnedPost()
        .then(response=>{
            if(response.length == 0)return;
            setDataSource(response)
        })


    },[])


const content = dataSource.map((item,index) => {

return(<FeedItemPinned dataSource={dataSource} setDataSource={setDataSource} rewarded={Auth.rewarded} isProfile={false} navigation={navigation} Auth={Auth}  index={index} data={item} />)

})

if(dataSource.length == 0){
return(<></>)
}

else{
    return(content)
}




}