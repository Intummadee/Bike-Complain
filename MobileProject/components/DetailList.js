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
    console.log("dataHistory.status ", dataHistory);

    return (
        <SafeAreaView style={styles.list}>
            <Text style={{fontSize:25, fontWeight:"bold", backgroundColor:'brown'}}>ประเภทคำร้อง :</Text>
            <View style={{height:'auto', marginTop:10, backgroundColor:'grey'}}>
                <TouchableOpacity style={[styles.touchOpacity, {flexDirection:'row',width:"55%", justifyContent:'center', backgroundColor:dataHistory.status, }]} onPress={()=>{console.log("clickk!!");}}>
                    <Text style={{color:'white', fontWeight:"bold", height:"100%", fontSize:15, backgroundColor:'green' }}>
                        { dataHistory.status=="green" ? "ดำเนินการสำเร็จ" : ""}
                        { dataHistory.status=="red" ? "ยังไม่ดำเนินการ" : ""}
                        { dataHistory.status=="orange" ? "กำลังดำเนินการ" : ""}

                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:"7%", height:'auto', backgroundColor:'yellow'}}>
                <Text style={[ styles.line ,{fontSize:16, } ]}><MaterialCommunityIcons name="face-woman-profile" size={20} color="black"/> 
                <Text style={styles.textFront}>ผู้ถูกร้องเรียน: </Text>
                <Text style={styles.textBack}>{dataHistory.nameWin}</Text>
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



            
            <View style={[styles.line , {backgroundColor:'purple', flex:1 }]}>
                { dataHistory.status=="green" && (
                    <View style={[styles.line, {flex:0.2,}]}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>หมายเหตุ: </Text>
                        <View style={[styles.touchOpacity, {backgroundColor:'white', }]} >
                        <Text style={styles.textBack}>Oh, now that guy has a head full of grandiose plans fueled by raw ambition. I don't understand a word he says once he starts talking about his theories... Eh, but as long as he keeps our cash reserves stocked up, I'm not complaining.</Text>
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
                            }} style={[styles.statusRedButton ,{marginLeft:"3%", backgroundColor:'#EB7373',}]}>
                            <AntDesign name="delete" size={20} color="black" />
                            <Text style={styles.statusRedText}>ลบรายการร้องเรียน</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginHorizontal:"5%",
        backgroundColor:"cyan",
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
        paddingHorizontal:"3%",
        paddingVertical:'5%',
        borderRadius:10,
    },
    statusRedText: {
        fontSize:14,
    },
    
     
});

export default DetailList