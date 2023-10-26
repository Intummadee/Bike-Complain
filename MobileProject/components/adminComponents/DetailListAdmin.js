import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
    TextInput,
    SafeAreaView, Image, ScrollView, Alert } from 'react-native'

// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 

// import dropdown
import { Dropdown } from 'react-native-element-dropdown'

// Firebase
import firebase from "../../database/firebaseDB";

const data = [
    { label: 'ดำเนินการสำเร็จ', value: 'green' },
    { label: 'กำลังดำเนินการ', value: 'orange' },
    { label: 'ยังไม่ได้ดำเนินการ', value: 'red' },
];

// สำหรับ DropDown box
const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={{flex: 1, fontSize: 16, color:'black'}}>{item.label}</Text>
      </View>
    );
};



// Component
const DetailListAdmin = (props) => {
    const dataHistory = props.data; // {place: 'Zapolyany palace', time: '10:00', date: '10/10/2023', type: 'วาจาไม่สุภาพ', service_point: '', detail: "ใครสอนให้ยิ้มแบบนั้น", nameWin:"Pantalone", numberWin: "09", status: "red", url: ""} 
    const userName = props.userName; // เช่น dottoresimp
    const navigation = props.navigation;
    // dropdown
    const [dropDownValue, setDropDownValue] = useState(dataHistory.status); // ค่า value จะเป็น object = {"_index": 1, "label": "วาจาไม่สุภาพ", "value": "วาจาไม่สุภาพ"}

    // สำหรับ แก้ไข ใน DB
    const [allHistory, setHistory] = useState([]);
    const [dataUser1, setDataUser1] = useState({});
    const [arrayIndex, setArrayIndex] = useState(0);

    // สำหรับ หมายเหตุ ในฝั่ง admin
    const [note, setNote] = useState("ไม่มีหมายเหตุ");
    

    const subjCollection = firebase.firestore().collection("Users");
    const getCollection = (querySnapshot) => {
        let allHistory = []
        let dataUser = {}
        querySnapshot.forEach((res) => {
            // res.data() = {name: 'Intummadee', history: Array(3), password: '1111', email: '64070257@kmitl.ac.th'}
            // res.id เช่น Intummadee ,dottoresimp ,judas
            if(res.id == userName){
                dataUser = {...res.data()}
                res.data().history.forEach((element) => {
                    allHistory.push(element)
                })
            }
        });
        setHistory(allHistory)
        setDataUser1(dataUser)
        var dataIndex = allHistory.findIndex(item => {
            return Object.keys(item).every(key => item[key] === dataHistory[key]);
        });
        console.log("Index ของ data ใน dataUser:", dataIndex); //index ของhistoryที่จะลบ
        setArrayIndex(dataIndex)

        if(dataHistory.note != undefined){
            setNote(dataHistory.note)
        }

    }
    useEffect(() => {
        const unsubscribe = subjCollection.onSnapshot(getCollection);
        return () => {
          unsubscribe(); 
        };
      }, []); 

    const deleteStore = () => {
        allHistory.splice(arrayIndex, 1)
        let setNewHistory = [...allHistory]

        Alert.alert('Confirm', 'ยืนยันการลบไหม', [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
            },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                subjCollection.doc(userName)
                .set({
                    name: dataUser1.name,
                    password: dataUser1.password,
                    email: dataUser1.email,
                    history: setNewHistory,
                })
                .then(() => {
                    navigation.goBack();

                }).catch(() => {
                    alert("ยังไม่ลบ");
                })
                navigation.goBack();
            }},
        ]);
    };

    const updateStore = () => {
        allHistory[arrayIndex].status = dropDownValue
        let setNewHistory = [...allHistory]

        Alert.alert('Confirm', 'ยืนยันการแก้ไขไหม', [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
            },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                subjCollection.doc(userName)
                .set({
                    name: dataUser1.name,
                    password: dataUser1.password,
                    email: dataUser1.email,
                    history: setNewHistory,
                })
                .then(() => {
                    navigation.goBack();

                }).catch(() => {
                    alert("ยังไม่ได้แก้ไข");
                })
                navigation.goBack();
            }},
        ]);
    };

    const updateNoteInStatusGreen = () => {
        allHistory[arrayIndex].status = "green"
        allHistory[arrayIndex].note = note
        console.log(allHistory[arrayIndex]);
        console.log(allHistory[arrayIndex].note);
        let setNewHistory = [...allHistory]
        Alert.alert('Confirm', 'ยืนยันการแก้ไขไหม', [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
            },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                subjCollection.doc(userName)
                .set({
                    name: dataUser1.name,
                    password: dataUser1.password,
                    email: dataUser1.email,
                    history: setNewHistory,
                })
                .then(() => {
                    console.log('แก้ไขจ้า')
                }).catch(() => {
                    alert("ยังไม่ได้แก้ไข");
                })
                navigation.goBack();
            }},
        ]);

    }

    

    return (
        <SafeAreaView style={styles.list}>
            <ScrollView style={styles.scrollView}>
                <Text style={{fontSize:25, fontWeight:"bold",}}>ประเภทคำร้อง :</Text>
                <View style={[styles.line , { flexDirection:'row', justifyContent:'space-between', }]}>
                    <Dropdown
                        style={[styles.dropdown, { 
                            backgroundColor: dropDownValue, 
                        }]}
                        placeholderStyle={{fontSize: 16, color:'grey', paddingLeft:"34%", width:20, }} // ขนาดplaceholderอยู่ตรงกลางประมาณ 35% แต่ดูจากเว็บตอนนี้ด้วยตามันเหมือนจะ34 (ไม่มั่นใจแหะ)
                        placeholder="ทั้งหมด"
                        selectedTextStyle={{ fontSize: 16, paddingLeft:"10%",color:"white" }} // styleของtextที่ถูกเลือก
                        iconStyle={{width: 10, height: 20, }}
                        iconColor={'white'}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        value={dropDownValue}
                        onChange={item => { 
                            setDropDownValue(item.value);
                        }}
                        
                        // renderLeftIcon={() => (
                        //     <AntDesign name="folder1" size={20} color="white" style={{}} />
                        //     )}
                        renderItem={renderItem}
                    />
                    <View style={{}}>
                        <Text>ผู้ร้องเรียน:</Text>
                        <Text>{userName}</Text>
                    </View>

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
                            <MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
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

                <View style={[styles.line , { flex:1,}]}>
                    { dataHistory.status=="green" && (
                        <View style={[styles.line, {flex:0.2,marginTop:20}]}>
                            <Text style={{fontSize:20, fontWeight:"bold"}}>หมายเหตุ: </Text>
                            <View style={[styles.touchOpacity, {backgroundColor:'white', }]} >
                                <TextInput
                                    editable
                                    multiline
                                    numberOfLines={3} //บรรทัดที่โชว์ ถ้ามากกว่านี้มันจะสไลด์ให้แทน
                                    maxLength={200}
                                    style={[styles.detailInput, styles.shadowProp]}
                                    onChangeText={setNote}
                                    value={note}
                                />
                            </View>
                            <TouchableOpacity onPress={()=>{
                                    updateNoteInStatusGreen();
                                }} style={[styles.statusRedButton ,{marginLeft:"3%",marginTop:15, marginBottom:20, backgroundColor:'#004466',}]}>
                                {/* <AntDesign name="delete" size={20} color="black" /> */}
                                <Text style={styles.statusRedText}>ยืนยัน</Text>
                            </TouchableOpacity>
                    </View>
                    )}

                    { dataHistory.status=="red" && (
                        <View style={[styles.line, {flex:1, justifyContent:'center', marginTop:20,alignContent:'space-around', flexDirection:'row'}]}>
                            <TouchableOpacity onPress={()=>{
                                    deleteStore();
                                }} style={[styles.statusRedButton ,{backgroundColor:'#EB7373',}]}>
                                <AntDesign name="delete" size={20} color="white" />
                                <Text style={styles.statusRedText}> ลบรายการ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                    updateStore();
                                }} style={[styles.statusRedButton ,{marginLeft:"3%", backgroundColor:'#05A56B',}]}>
                                <Text style={styles.statusRedText}>อัพเดต</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    { dataHistory.status=="orange" && (
                        <View style={[styles.line, {flex:1, justifyContent:'center',marginTop:20, alignContent:'space-around', flexDirection:'row'}]}>
                        <TouchableOpacity onPress={()=>{
                                updateStore();
                            }} style={[styles.statusRedButton ,{marginLeft:"3%", backgroundColor:'#FF9770',}]}>
                            {/* <AntDesign name="delete" size={20} color="black" /> */}
                            <Text style={styles.statusRedText}>อัพเดต</Text>
                        </TouchableOpacity>
                    </View>
                    )}


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
        // justifyContent:'center',
        marginTop:15        
    },
    dropdown: {
        width:"55%",
        height: "auto",
        // backgroundColor: 'white',
        borderRadius: 12,
        padding: 6, //ขนาดของdropdown
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        // elevation: 2,
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
        // borderWidth:1,
        alignItems:'center',
        alignSelf: 'flex-start',
        paddingHorizontal:"10%",
        paddingVertical:'4%',
        borderRadius:10,
    },
    statusRedText: {
        fontSize:14,
        color:'white'
    },
    detailInput: {
        // marginEnd:25 ,
        height: "auto",
        // marginTop: "5%",
        // borderWidth: 1,
        paddingLeft:"5%",
        backgroundColor:'white',
        borderRadius:20,

    },
    shadowProp: {  
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2, //ความเข้มของเงา
        shadowRadius: 8, //ทำให้เงามันจางที่ส่วนปลาย
        // elevation: 2, //มีผลกับบางเวอร์ชั่นในandroid เอาไว้เผื่อใช้เพราะเขาแนะนำกัน
    },  
    
    
     
});


export default DetailListAdmin