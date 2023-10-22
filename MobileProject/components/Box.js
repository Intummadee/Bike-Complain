import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView,FlatList, StatusBar } from 'react-native'

// import Icon
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
// ไอคอนถูก          <AntDesign name="checkcircleo" size={20} color="black" /> 
// ไอคอนผิด          <AntDesign name="closecircleo" size={20} color="black" />
// ไอคอนสถานะรอ     <Feather name="clock" size={20} color="black" />


 

const Box = (props) => {

 
  const data = props.data; // data = {date: '12/11/2023', nameWin: 'นายโยคี ขี่รุ้งพุ่งออกมา', numberWin: '05', place: 'ซอยเกกี1', status: 'green', time: "12:12" ,type: "วาจาไม่สุภาพ"}
  console.log("Box" ,props.data);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.onSelect();
      }}
    >
      <View style={styles.list}>
        <View style={[styles.color, {backgroundColor:data.status, }]}></View>
        <View style={{backgroundColor:"white" ,width:"100%" , flexDirection:"row", alignItems:'center',}}>
            <View style={styles.textLeft}>
                <Text style={{fontSize:12}} numberOfLines={2}>ประเภทคำร้อง : {data.type}</Text>
                <Text style={{fontSize:12}}>วันที่ : {data.date}</Text>
                <Text style={{fontSize:12}}>ชื่อวินที่ร้องเรียน : {data.nameWin}</Text>
            </View>
            <View style={styles.textRight} numberOfLines={1} >
                {data.status=="green" && (
                  <Text style={[styles.textStatus, {color:'green'}]} numberOfLines={2}> <AntDesign name="checkcircleo" size={20} color="green" />{"\n"}ดำเนินการสำเร็จ</Text>
                )}
                {data.status=="red" && (
                  <Text style={[styles.textStatus, {color:'red'}]} numberOfLines={2}> <AntDesign name="closecircleo" size={20} color="red" />{"\n"}ยังไม่ได้ดำเนินการ</Text>
                )}
                {data.status=="orange" && (
                  <Text style={[styles.textStatus, {color:'orange'}]} numberOfLines={2}> <Feather name="clock" size={20} color="orange" />{"\n"}กำลังดำเนินการ</Text>
                )}

            </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom:"5%",
        height:"auto",
    },
    list: {
        flexDirection:"row",
        marginEnd:"10%",
    },
    textLeft: {
        width:"70%", //ขนาดของข้อความด้านซ้าย
        backgroundColor:'white',
        paddingLeft:"4%"
    },
    textRight: {
        width:"30%",  //ขนาดของข้อความด้านขวา
        flexDirection:'column',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems: 'center',
        alignContent:'center',
    },
    color: {
        paddingVertical:"15%", //ปรับขนาดของรายการร้องเรียน ตรงนี้
        width:"5%", // ความกว้างของสีรายการ
        height:"100%", 
    },
    textStatus: {
      fontSize:10, 
      fontWeight:"bold", 
      alignItems:'center' , 
      textAlign:'center'
    },
})

export default Box