import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, TouchableOpacity } from 'react-native';
import {useState} from 'react';


// firebase
import firebase from "../database/firebaseDB";

// Redux
import { useSelector, useDispatch } from "react-redux"
import { putUserData } from "../store/actions/myAction";

const signup = ({navigation}) => {

    // Redux
    const dispatch = useDispatch();
    const putDataUser = (item) => {
        dispatch( putUserData(item) ); //ค่าที่ส่งไปเก็บ = = {name: 'เฟรม', password: '1111', email: '64070257@kmitl.ac.th', history: Array(1)}
    };  

    // Validation Form 
    const [showIncorrect, setIncorrect] = useState(false);
    const [showIncorrectConfirm, setIncorrectConfirm] = useState(false);

    // Firebase
    const subjCollection = firebase.firestore().collection("Users");
    const addUSer = () => {    
        if(userName=="" || userEmail=="" || userPassword==""){
            setIncorrect(true);
        }
        else if(userPassword != userConfirm){
            setIncorrect(false);
            setIncorrectConfirm(true);
        }
        else{
            setIncorrectConfirm(false);

            subjCollection.add({
                email: userEmail,
                history: [],
                name: userName,
                password:userPassword,
            }).then(() => {
                putDataUser({email: userEmail,history: [],name: userName,password:userPassword,}) //ส่งไปให้Storeส่วนกลาง หรือ Redux
                navigation.navigate("tab");
            }).catch(() => {
                alert("ยูเซอร์ไม่ถูก Add");
            })
        }

    };



    const [userName , setUserName] = useState('');
    const [userEmail , setUserEmail] = useState('');
    const [userPassword , setUserPassword] = useState('');
    const [userConfirm, setUserConfirm] = useState('')
     return (
    <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.title}>
                <Text style={{color: '#004466',fontWeight:"bold", fontSize:25}}>WTH, Bro</Text>
                <Text style={{color: '#004466', fontWeight:"bold", fontSize:20}}>ลงทะเบียน</Text>
            </View>
            <View style={{flex:0.7, backgroundColor:'#ed8e73', width: '80%', borderRadius:10, marginHorizontal:10, marginTop:"13%" }}>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผู้ใช้:"
                    onChangeText={setUserName}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="อีเมล:"
                    onChangeText={setUserEmail}
                    value={userEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน:"
                    onChangeText={setUserPassword}
                    value={userPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="ยืนยันรหัสผ่าน:"
                    onChangeText={setUserConfirm}
                    value={userConfirm}
                />
                {showIncorrect && (
                    <Text style={styles.validationText}>*กรอกข้อมูลให้ครบ</Text>
                )}
                {showIncorrectConfirm && (
                    <Text style={styles.validationText}>*ข้อมูลรหัสผ่านไม่ตรงกัน</Text>
                )}
            </View>
            <View style={{flex:0.1, backgroundColor:'white', width:'60%',marginTop:"10%", borderRadius:50,backgroundColor:'#004466',  }}>
                <TouchableOpacity style={{flex:1, justifyContent:'center', alignSelf:'center', }}
                    onPress={() => {addUSer();}}
                >
                    <Text style={{fontSize:16, color:'white' }}>ลงทะเบียน</Text>
                </TouchableOpacity>
            </View>
            <View style={{color:'grey', marginTop:"2%" , flex:0.1, justifyContent:'center',alignSelf:'center', flexDirection:'row', width:"100%"}}>
                <Text style={{fontSize:14, color:'grey'}}>มีบัญชีแล้ว?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("login");
                }}
                style={{width:'auto'}}
                >
                    <Text style={{color:'grey', fontWeight:'bold' ,textDecorationLine:'underline', marginLeft:"8%", width:"100%", fontSize:14 }}>คลิกเพื่อเข้าสู่ระบบตอนนี้</Text>
                </TouchableOpacity>
            </View>
             
        </View>

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#FF724C',
      justifyContent:'center'
    },
    content:{
        flex: 0.7,
        justifyContent:'space-between',
        alignItems:'center',
    },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      placeholderTextColor: 'gray',
      borderBottomWidth: 1,
      borderColor:"#004466",
      color:'#004466',
      fontWeight:"bold"
    },
    title: {
        flex:0.1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Cochin', //ค่อยเปลี่ยน
    },
    validationText: {
        height: "auto",
        marginHorizontal: 12,
        paddingLeft: 10,
        color:'red', 
        borderBottomWidth: 0, 
        fontSize:16, 
        // backgroundColor:'white' 
    },
  
  });


export default signup;