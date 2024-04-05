import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Profile from '../Screens/ProfileScreen/ProfileScreen';
import Signin from '../Screens/AuthScreen/SigninScreen';
import Signup from '../Screens/AuthScreen/SignupScreen';
import Account from '../Screens/AccountScreen/AccountScreen';
import Notifications from '../Screens/NotificationScreen/NotificationScreen';
import { Containerstyles } from '../StyleComponent/Style';




export function LoginFunction(Stack){



    return (
    
       
     <Stack.Navigator  initialRouteName={'Home'} >
       <Stack.Screen  name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Notifications" options={{presentation:'modal'}} component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen  name="Signup" component={Signup} />
        <Stack.Screen name="Signin"  component={Signin} />
  
        
      
     
       
        </Stack.Navigator>
        
       
    )
}


export function Authenticated(Stack){



    return (
    
       
     <Stack.Navigator style={Containerstyles.container} initialRouteName={'Home'}>
      <Stack.Screen  name="Home" options={{headerShown: false}} headerShown={false}  component={HomeScreen} />
        <Stack.Screen name="Notifications" options={{presentation:'modal'}} component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen  name="Signup" component={Signup} />
        <Stack.Screen name="Signin"  component={Signin} />
  
      
     
       
        </Stack.Navigator>
       
       
    )
}

