import { View, Text, StyleSheet,Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'

// import icon
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

// Redux
import { useSelector, useDispatch } from "react-redux";


const MyProfile = ({ navigation }) => {
    const data = useSelector((state) => state.myReducer.user_data) // {email: '64070257@kmitl.ac.th', history: Array(0), password: '1111', name: 'judas'}
    
    return (
    <View style={styles.list}>
      <View style={styles.box}>
        <View style={{width:"100%", alignItems:'center'}}>
            <Image style={styles.pic} source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Service_Points%2Fmr-anonymous.png?alt=media&token=dcf6f7bb-6940-434e-8aae-8e9aee445bf1"}}/>
            {/* {data.email} กับ {data.name} ค่อยแก้ทีหลัง  */}
            <Text style={{fontWeight:'bold' , fontSize:20}}>{data.email}</Text>
            <Text style={{color:'grey', fontWeight:'bold'}}>{data.name}</Text>
        </View>
        <View  style={{width:"100%", alignItems:'center', marginTop:"20%"}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // ประวัติการร้องเรียน
                    console.log("ประวัติการร้องเรียน");
                    navigation.navigate("history")
                }}>
                    <View style={{ width:'100%',  justifyContent:'center',alignItems:'center', flexDirection:'row' }}>
                        <Ionicons name="ios-time-outline" size={20} color="#009C87"  style={{}} />
                        <Text style={{color:'#009C87', paddingLeft:'5%'}}>ประวัติการร้องเรียน</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {marginTop:"7%", borderColor:"#C35257"}]}
                onPress={() => {
                    console.log("ออกจากระบบ");
                    // navigation.navigate("form", {routeData: data})
                    navigation.navigate("authen")
                }}>
                    <View style={{ width:'100%',  justifyContent:'center',alignItems:'center', flexDirection:'row' }}>
                        <FontAwesome name="sign-out" size={20} color="#C35257" />
                        <Text style={{color:'#C35257', paddingLeft:'5%'}}>ออกจากระบบ</Text>
                    </View>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#EEEBEB",
    },
    box: {
        flex:1, 
        width:"80%", 
        justifyContent:'center', 
        alignItems:'center'
    },
    pic: {
        width: 100, 
        height: 100,
        borderRadius:50,
    },
    button: {
        borderRadius: 20,
        width:"70%",
        padding: 10,//ขนาดปุ่ม
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'space-around',
        borderColor:"#009C87",
        borderWidth:2,
    },
     
});

export default MyProfile