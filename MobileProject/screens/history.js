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
  { label: 'ดำเนินการสำเร็จ', value: 'green' },
  { label: 'กำลังดำเนินการ', value: 'orange' },
  { label: 'ยังไม่ได้ดำเนินการ', value: 'red' },
  { label: 'ทั้งหมด', value: 'all' },
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

const renderList = ({ item, index }, props) => {
  // console.log("");
  // console.log("item ใน Box :",item);
  return (
    <Box
        data={item}
        index={index}
        onSelect={() => {
          console.log("click list ");
          props.navigation.navigate("detailList", {data: item, id : props.id, dataUser: props.dataUser, index: index})
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
  const [value, setValue] = useState(""); //ค่า สถานะจาก dropdown ที่ถูกเลือก
  const [clickStatus, setclickStatus] = useState(false); //ค่า สถานะจาก dropdown ที่ถูกเลือก
  
  // เป็น array ที่เอาไว้แสดง ตาม สถานะ
  const [dataMockup, setdataMockup] = useState([]); // arrayที่ถูก sort ตามสถานะ จาก Onchange ใน dropDown

  // คลิ๊กปุ่ม เรียงตาม วันที่
  const [clickDate, setClickDate] = useState(false);
  const [historySort, sethistorySort] = useState([]); // Array ที่เอาไว้ sort ข้อมูลตาม วันที่


  // ฟังชันที่เอาไว้ sort รายการร้องเรียน
  const renderSort = () => {
    let sortArray = [];
    let historySort = [];
    
    let clickDate1 = !clickDate;
    console.log("renderSort", clickDate1, clickStatus, "value :", value);
    

    // ถ้ามีการเลือก สถานะ
    if(value != ""){
      // ถ้าเลือก สถานะ ทั้งหมด
      if(value == "ทั้งหมด"){
        sortArray = [...dataUser.history ]
        console.log("ถ้าเลือก สถานะ ทั้งหมด", sortArray);
      }
      else{
        const filteredDataUser = dataUser.history.filter(x => x.status == item.value);
        sortArray = [...filteredDataUser]
        console.log("ถ้าเลือก สถานะ อย่างอื่น", sortArray);
      }
      
    }
    // ถ้าไม่มีการเลือกทั้ง วันที่ และ ไม่มีการเลือก สถานะ
    else{
      sortArray = [...dataUser.history ]
      console.log("ถ้าไม่เลือกสถานะ ", sortArray);
      console.log("");
    } 
    
    // เอา sortArray มาเรียงตามวันที่ ถ้าไม่มีการคลิ๊กก็ไม่ต้องเข้า condition เรียงอันนี้
    if(clickDate1 == true){
      // มีการคลิ๊ก เรียงวันที่ 
      historySort = [...sortArray];
      historySort.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });
      sethistorySort(historySort)
      console.log("ถ้าคลิ๊ก วันที่  ", historySort);
    }
    else{
      // ไม่มีการคลิ๊ก
      historySort = [...sortArray];
      console.log("ถ้าไม่คลิ๊ก วันที่  ", historySort);
    }
    sethistorySort(historySort);
    setClickDate(clickDate1);
    setclickStatus(true)
    
    console.log("");
    console.log("สรุปค่าที่ส่ง : ",historySort);
    // return historySort;
  }
 

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

              onChange={item => { 
                // const filteredDataUser = dataUser.history.filter(x => x.status == item.value);
                // console.log("dropdown ที่เลือก : ", item.value);
                setValue(item.value);

                // let test = [];
                // test = [...filteredDataUser]
                // setdataMockup(test);

                setclickStatus(true)
                renderSort()
              }}
               
              renderLeftIcon={() => (
                  <AntDesign name="folder1" size={20} color="grey" style={{}} />
                )}
              renderItem={renderItem}
          />
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
 
                renderSort()
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
          
          
          {/* Flat list ของ รายการร้องเรียน  */}
          {/* {clickDate && (
            <FlatList 
              navigation={navigation} 
              data={dataUser.history}  
              renderItem={(item) => renderList(item, { navigation, id, dataUser })} 
              numColumns={1} 
              keyExtractor={(item, index) => index.toString()}
            />
            )} */}

          
          {/* {clickDate==false && (
              <FlatList 
                navigation={navigation} 
                data={dataMockup}
                renderItem={(item) => renderList(item, { navigation, id, dataUser })} 
                numColumns={1} 
                keyExtractor={(item, index) => index.toString()}
              />
            )
          } */}

          {/* เอาไว้เรียงสถานะ   */}
          {/* {clickStatus==false  (
              <FlatList 
                navigation={navigation} 
                data={dataUser.history}
                renderItem={(item) => {
                    console.log(item)
                    renderList(item, { navigation, id, dataUser })
                  }
                } 
                numColumns={1} 
                keyExtractor={(item, index) => index.toString()}
              />
            )
          } */}

          {clickStatus==true || clickDate==true ? (
              <FlatList 
                navigation={navigation} 
                data={historySort}
                renderItem={(item) => 

                  renderList(item, { navigation, id, dataUser })
                } 
                numColumns={1} 
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <FlatList 
                navigation={navigation} 
                data={dataUser.history}
                renderItem={(item) => 
                  renderList(item, { navigation, id, dataUser })
                } 
                numColumns={1} 
                keyExtractor={(item, index) => index.toString()}
              />
            )
          }




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