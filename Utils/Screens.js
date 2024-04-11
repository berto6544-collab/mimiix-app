import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Profile from '../Screens/ProfileScreen/ProfileScreen';
import Signin from '../Screens/AuthScreen/SigninScreen';
import Signup from '../Screens/AuthScreen/SignupScreen';
import Reset from '../Screens/AuthScreen/ResetPasswordScreen';
import Account from '../Screens/AccountScreen/AccountScreen';
import Notifications from '../Screens/NotificationScreen/NotificationScreen';
import Comment from '../Screens/CommentScreen/CommentScreen';
import PostScreen from '../Screens/PostScreen/PostScreen';
import Creator from '../Screens/CreatorScreen/CreatorScreen';
import SuportScreen from '../Screens/SupportScreen/SupportScreen';
import { Containerstyles } from '../StyleComponent/Style';
import BlogScreen from '../Screens/BlogScreen/BlogScreen';
import WebScreen from '../Screens/WebScreen/WebScreen';
import MediaScreen from '../Screens/MediaScreen/MediaScreen';
import { Button, Dimensions } from 'react-native';
import PostsScreen from '../Screens/PostScreen/PostsScreen';





export function LoginFunction(Stack){



    return (
        
       
     <Stack.Navigator  initialRouteName={'Home'} >
       <Stack.Screen  name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen  name="passwordForgot" component={Reset} />
        <Stack.Screen  name="Support" component={SuportScreen} />
        <Stack.Screen  name="Signup"  component={Signup} />
        <Stack.Screen name="Comment" options={{presentation:'modal'}} component={Comment} />
        <Stack.Screen name="Web"  options={{presentation:'modal'}} component={WebScreen} />
        <Stack.Screen name="Media"  options={{presentation:'modal'}} component={MediaScreen} />
        <Stack.Screen  name="Blog" component={BlogScreen} />
        <Stack.Screen name="Signin"   component={Signin} />
        </Stack.Navigator>
        
       
    )
}


export function Authenticated(Stack,Tab){

    

    return (
    
       
     <Stack.Navigator style={Containerstyles.container} initialRouteName={'Home'}>
        <Stack.Screen  name="Home" options={{headerShown: false}} headerShown={false}  component={HomeScreen} />
        <Tab.Screen name="Notifications"  component={Notifications} />
        <Tab.Screen name="Profile" component={Profile} />
        <Stack.Screen  name="Blog" component={BlogScreen} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Comment" options={{presentation:'modal'}} component={Comment} />
        <Stack.Screen  name="Signup" component={Signup} />
        <Stack.Screen  name="CreatorPortal" component={Creator} />
        <Stack.Screen  name="Support" component={SuportScreen} />
        <Stack.Screen name="Web"  options={{presentation:'modal'}} component={WebScreen} />
        <Stack.Screen name="Media"  options={{presentation:'modal'}} component={MediaScreen} />
        <Stack.Screen name="Signin"  component={Signin} />
        <Stack.Screen name="CreatePost"  options={{presentation:'modal'}} component={ PostScreen} />
        <Stack.Screen name="Post" component={ PostsScreen} />
        </Stack.Navigator>
       
       
    )
}

