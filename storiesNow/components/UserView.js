/* eslint-disable */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import { StackActions } from '@react-navigation/native';

let storedObject = {};
class UserView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

componentDidMount(){
//console.log(this.props.name);


}
 


  render() {
    const {
      props,
    } = this;


    return (
      <View style={styles.userView}>
      {props.name?<TouchableOpacity onPress={()=>{
      props.onEditOpen();


}} style={{backgroundColor:'rgba(83,0,235,0.5)',padding:5}}><Text  style={{color:'white',fontWeight:'600'}}>Edit</Text></TouchableOpacity>:<></>}
        <FastImage
          source={{ uri: props.profile,priority:FastImage.priority.high }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=>{
           props.dataS.navigate('Profile',{Id: props.name})
         }}><Text style={styles.name}>{props.name}</Text></TouchableOpacity>
         <Text style={[styles.time,{color:'yellow'}]}>{props.story.time}</Text>
         
        </View>
        <TouchableOpacity onPress={props.onClosePress}>
          <Icon
            name="close"
            color="white"
            size={25}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
});

export default UserView;
