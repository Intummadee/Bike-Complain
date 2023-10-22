import React, { useEffect,useState } from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View, SafeAreaView, ScrollView,StatusBar, Button, TextInput, TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


// import dropdown
import { Dropdown } from 'react-native-element-dropdown'


// import icon
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
 

// Import Firebase
import firebase from "../database/firebaseDB";

// Redux
import { useSelector, useDispatch } from "react-redux";


 
 



const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={{flex: 1, fontSize: 16,}}>{item.label}</Text>
        {/* {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )} */}
      </View>
    );
  };

const form = ({ navigation , route }) => {

    const routeData_DetailWin = route.params.routeData;
    console.log("ข้อมูลrouteที่ส่งมา : ",routeData_DetailWin);
    // {name: 'Pink Firebase', no: '18', place: 'วินคลอง 4 เขตลาดกระบัง', win_url: 'url', license_url: 'url', license: "MM00 กรุงเทพมหานคร" }

    // dropdown
    const [value, setValue] = useState("");

     
    // พวก time
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
          setTime(selectedTime);
        }
      };

    // พวกCalendar
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
          setDate(selectedDate);
        }
      };
    
    // ข้อมูลในฟอร์ม เอาไว้ส่ง
    const [detail, setDetail] = useState("");


    

    // ชื่อ document Name ที่จะอัพเดต
    const documentName = useSelector( (state) => state.myReducer.doc_name );
    
    const [UserData, setUserData] = useState({});
    const [HistoryData, setHistoryData] = useState([]);
     


    const complaint = (navigation) => {
      
      const dateObject = new Date(time);
      const options = { hour: '2-digit', minute: '2-digit' };
      const formattedTime = dateObject.toLocaleTimeString([], options); // 11:30 ส่วน Date = 21/10/2023

      const subjCollection = firebase.firestore().collection("Users");
      
      
      // res.data() = {password: '1111', name: 'เฟรม', history: Array(4), email: '64070257@kmitl.ac.th'}
      // โครงสร้าง history = {place: 'ซอยเกกี1', numberWin: '05', status: 'red', time: '12:12', type: 'วาจาไม่สุภาพ', url:"", nameWin:"Raiden", detail:"อยากได้อะ แต่ไม่มีตี้", date:"12/16/5465"}
    
      const getCollection = (querySnapshot) => {
        var dataUser = {};
        var all_data = [];

        querySnapshot.forEach((res) => {
          if(res.id == documentName){

            dataUser = {...res.data()}
             
            // console.log("dataUserก่อนset", dataUser.email);
            setUserData(dataUser)
            
            all_data = [...res.data().history]

            all_data.push({
              type: value,
              status: "red",
              place: routeData_DetailWin.place,
              detail: detail,
              numberWin: routeData_DetailWin.no,
              nameWin: routeData_DetailWin.name,
              time: formattedTime,
              date: date.toLocaleDateString(),
              url: "",
            })
            setHistoryData([...all_data])

          }
        });
         
      }
      subjCollection.onSnapshot(getCollection);
       
      console.log(UserData);

      // subjCollection.doc(documentName)
      //       .set({
      //         password: UserData.password,
      //         email: UserData.email,
      //         name: UserData.name,
      //         history: HistoryData,
      //       })
      //       .then(() => {
      //         alert("Add รายการร้องเรียนแล้ว");
      //         // navigation.popToTop();
      //       }).catch(() => {
      //         alert("ยูเซอร์ไม่ถูก Add");
      //       })
    }

    // useEffect(() => {
      
    //   const subjCollection = firebase.firestore().collection("Users");
    //   const unsubscribe = subjCollection.onSnapshot(getCollection);

    //   return () => {
    //     unsubscribe();
        
    //   };
    // }, [complaint]); // dependencies คือ array ของตัวแปรที่ถ้ามีการเปลี่ยนแปลงจะทำให้ useEffect ทำงานใหม่
 

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.box}>
            <ScrollView>
                <View style={{ flex: 1, }}>
                    <View style={{ width:"100%", height:'15%', marginTop:'15%' ,flexDirection:'row' }}>
                        <View style={{width:"45%", marginLeft:"5%", justifyContent:'space-between'}}>
                            <Text>วันที่:</Text>
                            <TouchableOpacity style={styles.touch_dateAndTime} onPress={()=>{
                                console.log("Click Date");  
                                setShowDatePicker(true)
                            }}>
                                <View style={styles.dateAndTime}>
                                    <Text style={styles.dateAndTime_Text}><FontAwesome name="calendar" size={20} color="grey"  style={{marginLeft:"10%"}} /> {moment().format('DD/MM/YYYY')}</Text>
                                  
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
                        </View>
                        <View style={{width:"50%", }}>
                         

                            <Text>เวลา</Text>
                            <TouchableOpacity style={styles.touch_dateAndTime} onPress={()=>{
                                console.log("Click Time");
                                setShowTimePicker(true)
                            }}> 
                                <View style={styles.dateAndTime}>
                                    <Text style={styles.dateAndTime_Text}><Ionicons name="ios-time-outline" size={20} color="grey"  style={{marginLeft:"10%"}} /> 00:00</Text>
                                  
                                </View>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                value={time}
                                mode={"time"}
                                is24Hour={true}
                                onChange={onChangeTime}
                                />
                            )}
                            {/* <Text>{date.toLocaleString()}</Text> */}

                          

                        </View>
                        
                    </View>
                    <View style={{width:"auto", height:'10%', marginTop:'10%',marginLeft:"5%" }}>
                        <Text>สถานที่เกิดเหตุ</Text>
                        <View style={[styles.dropdown, {height:'80%', justifyContent:'center', marginTop:"5%"}]}>
                          <Text style={{fontSize:16, marginLeft:'10%'}}>{routeData_DetailWin.place}</Text>
                        </View>
                    </View> 


                    <View style={{width:"auto", height:'10%', marginTop:'20%', marginLeft:"5%" }}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={{fontSize: 16, paddingLeft: "6%", color:'grey' }}
                            selectedTextStyle={{ fontSize: 16, paddingLeft:"6%"}} // styleของtextที่ถูกเลือก
                            // inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={{width: 20, height: 20,}}
                            data={data}
                            // search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="ประเภทคำร้องเรียน"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={setValue}
                            renderLeftIcon={() => (
                                <AntDesign name="folder1" size={20} color="grey" style={{marginLeft:"10%"}} />
                            )}
                            renderItem={renderItem}

                        />
                    </View>
                    
                    <View style={{ width:"auto", height:'auto', marginTop:'5%', marginLeft:"5%" }}>
                        <Text>รายละเอียด</Text>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={3} //บรรทัดที่โชว์ ถ้ามากกว่านี้มันจะสไลด์ให้แทน
                            maxLength={200}
                            style={[styles.detailInput, styles.shadowProp]}
                            onChangeText={setDetail}
                            value={detail}
                        />
                    </View>
                    
                    <View style={{width:"auto", height:'auto', marginTop:'10%',marginLeft:"5%" }}>
                        <Text>แนบหลักฐาน (ถ้ามี):</Text>
                        {/* อย่าลืมตอนทำทีหลัง marginTop: "5%" (คือmarginระหว่างตัวอักษรกับกล่อง) */}
                        <Text></Text>
                         
                    </View>

                    <View style={{width:"auto", height:'auto', marginTop:'10%', justifyContent:'center', alignItems:'center' }}>
                        <TouchableOpacity
                            style={styles.touchOpacity}
                            onPress={() => {
                                console.log("ส่งคำร้องเรียน");
                                complaint(navigation);
                                // navigation.popToTop();
                            }}>
                                <View style={{flex:1, flexDirection:'row', width:'auto',justifyContent:'center' }}>
                                    <Ionicons name="documents-outline" size={18} color="white" />
                                    <Text style={{color:'white', paddingLeft:'10%'}}>ร้องเรียน</Text>
                                </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:"auto", height:'auto', marginTop:'10%', justifyContent:'center', alignItems:'center' }}>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Text>
                    </View>

                </View>
            </ScrollView>                      
          </View>
        </SafeAreaView>
      );
    };
    




const styles = StyleSheet.create({
// marginTop = 10 % && marginLeft:"5%" && marginEnd:25 
// ขนาดกล่องแต่ละกล่อง = height: "80%"

// พวกตัวอักษรในกล่อง
// marginLeft = 6% (marginleftของพวกข้อความในกล่อง) 
// marginTop: "5%" (ระหว่างตัวอักษรกับกล่อง)

// พวกicon -> marginLeft:"10%" , size={20}
    scrollView: {
      backgroundColor: 'red',
      marginHorizontal: 20,
    },
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    boxCalendar: {
        backgroundColor: '#DDDDDD',
        borderColor:'black',
        borderWidth:1,
        paddingLeft:"10%",
        height:"60%",
        justifyContent:'center',
        borderRadius: 6,
        width:"80%",
    },
    detailInput: {
      marginEnd:25 ,
        height: "auto",
        marginTop: "5%",
        // borderWidth: 1,
        paddingLeft:"10%",
        backgroundColor:'white',
        borderRadius:10
    },
    shadowProp: {  
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2, //ความเข้มของเงา
        shadowRadius: 8, //ทำให้เงามันจางที่ส่วนปลาย
        // elevation: 2, //มีผลกับบางเวอร์ชั่นในandroid เอาไว้เผื่อใช้เพราะเขาแนะนำกัน
      },  
    calendarButton: {
        color:'grey', 
        fontSize:10,
    },
    btnText: {
        position:'absolute',
        top:0,
        height:42,
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    btnCancle: {
        left:0,
    },
    btnDone:{
        right:0,
    },
    box: {
        width: '86%',
        height: '100%',
        // backgroundColor: '#FF724C',
        backgroundColor: 'lightpink',
        position: 'absolute',
        marginTop: '15%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        backgroundColor: 'cyan',
        alignItems: 'center',
    },
    dropdown: {
        marginEnd:25, //ส่วนปลายของdropdown
        height: "80%",
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 5, //ขนาดของdropdown
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
       
      placeholderStyle: {
        fontSize: 16,
        paddingLeft:20
      },
       
       
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      touchOpacity:{
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#C35257',
        width:"60%",
        padding: 10,// แก้ขนาดปุ่ม
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'space-around'
      },

    // เวลากับปฏิทิน อยู่ตรงนี้ 2 กล่อง
      touch_dateAndTime: {
        flex:1, 
        alignSelf:"center", 
        marginBottom:"15%", // ขนาดของกล่อง 
        width:'100%',
        marginTop: "5%"
      },
      dateAndTime: {
        flex:1, 
        marginEnd:25,
        backgroundColor:'white',  
        height:"1%",
        borderRadius:12,
        justifyContent:'center'
      },
      dateAndTime_Text: {
        color:'grey',
        
      },



    });
    
export default form

