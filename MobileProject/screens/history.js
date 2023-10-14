import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView,FlatList, StatusBar } from 'react-native'


// Redux
import { useSelector, useDispatch } from "react-redux";


// import dropdown
import { Dropdown } from 'react-native-element-dropdown'



// Import AntDesign
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

// Import Component
import Box from "../components/Box";

// Import Firebase
import firebase from "../database/firebaseDB";


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




// const dataUser = {name: 'เฟรม', password: '1111', email: '64070257@kmitl.ac.th', history: [
//   {date:"12/11/2023", nameWin:"นายโยคี ขี่รุ้งพุ่งออกมา", numberWin:"05", place:"ซอยเกกี1", status:"green", time:"12:12", type:"วาจาไม่สุภาพ"},
//   {date:"12/11/2023", nameWin:"นายโยคี ขี่รุ้งพุ่งออกมา", numberWin:"05", place:"ซอยเกกี1", status:"red", time:"12:12", type:"วาจาไม่สุภาพ"},
//   {date:"12/11/2023", nameWin:"นายโยคี ขี่รุ้งพุ่งออกมา", numberWin:"05", place:"ซอยเกกี1", status:"orange", time:"12:12", type:"วาจาไม่สุภาพ"},
// ]};

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

const renderList = ({ item }, props) => {
  return (
    <Box
        data={item}
        onSelect={() => {
          console.log("click list ");
          props.navigation.navigate("detailList", {data: item, id : props.id, dataUser: props.dataUser})
        }}
    />
  );
};


const history = ({ navigation }) => {

  // เก็บ ข้อมูล userไว้
  const [dataUser, setdataUser] = useState([]);
  const [id, setId] = useState(""); // id ของ documentใน Firebase เช่น As3zPvxQOo5JgQRck3eX, Intummadee

  const user = useSelector( (state) => state.myReducer.user );
  // userที่ได้ เป็นarrayมีแค่ลำดับเดียว ตอนใช้อย่าลืม [0] = {password: '1111', name: 'เฟรม', history: Array(4), email: '64070257@kmitl.ac.th'}
  
  const subjCollection = firebase.firestore().collection("Users");
  const getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
        // console.log("user in Redux",user[0]);
        // console.log("res.data() : ", res.data().history);
        // res.data() = {password: '1111', name: 'เฟรม', history: Array(4), email: '64070257@kmitl.ac.th'}
        // res.data().history = 0: {place: 'ซอยเกกี1', numberWin: '05', status: 'red', time: '12:12', type: 'วาจาไม่สุภาพ', …} 1: {type: 'ขับรถเร็ว', nameWin: 'เป๊ปซี่ โคล่า', place: 'ซอยเกกี1', date: '14/10/2023', status: 'green', …}2: {place: 'RNP', numberWin: '07', nameWin: 'โกโก้ หวานน้อย', status: 'orange', time: '15:00', …}3: {time: '10:17', type: 'วาจาไม่สุภาพ', nameWin: 'นํ้าดื่ม สิงห์', numberWin: '02', place: 'แอร์ลิ้ง', …}
        if(res.data().name == user[0].name){
          //  ตรวจสอบว่าเป็น history ของ user คนนี้
          setId(res.id);
          all_data.push(res.data());
          // console.log(all_data);
          setdataUser(all_data[0]);
        }


    });
  };
  useEffect(() => {
    // ทำงานที่ควรทำหลังจาก component ถูกเรนเดอร์
    const unsubscribe = subjCollection.onSnapshot(getCollection);
    return () => {
      unsubscribe(); // ในบางกรณี, คุณต้องการทำงานบางอย่าง (เช่น, unsubscribe จาก Firebase, หรือทำความสะอาดข้อมูลที่ไม่ได้ใช้ = Unmounting (การลบ component ออกจาก DOM)
    };
  }, []); // ตำแหน่งนี้กำหนด dependencies เป็น [] ซึ่งหมายถึง useEffect จะทำงานเมื่อ component ถูกเรนเดอร์ครั้งแรกเท่านั้น




  // dropdown
  const [value, setValue] = useState("");

  return (
    <View style={styles.list}>
      <View style={{width:'100%', height:"17%", flexDirection:'column', marginTop:"10%"}}>
        <View>
          <Text style={{fontSize:16, color:'#004466', fontWeight:'600'}}>สถานะการร้องเรียน:</Text>

        </View>
        <View style={{flexDirection:'row', marginTop:"4%"}}>
          <Dropdown
              style={styles.dropdown}
              placeholderStyle={{fontSize: 16, color:'grey', paddingLeft:"34%", }} // ขนาดplaceholderอยู่ตรงกลางประมาณ 35% แต่ดูจากเว็บตอนนี้ด้วยตามันเหมือนจะ34 (ไม่มั่นใจแหะ)
              placeholder="ทั้งหมด"
              selectedTextStyle={{ fontSize: 16, paddingLeft:"35%", }} // styleของtextที่ถูกเลือก
              iconStyle={{width: 20, height: 20,}}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              onChange={setValue}
              renderLeftIcon={() => (
                  <AntDesign name="folder1" size={20} color="grey" style={{}} />
                )}
              renderItem={renderItem}
          />
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                  console.log("กดวันที่");
              }}>
                  <View style={{ width:'100%',  justifyContent:'center',alignItems:'center', flexDirection:'column' }}>
                      {/* <View style={{flexDirection:'row' , backgroundColor:'green', }}>
                        <AntDesign name="arrowup" size={20} color="black" />
                        <AntDesign name="arrowdown" size={20} color="black" />
                      </View> */}
                      <FontAwesome name="sort" size={20} color="#004466" />
                      <Text style={{color:'#004466', paddingLeft:'5%', fontSize:13, fontWeight:'bold'}}>วันที่</Text>
                  </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width:'100%', height:"100%", flexDirection:'row'}}>
        <SafeAreaView style={styles.container}>
          <FlatList navigation={navigation} data={dataUser.history} renderItem={(item) => renderList(item, { navigation, id, dataUser })} numColumns={1} />
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        // backgroundColor:"grey",
        marginLeft:"5%"
    },
    dropdown: {
      width:"80%",
      height: "70%",
      // backgroundColor: 'white',
      borderRadius: 12,
      padding: 5, //ขนาดของdropdown
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 6,
      // elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      borderRadius: 20,
      height: "70%",
      width:"15%",
      padding: 10,//ขนาดปุ่ม
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'space-around',
      marginLeft:"3%",
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
     
});

export default history