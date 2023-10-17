import React from 'react'
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // v.6
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// import screen
import login from "../screens/login";
import signup from "../screens/signup";
import home from "../screens/home";
import screen1 from "../screens/screen1";
import listWin from "../screens/listWin";
import detailWin from "../screens/detailWin";
import form from "../screens/form";
import myProfile from "../screens/myProfile";
import history from "../screens/history";
import detailList from "../screens/detailList";
import updateForm from "../screens/updateForm";

// import Icon
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const authen = () => { 
    return(
        <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}} >
            <Tab.Screen name='login' component={login} />
            <Tab.Screen name='signup' component={signup} />
        </Stack.Navigator>
    )
}


const homeStack = () => { 
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={home} />
            <Stack.Screen name='screen1' component={screen1} 
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true}) }   />
            {/* <Stack.Screen name='screen2' component={screen2} /> */}
        </Stack.Navigator>
    )
 }

const map = () => { 
    return(
        <Stack.Navigator initialRouteName='listWin' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white'}  }}>
            {/* <Stack.Screen name='map' component={map}/> */}
            <Stack.Screen name='listWin' component={listWin}  />
            <Stack.Screen name='detailWin' component={detailWin}/>
            <Stack.Screen name='form' component={form}/>
        </Stack.Navigator>
    )
}

const profile = () => { 
    return(
        <Stack.Navigator initialRouteName='myProfile' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white'}  }}>
            <Stack.Screen name='myProfile' component={myProfile} options={{title:'บัญชีของฉัน'}} />
            <Stack.Screen name='history' component={history} options={{title:'ประวัติการร้องเรียน'}} />
            <Stack.Screen name='detailList' component={detailList} options={{title:'รายละเอียดการร้องเรียน'}} />
            <Stack.Screen name='updateForm' component={updateForm} options={{title:'รายละเอียดการร้องเรียน'}} />
        </Stack.Navigator>
    )
}


const tab = () => { 
    return(
        <Tab.Navigator initialRouteName='homeStack' screenOptions={{ 
            headerShown:false ,
            tabBarActiveTintColor: "#FF724C", 
            tabBarStyle: { backgroundColor: "#004466" }, 
            tabBarLabelStyle: { fontSize: 15 },
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tab.Screen name='homeStack' component={homeStack} options={{ tabBarIcon: ({ color, size }) => {
                return <AntDesign name="home" size={24} color={color} />;  
            }, }}  />
            <Tab.Screen name='map' component={map} options={{ tabBarIcon: ({ color, size }) => {
                return <Feather name="map-pin" size={24} color={color} />;  
            },}}  />
            <Tab.Screen name='profile' component={profile} options={{ tabBarIcon: ({ color, size }) => {
                return <AntDesign name="user" size={24} color={color} />;  
            },}}  />
        </Tab.Navigator>
    )
}


const MainNavigator = () => { 
    return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="tab" screenOptions={{headerShown:false}}>
                <Stack.Screen name="authen" component={authen} />
                <Stack.Screen name='tab' component={tab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
 }


const MyNavigator = () => {
  return (
    MainNavigator()
  )
}
export default MyNavigator