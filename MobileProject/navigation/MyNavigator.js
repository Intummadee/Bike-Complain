import React from 'react'
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // v.6
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// import screen
import Login from "../screens/login";
import Signup from "../screens/signup";
import Home from "../screens/home";
import ListWin from "../screens/listWin";
import DetailWin from "../screens/detailWin";
import Form from "../screens/form";
import MyProfile from "../screens/myProfile";
import History from "../screens/history";
import DetailListScreen from "../screens/detailList";
import UpdateForm from "../screens/updateForm";


import Screen1 from "../screens/HomeScreen/screen1";
import Screen2 from '../screens/HomeScreen/screen2';
import Screen3 from '../screens/HomeScreen/screen3';
 


// import Icon
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const StackAdmin = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

// testUpload
import testUpload from "../screens/testUpload";




const Authen = () => { 
    return(
        <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}} >
            <TabStack.Screen name='login' component={Login} />
            {/* <Tab.Screen name='testUpload' component={testUpload} /> */}
            <TabStack.Screen name='signup' component={Signup} />
        </Stack.Navigator>
    )
}



const HomeStack = () => { 
    return(
        <Stack.Navigator screenOptions={{
            headerShown:true, 
            headerTintColor: '#FF9770',
            headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: '#FF9770'}  
        }}>
            <Stack.Screen name='home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='screen1' component={Screen1} 
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true, 
                    headerTitleStyle: {
                        fontSize: 20, // Set the desired font size here
                      },
                      headerTitleContainerStyle: {
                        width: '70%', // Set the maximum width of the header title container
                        alignItems: 'center', // Center the title horizontally
                      },
                      headerTitleAlign: 'center', // Center the title vertically
                      
                
                })}    />
            <Stack.Screen name='screen2' component={Screen2}
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true,
                    headerTitleStyle: {
                        fontSize: 20, // Set the desired font size here
                        headerTitleNumberOfLines: 2, // Set the number of lines before wrapping
                        headerTitleContainerStyle: {
                        width: '70%', // Set the maximum width of the header title container
                        },
                      }
                }) }
            />
            <Stack.Screen name='screen3' component={Screen3}
                options={({ route }) => ({title: route.params.item.id.toString() , headerShown:true,
                    headerTitleStyle: {
                        fontSize: 20, // Set the desired font size here
                        headerTitleNumberOfLines: 2, // Set the number of lines before wrapping
                        headerTitleContainerStyle: {
                        width: '70%', // Set the maximum width of the header title container
                        },
                      }
                }) }
            />
        </Stack.Navigator>
    )
 }


// Import map
import FindWinPlace from "../screens/maps/FindWinPlace"

const Map = () => { 
    return(
        <Stack.Navigator initialRouteName='FindWinPlace' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white'}, headerTintColor: 'white',  }}>
            <Stack.Screen name='FindWinPlace' component={FindWinPlace} options={{headerShown:false}}/>
            <Stack.Screen name='listWin' component={ListWin}  options={({ route }) => ({ title: route.params.title.toString() })}  />
            <Stack.Screen name='detailWin' component={DetailWin} options={({ route }) => ({ title: route.params.routeData.name.toString() })}  />
            <Stack.Screen name='form' component={Form} options={{title:"ฟอร์มร้องเรียน"}}  />
        </Stack.Navigator>
    )
}

const Profile = () => { 
    return(
        <Stack.Navigator initialRouteName='myProfile' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white'}, headerTintColor: 'white',  }}>
            <Stack.Screen name='myProfile' component={MyProfile} options={{title:'บัญชีของฉัน'}} />
            <Stack.Screen name='history' component={History} options={{title:'ประวัติการร้องเรียน'}} />
            <Stack.Screen name='detailList' component={DetailListScreen} options={{title:'รายละเอียดการร้องเรียน'}} />
            <Stack.Screen name='updateForm' component={UpdateForm} options={{title:'รายละเอียดการร้องเรียน'}} />
        </Stack.Navigator>
    )
}


const Tab = () => { 
    return(
        <TabStack.Navigator initialRouteName='homeStack' screenOptions={{ 
            headerShown:false ,
            tabBarActiveTintColor: "#FF724C", 
            tabBarStyle: { backgroundColor: "#004466" }, 
            tabBarLabelStyle: { fontSize: 15 },
            tabBarInactiveTintColor: 'gray',
        }}>
            <TabStack.Screen name='homeStack' component={HomeStack} options={{ tabBarIcon: ({ color, size }) => {
                return <AntDesign name="home" size={24} color={color} />;  
            }, }}  />
            <TabStack.Screen name='map' component={Map} options={{ tabBarIcon: ({ color, size }) => {
                return <Feather name="map-pin" size={24} color={color} />;  
            },}}  />
            <TabStack.Screen name='profile' component={Profile} options={{ tabBarIcon: ({ color, size }) => {
                return <AntDesign name="user" size={24} color={color} />;  
            },}}  />
        </TabStack.Navigator>
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

import DetailComplaint from '../screens/AdminScreen/detailComplaint';

const DashboardStack = () => {
    return (
        <StackAdmin.Navigator initialRouteName='Dashboard' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white', fontSize:13}  }}>
            <StackAdmin.Screen name='Dashboard' component={Dashboard} options={{ headerTitle: "Dashboard", headerShown:false}}/>
            {/* <Stack.Screen name='Complaint' component={Complaint} options={{ headerTitle: "รายการการร้องเรียน",}}/> */}
        </StackAdmin.Navigator>
    )
}

const WinServiceStack = () => {
    return(
        <StackAdmin.Navigator initialRouteName='จุดบริการมอเตอร์ไซค์รับจ้าง' screenOptions={{headerShown:true ,headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'},  headerTitleStyle: {color: 'white', fontSize: 15},  headerTintColor: 'white',color:'white' }}>
            <StackAdmin.Screen name='จุดบริการมอเตอร์ไซค์รับจ้าง' component={WinService} options={{ title: "จุดบริการมอเตอร์ไซค์รับจ้าง",  }}/>
            <StackAdmin.Screen name='WinList' component={WinList} 
            options={
                ({ route }) => ({
                    title: route.params.service.toString(),
                }) }   
                />
            <StackAdmin.Screen name='WinDetail' component={Windetail} options={
                ({ route }) => ({
                    title: route.params.routeData.name.toString(),
                })
                  }/> 
        </StackAdmin.Navigator>
    )
}

const ComplaintStack = () => {
    return(
        <StackAdmin.Navigator initialRouteName='allComplaint' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'}, headerTitleStyle: {color: 'white', fontSize:13}  }}>
            <StackAdmin.Screen name='allComplaint' component={Complaint} options={{ headerTitle: "รายการการร้องเรียนทั้งหมด", headerShown:false}} />
            <StackAdmin.Screen name='รายละเอียดการร้องเรียน' component={DetailComplaint} options={{headerShown:true, headerTitle:"รายละเอียดการร้องเรียน", headerShown:false}}  />
        </StackAdmin.Navigator>
    )
}


const Admin = () => {
    return(
        <Drawer.Navigator initialRouteName="รายการการร้องเรียน" screenOptions={{headerShown:true , headerTitleAlign: 'center', headerStyle: {backgroundColor: '#004466'},  headerTitleStyle: {color: 'white', fontSize: 15},  headerTintColor: 'white',color:'white'
        }} >
            <Drawer.Screen name="Dashboard" component={DashboardStack} options={{ headerShown:true , drawerLabel: "Dashboard",drawerIcon: ({ color }) => {
                return <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />;},
            }}/>
            <Drawer.Screen name="จุดบริการมอเตอร์ไซค์รับจ้าง" component={WinServiceStack} options={{ drawerLabel: "จุดบริการมอเตอร์ไซค์รับจ้าง", drawerIcon: ({ color }) => {
                return <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color={color} />;},headerShown:false}}
            />
            <Drawer.Screen name="รายการการร้องเรียน" component={ComplaintStack} options={{headerShown:true, drawerLabel: "รายการการร้องเรียน", drawerIcon: ({ color }) => {
                return <FontAwesome5 name="envelope" size={24} color={color} />;},
            }}/>


            <Drawer.Screen name="ออกจากระบบ"  options={{headerShown:true, drawerLabel: "ออกจากระบบ", headerShown:false, drawerActiveTintColor: "tomato", }} component={Authen} />



        </Drawer.Navigator>
    )
}



const MainNavigator = () => { 
    return(
        <NavigationContainer>
            <Stack.Navigator  initialRouteName="Authen" screenOptions={{headerShown:false}}>
                <Stack.Screen name="authen" component={Authen} />
                <Stack.Screen name='tab' component={Tab} />
                <Stack.Screen name="admin" component={Admin} />
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