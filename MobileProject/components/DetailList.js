import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView, } from 'react-native'
import React from 'react'


// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 

// Firebase
import firebase from "../database/firebaseDB";



const DetailList = (props) => {

    const data = props.data; // data = {date: '12/11/2023', nameWin: 'นายโยคี ขี่รุ้งพุ่งออกมา', numberWin: '05', place: 'ซอยเกกี1', status: 'green', time: "12:12" ,type: "วาจาไม่สุภาพ"}


    return (
        <View style={styles.list}>
            <View style={{flex:0.15,}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>ประเภทคำร้อง :</Text>
                <TouchableOpacity style={[styles.touchOpacity, {width:"45%", justifyContent:'center', backgroundColor:data.status }]} onPress={()=>{console.log("clickk!!");}}>
                    <Text style={{color:'white', fontWeight:"bold"}}>
                        { data.status=="green" ? "ดำเนินการสำเร็จ" : ""}
                        { data.status=="red" ? "ยังไม่ดำเนินการ" : ""}
                        { data.status=="orange" ? "กำลังดำเนินการ" : ""}

                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:"5%", height:'auto',}}>
                <Text style={[ styles.line ,{fontSize:16, } ]}><MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                <Text style={styles.textFront}>ผู้ถูกร้องเรียน: </Text>
                <Text style={styles.textBack}>นายโยคี ขี่รุ้งพุ่งออกมา</Text>
                </Text>


                <View style={[styles.line , { flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={{fontSize:16 }}>
                    <Feather name="calendar" size={20} color="black" /> 
                    <Text style={styles.textFront}>วันที่: </Text>
                    <Text style={styles.textBack}>12/10/2023</Text>
                </Text>
                <Text style={{fontSize:13, }}>
                    <MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                    <Text style={styles.textFront}>เวลา: </Text>
                    <Text style={styles.textBack}>12:12</Text>
                </Text>
                </View>
                

                <Text style={[styles.line, {fontSize:13,}]}>
                <MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />
                <Text style={styles.textFront}>สถานที่: </Text>
                <Text style={styles.textBack}>เกกีซอย1</Text>
                </Text>

                <View style={[styles.line, {fontSize:13,}]}>
                <Text style={styles.textFront}><Entypo name="list" size={20} color="black" />สถานที่: </Text> 
                <Text style={[styles.textBack, {marginTop:"3%"}]}>Oh, now that guy has a head full of grandiose plans fueled by raw ambition. I don't understand a word he says once he starts talking about his theories... Eh, but as long as he keeps our cash reserves stocked up, I'm not complaining.</Text></View>
                
                <View style={[styles.line, {fontSize:13,}]}>
                <Text style={styles.textFront}><AntDesign name="picture" size={20} color="black" />ภาพหลักฐาน: </Text> 
                </View>

            </View>


            { data.status=="green" && (
                <View style={[styles.line, {flex:0.2,}]}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>หมายเหตุ: </Text>
                <View style={[styles.touchOpacity, {backgroundColor:'white', }]} >
                <Text style={styles.textBack}>Oh, now that guy has a head full of grandiose plans fueled by raw ambition. I don't understand a word he says once he starts talking about his theories... Eh, but as long as he keeps our cash reserves stocked up, I'm not complaining.</Text>
                </View>
            </View>
            )}


            { data.status=="red" && (
                <View style={[styles.line, {flex:0.2, justifyContent:'center', alignContent:'space-around', flexDirection:'row'}]}>
                    <TouchableOpacity style={[styles.statusRedButton,{}]}>
                        <AntDesign name="select1" size={24} color="black" />
                        <Text style={styles.statusRedText}>แก้ไขการร้องเรียน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusRedButton ,{marginLeft:"3%", backgroundColor:'#EB7373',}]}>
                        <AntDesign name="delete" size={24} color="black" />
                        <Text style={styles.statusRedText}>ลบรายการร้องเรียน</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}




const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginHorizontal:"5%",
        // backgroundColor:"cyan",
        marginTop:"5%"
    },
    touchOpacity: {
        borderRadius: 10,
        width:"100%",
        padding: 10,// แก้ขนาดปุ่ม
        flexDirection:'row',
        // justifyContent:'center',
        marginTop:"3%"
        
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
        borderWidth:1,
        alignItems:'center',
        alignSelf:'center',
        padding:"5%",
        borderRadius:10,
    },
    statusRedText: {

    },
    
     
});

export default DetailList