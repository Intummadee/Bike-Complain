import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView , ScrollView , StatusBar, TextInput } from 'react-native'
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


// time
import moment from 'moment';


// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 



// Firebase
import firebase from "../database/firebaseDB";
import { LongPressGestureHandler } from 'react-native-gesture-handler';



const updateStore = (id, dataHistory, dataUser, navigation, time ,date,detail, place ) => {

    const dataIndex = dataUser.history.findIndex(item => {
        return Object.keys(item).every(key => item[key] === dataHistory[key]);
    });

    // console.log("Index ของ data ใน dataUser:", dataIndex); //index ของhistoryที่จะลบ

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      };
      
    const formattedTime = time.toLocaleTimeString(undefined, options);
    // console.log("time", formattedTime); // time: 22:41
    // console.log("date", date.toLocaleDateString()); // date: 10/17/2023
     
    console.log("☃️historyก่อนจะอัพเดตค่า ", dataUser.history[dataIndex]);
    console.log("time : ",time.toLocaleTimeString(undefined, options));
    dataUser.history[dataIndex] = {
        date: date.toLocaleDateString(),
        detail: detail,
        nameWin: dataHistory.nameWin,
        numberWin: dataHistory.numberWin,
        place: place,
        status: dataHistory.status,
        time: formattedTime,
        type: dataHistory.type,
        url: dataHistory.url,
        // ไปใส่ฟิลเพิ่ม
    }
    
     
    console.log("☀️historyที่จะอัพ", dataUser.history[dataIndex]);
    
    console.log("id = ", id);
    console.log(dataUser.name);
    console.log(dataUser.password);
    console.log(dataUser.email);
    navigation.goBack();
 
    const subjCollection = firebase.firestore().collection("Users");
    subjCollection.doc(id)
    .set({
        name: dataUser.name,
        password: dataUser.password,
        email: dataUser.email,
        history: dataUser.history,
    })
    .then(() => {
        // navigation.navigate("myProfile");
        navigation.navigate("history");
    }).catch(() => {
        alert("ยูเซอร์ไม่ถูก Add");
    })

};



const UpdateForm = ({ route }) => {

    const data1 = route.params.data; // data = {dataUser: {…}, data: {…}, id: 'Intummadee', index: 0, navigation: {…}}

    const dataHistory = data1.data; // data = {date: '12/11/2023', nameWin: 'นายโยคี ขี่รุ้งพุ่งออกมา', numberWin: '05', place: 'ซอยเกกี1', status: 'green', time: "12:12" ,type: "วาจาไม่สุภาพ"}
    const id = data1.id // idของDocumentในFirebase
    const dataUser = data1.dataUser // ข้อมูลของuserทั้งหมดเลย
    const navigation = data1.navigation;
    const index = data1.index; // indexคือ ลำดับ history ใน array History ทั้งหมด

    console.log("dataHistory 🐉 ",dataHistory); 
    // console.log("dataHistory", dataHistory.place); 
    // console.log("dataHistory", dataHistory.nameWin); 

    // input ของ ฟอร์ม
    const [detail, setDetail] = useState(dataHistory.detail);

    const [place, setPlace] = useState(dataHistory.place)
    

    // แปลงข้อมูล time ให้มันแสดงได้ ถ้าไม่แปลงมันจะขึ้น Invalid date
    const timeString = dataHistory.time;
    console.log("timeString ",timeString);
    const [hours, minutes] = timeString.split(":");
    const num = new Date(); // 2023-12-30T00:00:00.000Z
    num.setHours(parseInt(hours, 10));
    num.setMinutes(parseInt(minutes, 10)); 

    // input ของ time
    const [time, setTime] = useState(num);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
          setTime(selectedTime);
        }
    };

    // แปลงข้อมูล dateเหมือนtime ให้มันแสดงได้ ถ้าไม่แปลงมันจะขึ้น Invalid date
    const dateString = dataHistory.date;
    const [day, month, year] = dateString.split('/');
    const dateObject = new Date(`${year}-${month}-${day}`); // 2023-12-30T00:00:00.000Z

    // พวกCalendar
    const [date, setDate] = useState(dateObject);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
          setDate(selectedDate);
        }
    };





  return (
<SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.list}>
       
            <View style={{flex:0.15,}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>ประเภทคำร้อง :</Text>
                <TouchableOpacity style={[styles.touchOpacity, {width:"45%", height:50, justifyContent:'center', backgroundColor:dataHistory.status }]} onPress={()=>{console.log("clickk!!");}}>
                    <Text style={{color:'white', fontWeight:"bold"}}>
                        { dataHistory.status=="green" ? "ดำเนินการสำเร็จ" : ""}
                        { dataHistory.status=="red" ? "ยังไม่ดำเนินการ" : ""}
                        { dataHistory.status=="orange" ? "กำลังดำเนินการ" : ""}

                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:5, height:'auto',}}>
                <Text style={[ styles.line ,{fontSize:16, } ]}><MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                <Text style={styles.textFront}>ผู้ถูกร้องเรียน: </Text>
                <Text style={styles.textBack}>{dataHistory.nameWin}</Text>
                </Text>


                <View style={[styles.line , { flexDirection:'row', justifyContent:'space-between'}]}>
                <Text style={{fontSize:16 }}>
                    <Feather name="calendar" size={20} color="black" /> 
                    <Text style={styles.textFront}>วันที่: </Text>
                    <TouchableOpacity style={{borderWidth:1, borderBlockColor:"#FF724C"}} onPress={()=>{
                        console.log("Click Date");  
                        setShowDatePicker(true)
                    }}>
                        <View style={{}}>
                            <Text style={styles.textBack}>{moment(date).format('DD/MM/YYYY')}</Text>
                            {/* <Text style={styles.textBack}>{dataHistory.date}</Text> */}
                            
                        </View>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChangeDate}
                        />
                    )}

                    {/* <Text style={styles.textBack}>{dataHistory.date}</Text> */}
                </Text>
                <Text style={{fontSize:13, }}>
                    <MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                    <Text style={styles.textFront}>เวลา: </Text>
                    {/* <Text style={styles.textBack}>{dataHistory.time}</Text> */}
                    <TouchableOpacity style={{borderWidth:1, borderBlockColor:"#FF724C"}} onPress={()=>{
                                console.log("Click Time");  
                                setShowTimePicker(true)
                            }}>
                                <View style={{}}>
                                    <Text style={styles.textBack}>{moment(time).format('HH:mm')}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* ถ้ามีการกดเวลา จะโชว์ นาฬิกาให้เลือกเวลา โดย value = time */}
                            {showTimePicker && (
                                <DateTimePicker
                                    value={time}
                                    mode={"time"}
                                    is24Hour={true}
                                    onChange={onChangeTime}
                                />
                            )}
                </Text>
                </View>
                

                <View style={[styles.line, ]}>
                    
                    <Text style={styles.textFront}><MaterialCommunityIcons name="map-marker-outline" size={20} color="black" />สถานที่: </Text>
                    <TextInput 
                        style={{borderWidth:1, width:"100%", height:"auto", padding: 10, marginTop:"6%",}}
                        onChangeText={setPlace}
                        value={place}
                    />
                     

                </View>

                <View style={[styles.line, {fontSize:13,}]}>
                    <Text style={styles.textFront}><Entypo name="list" size={20} color="black" />รายละเอียด: </Text> 
                    <TextInput
                        editable
                        multiline
                        numberOfLines={3} //บรรทัดที่โชว์ ถ้ามากกว่านี้มันจะสไลด์ให้แทน
                        maxLength={200}
                        style={[styles.textBack, {marginTop:"3%", fontSize:13,borderWidth:1, borderBlockColor:"#FF724C", paddingLeft: 10}]}
                        onChangeText={setDetail}
                        value={detail}
                    />
                </View>
                
                <View style={[styles.line, {fontSize:13,}]}>
                {/* <Text style={styles.textFront}><AntDesign name="picture" size={20} color="black" />ภาพหลักฐาน: </Text>  */}
                </View>

            </View>


             

            { dataHistory.status=="red" && (
                <View style={[styles.line, {flex:0.2, justifyContent:'center', alignContent:'space-around', flexDirection:'row'}]}>
                    <TouchableOpacity style={[styles.statusRedButton,{backgroundColor: "#05A56B"}]}
                        onPress={() => {
                            updateStore(id, dataHistory, dataUser, navigation, time, date, detail, place);
                        }}
                    >
                        <AntDesign name="checkcircleo" size={24} color="white" />
                        <Text style={[styles.statusRedText, {color:"white"}]}>ตกลง</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                            // console.log("ยกเลิก");
                            navigation.goBack()
                        }} 
                        style={[styles.statusRedButton ,{marginLeft:"3%", borderColor:"#C95454"}]}>
                        <AntDesign name="closecircleo" size={24} color="#C95454" />
                        <Text style={[styles.statusRedText, {color:"#C95454"}]}>ยกเลิก</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
        </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    scrollView: {

        marginHorizontal: 10,
      },
    list: {
        flex: 1,
        // marginHorizontal:"5%",
        // backgroundColor:"cyan",
        // marginTop:"5%"
    },
    touchOpacity: {
        borderRadius: 10,
        width:"100%",
        padding: 15,// แก้ขนาดปุ่ม
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
        paddingHorizontal:"10%",
        paddingVertical:"3%",
        borderRadius:10,
    },
    statusRedText: {
        margin:"2.5%",
        paddingLeft:"5%"
    },
      
       
});
  




export default UpdateForm


