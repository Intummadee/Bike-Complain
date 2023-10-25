import React from 'react'
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // v.6
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// import screen
import login from "../screens/login";
import signup from "../screens/signup";
import home from "../screens/home";
import listWin from "../screens/listWin";
import detailWin from "../screens/detailWin";
import form from "../screens/form";
import myProfile from "../screens/myProfile";
import history from "../screens/history";
import detailList from "../screens/detailList";
import updateForm from "../screens/updateForm";


import screen1 from "../screens/HomeScreen/screen1";
import screen2 from '../screens/HomeScreen/screen2';
import screen3 from '../screens/HomeScreen/screen3';


// import Icon
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// testUpload
import testUpload from "../screens/testUpload";




const authen = () => { 
    return(
        <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}} >
            <Tab.Screen name='login' component={login} />
            {/* <Tab.Screen name='testUpload' component={testUpload} /> */}
            <Tab.Screen name='signup' component={signup} />
        </Stack.Navigator>
    )
}



const homeStack = () => { 
    return(
        <Stack.Navigator screenOptions={{headerShown:true, 
            headerTintColor: '#FF9770',
            headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: '#FF9770'}  
        }}>
            <Stack.Screen name='home' component={home} options={{headerShown:false}} />
            <Stack.Screen name='screen1' component={screen1} 
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true}) }   />
            <Stack.Screen name='screen2' component={screen2}
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true}) }
            />
            <Stack.Screen name='screen3' component={screen3}
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true}) }
            />
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


// icon ฝั่ง admin
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ของฝั่งadmin
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();


// screenฝั่งadmin
import Dashboard from "../screens/AdminScreen/dashboard"
import Complaint from '../screens/AdminScreen/complaint';
import WinService from '../screens/AdminScreen/winservice';
import WinList from '../screens/AdminScreen/WinList';
import Windetail from '../screens/AdminScreen/Windetail';


const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerTitle: "Dashboard",}}/>
            {/* <Stack.Screen name='Complaint' component={Complaint} options={{ headerTitle: "รายการการร้องเรียน",}}/> */}
        </Stack.Navigator>
    )
}

const WinServiceStack = () => {
    return(
        <Stack.Navigator initialRouteName='จุดบริการมอเตอร์ไซค์รับจ้าง' screenOptions={{ headerShown: true}}>
            <Stack.Screen name='จุดบริการมอเตอร์ไซค์รับจ้าง' component={WinService} options={{ title: "จุดบริการมอเตอร์ไซค์รับจ้าง",}}/>
            <Stack.Screen name='WinList' component={WinList}/>
            <Stack.Screen name='WinDetail' component={Windetail}/>
        </Stack.Navigator>
    )
}

const ComplaintStack = () => {
    return(
        <Stack.Navigator initialRouteName='complaint' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white'}  }}>
            <Stack.Screen name='รายการการร้องเรียน' component={Complaint} options={{ headerTitle: "รายการการร้องเรียน",}} />
        </Stack.Navigator>
    )
}


const admin = () => {
    return(
        <Drawer.Navigator initialRouteName="รายการการร้องเรียน" screenOptions={{ headerShown:false }} >
            <Drawer.Screen name="Dashboard" component={DashboardStack}options={{drawerLabel: "Dashboard",drawerIcon: ({ color }) => {
                return <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />;},
            }}/>
            <Drawer.Screen name="จุดบริการมอเตอร์ไซค์รับจ้าง" component={WinServiceStack} options={{ drawerLabel: "จุดบริการมอเตอร์ไซค์รับจ้าง", drawerIcon: ({ color }) => {
                return <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color={color} />;
            },}}/>
            <Drawer.Screen name="รายการการร้องเรียน" component={ComplaintStack} options={{drawerLabel: "รายการการร้องเรียน", drawerIcon: ({ color }) => {
                return <FontAwesome5 name="envelope" size={24} color={color} />;},
            }}/>


        </Drawer.Navigator>
    )
}



const MainNavigator = () => { 
    return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="admin" screenOptions={{headerShown:false}}>
                <Stack.Screen name="authen" component={authen} />
                <Stack.Screen name='tab' component={tab} />
                <Stack.Screen name="admin" component={admin} />
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