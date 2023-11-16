import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'


// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 

// Firebase
import firebase from "../database/firebaseDB";
import { useState, useEffect } from 'react';


// dataUser = {name: 'เฟรม', password: '1111', email: '64070257@kmitl.ac.th', history: []}
const updateStore = (id, dataHistory, dataUser, index, navigation ) => {


    //dataUser.history = [{}, {}, {}, {}] , x = {}
    // dataHistory = {place: 'ซอยเกกี1', numberWin: '05', status: 'red', time: '12:12', type: 'วาจาไม่สุภาพ', …}


    const dataIndex = dataUser.history.findIndex(item => {
        return Object.keys(item).every(key => item[key] === dataHistory[key]);
    });
    console.log("Index ของ data ใน dataUser:", dataIndex); //index ของhistoryที่จะลบ
      

    // ลบ history นี้ออกจาก บรรดาhistoryทั้งหมดของ User
    dataUser.history.splice(dataIndex, 1)




    const subjCollection = firebase.firestore().collection("Users");
    subjCollection.doc(id)
    .set({
        name: dataUser.name,
        password: dataUser.password,
        email: dataUser.email,
        history: dataUser.history,
    })
    .then(() => {
        navigation.goBack();

    }).catch(() => {
        alert("ยูเซอร์ไม่ถูก Add");
    })

};



// Component
const DetailList = (props) => {

    const dataHistory = props.data; // {"date": "18/10/2023", "detail": "ไม่อยากไปวัด", "nameWin": "Pink Firebase", "numberWin": "18", "place": "วินคลอง 4 เขตลาดกระบัง", "status": "red", "time": "14:25", "type": "วาจาไม่สุภาพ", "url": "https://firebasestorage.googleapis.com/v0/b/p   projectmobile-3a802.appspot.com/o/Image%2Fimage-1697993636184?alt=media&token=d8da583c-bb08-4fc8-8d51-ff7cf77fba39"}
    const id = props.id // idของDocumentในFirebase
    const dataUser = props.dataUser // ข้อมูลของuserทั้งหมดเลย
    const navigation = props.navigation;
    const index = props.index; // indexคือ ลำดับ history ใน array History ทั้งหมด
    // console.log("dataHistory.status ", dataHistory);

    const [note , setNote] = useState("ไม่มีหมายเหตุ")
    
    useEffect(() => {
        if(dataHistory.note != undefined){
                setNote(dataHistory.note)
                console.log(note, "note");
            }
            else{
                setNote("ไม่มีหมายเหตุ")
            }
        return () => {
            console.log("👻👻",dataHistory.note);
            // if(dataHistory.note != undefined){
            //     setNote(dataHistory.note)
            //     console.log(note, "note");
            // }
            console.log(note, "note");
        };
      }, []); // ตำแหน่งนี้กำหนด dependencies เป็น [] ซึ่งหมายถึง useEffect จะทำงานเมื่อ component ถูกเรนเดอร์ครั้งแรกเท่านั้น
    
    

    return (
        <SafeAreaView style={styles.list}>
            <ScrollView style={styles.scrollView}>
                <Text style={{fontSize:25, fontWeight:"bold",}}>ประเภทคำร้อง :</Text>
                <View style={{height:'auto', marginTop:10, }}>
                    <TouchableOpacity style={[styles.touchOpacity, {flexDirection:'row',width:"55%", justifyContent:'center', backgroundColor:dataHistory.status, }]} onPress={()=>{console.log("clickk!!");}}>
                        <Text style={{color:'white', fontWeight:"bold", height:"100%", fontSize:15, }}>
                            { dataHistory.status=="green" ? "ดำเนินการสำเร็จ" : ""}
                            { dataHistory.status=="red" ? "ยังไม่ดำเนินการ" : ""}
                            { dataHistory.status=="orange" ? "กำลังดำเนินการ" : ""}

                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:"7%", height:'auto', }}>
                    <Text style={[ styles.line ,{fontSize:16, } ]}>
                        <MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                        <Text style={styles.textFront}>ผู้ถูกร้องเรียน: </Text>
                        <Text style={styles.textBack}>
                            {dataHistory.nameWin}
                        </Text>
                    </Text>


                    <View style={[styles.line , { flexDirection:'row', justifyContent:'space-between'}]}>
                        <Text style={{fontSize:16 }}>
                            <Feather name="calendar" size={20} color="black" /> 
                            <Text style={styles.textFront}>วันที่: </Text>
                            <Text style={styles.textBack}>{dataHistory.date}</Text>
                        </Text>
                        <Text style={{fontSize:13, }}>
                            <Feather name="clock" size={20} color="black" />
                            <Text style={styles.textFront}>เวลา: </Text>
                            <Text style={styles.textBack}>{dataHistory.time}</Text>
                        </Text>
                    </View>
                    

                    <Text style={[styles.line, {fontSize:13,}]}>
                        <MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />
                        <Text style={styles.textFront}>สถานที่: </Text>
                        <Text style={styles.textBack}>{dataHistory.place}</Text>
                    </Text>

                    <View style={[styles.line, {fontSize:13,}]}>
                        <Text style={styles.textFront}><Entypo name="list" size={20} color="black" />รายละเอียด: </Text> 
                        <Text style={[styles.textBack, {marginTop:"3%"}]}>{dataHistory.detail}
                        </Text>
                    </View>
                    
                    <View style={[styles.line, {fontSize:13,}]}>
                        <Text style={styles.textFront}><AntDesign name="picture" size={20} color="black" />ภาพหลักฐาน: </Text> 
                        <Image style={{width:200, height:200}} source={{uri : dataHistory.url}} />
                    </View>

                </View>



                
                <View style={[styles.line , { flex:1 }]}>
                    { dataHistory.status=="green" && (
                        <View  style={[styles.line, {flex:0.2, }]}>
                            <Text style={{fontSize:20, fontWeight:"bold"}}>หมายเหตุ: </Text>
                            <View style={[styles.touchOpacity, {backgroundColor:'white', }]} >
                                <Text style={styles.textBack}>{note}</Text>
                            </View>
                    </View>
                    )}


                    { dataHistory.status=="red" && (
                        <View style={[styles.line, {flex:1, justifyContent:'center', alignContent:'space-around', flexDirection:'row'}]}>
                            <TouchableOpacity style={[styles.statusRedButton,{}]}
                                onPress={()=>{
                                    navigation.navigate("updateForm", {data : props})
                                }}
                            >
                                <AntDesign name="select1" size={20} color="black" />
                                <Text style={styles.statusRedText}>แก้ไขการร้องเรียน</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                    updateStore(id, dataHistory, dataUser, index, navigation);
                                }} style={[styles.statusRedButton ,{marginLeft:"3%", backgroundColor:'#EB7373',borderWidth: 0,}]}>
                                <AntDesign name="delete" size={20} color="white" />
                                <Text style={[styles.statusRedText, {color:'white' }]}>ลบรายการร้องเรียน</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    list: {
        flex: 1,
        // marginHorizontal:"5%",
        // backgroundColor:"cyan",
    },
    scrollView: {
        // flex:1,
        // backgroundColor: 'pink',
        marginLeft:10,
        marginRight:5,
        top:-15,
      },
    touchOpacity: {
        borderRadius: 10,
        width:"100%",
        padding: 10,// แก้ขนาดปุ่ม
        flexDirection:'row',
        marginTop:"3%",
         
    },
    // อันนี้คือแต่ละบรรทัด
    line: {
      marginTop:"6%",
      height:"auto"
    },
    // อันนี้คือ style ของ ตัวอักษร ด้านหน้าที่เป็นหัวข้อพวก Ex. ผู้ถูกร้องเรียน, วันที่
    textFront: {
      fontWeight:'bold',
      fontSize:20
    },
    textBack: {
      fontSize:16,
    },
    statusRedButton: {
        flexDirection:'row',
        justifyContent:'center',
        borderWidth:0.6,
        alignItems:'center',
        alignSelf:'center',
        paddingHorizontal:"2%",
        paddingVertical:'5%',
        borderRadius:10,
    },
    statusRedText: {
        fontSize:14,
    },
    
     
});

export default DetailList