import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView,FlatList, StatusBar, Divider, TextInput } from 'react-native'



// import dropdown
import { Dropdown } from 'react-native-element-dropdown'


// Import Icon
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

// Import Component
import Box from "../../components/Box";

// Import Firebase
import firebase from "../../database/firebaseDB";


const data = [
  { label: 'ดำเนินการสำเร็จ', value: 'green' },
  { label: 'กำลังดำเนินการ', value: 'orange' },
  { label: 'ยังไม่ได้ดำเนินการ', value: 'red' },
  { label: 'ทั้งหมด', value: 'all' },
];

// สำหรับ DropDown box
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



const Complaint = ({ navigation }) => {

   


  // dropdown
  const [value, setValue] = useState(""); //ค่า สถานะจาก dropdown ที่ถูกเลือก
  const [clickStatus, setclickStatus] = useState(false); //ค่า สถานะจาก dropdown ที่ถูกเลือก

  // คลิ๊กปุ่ม เรียงตาม วันที่ 
  const [clickDate, setClickDate] = useState(false);
  const [historySort, sethistorySort] = useState([]); // Array ที่เอาไว้ sort ข้อมูลตาม วันที่
  const [countDate, setcountDate] = useState(1); // Array ที่เอาไว้ sort ข้อมูลตาม วันที่


  

  
  const [AllUser_FromDB, setAllUser_FromDB] = useState([]);

  const subjCollection = firebase.firestore().collection("Users");
  const getCollection = (querySnapshot) => {
    let AllUser_FromDB = []; // อยากได้โครงสร้างแบบนี้ ->  [{allhistoryForEachUser:[{}, {}, {}], userName:""}] 
    querySnapshot.forEach((res) => {
      // console.log("🐸🐸🐸",res.data());

      // res.data() ได้ข้อมูลUserมาแต่ละคร ตัวอย่าง 1 ใน user เช่น = {name: 'judas', email: '64070257@kmitl.ac.th', history: Array(1), password: '1111'}
      let newObj = {
        allhistoryForEachUser: [],
        userName: res.data().name,
      };
      
      if(res.data().role != "Admin"){
        res.data().history.forEach((element) => {
          // element เป็นแต่ละHistoryของuser = {url: 'https://firebasestorage', date: '18/10/2023', numberWin: '34', time: '05:25', place: 'ข้างๆหมา', detail: "เซ็งอะ", nameWin: "สิริชัย เจริญ", status: "red", }
          newObj.allhistoryForEachUser.push(element)
        })
        AllUser_FromDB.push(newObj);
      }
    });
    setAllUser_FromDB(AllUser_FromDB);
    console.log(AllUser_FromDB);
  };
  useEffect(() => {
    const unsubscribe = subjCollection.onSnapshot(getCollection);
    return () => {
      unsubscribe(); // ในบางกรณี, คุณต้องการทำงานบางอย่าง (เช่น, unsubscribe จาก Firebase, หรือทำความสะอาดข้อมูลที่ไม่ได้ใช้ = Unmounting (การลบ component ออกจาก DOM)
    };
  }, []); 
  

  
  const renderList = ({ item, index }, props) => {
    return(
      <View style={{flex:1, marginBottom:10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight:10, }} />
          <View>
            <Text style={{width: 30, textAlign: 'center'}}>{(index+1).toString()}</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black', marginRight:20,  }} />
        </View>
        <Text> </Text>
        <Text style={{fontWeight:'bold', fontSize:17}}>User Name: {item.userName}</Text>
        <Text>History:</Text>
        <FlatList
            style={{marginTop:5}}
            data={item.allhistoryForEachUser}
            renderItem={({ item: historyItem }) => (
              <Box 
                data={historyItem}
                onSelect={()=>{
                  navigation.navigate("รายละเอียดการร้องเรียน", {data: historyItem, userName:item.userName, navigation:navigation })
                }}
              />
            )}
            keyExtractor={(historyItem, index) => index.toString()}
        />
        <Text> </Text>
      </View>
    )
    
    
  };

  // ลบได้
  const [searchText, setSearchText] = useState('');
  const filteredData = AllUser_FromDB.filter(item =>
    item.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.list}>
      <View style={{width:'100%', height:"17%", flexDirection:'column', marginTop:"10%"}}>
        <View>
          <Text style={{fontSize:20, color:'#004466', fontWeight:'600'}}>สถานะการร้องเรียน:</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Username..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>


      {/* ด้านล้างเป็นโซนของ รายการร้องเรียน */}
      <View style={{ width:'100%', height:"100%", flexDirection:'row'}}>
        <SafeAreaView style={styles.container}>
          {/* ของเก่า */}
          {/* <FlatList 
            // navigation={navigation} 
            data={AllUser_FromDB}
            renderItem={(item) => 
              renderList(item, { navigation })
              
              // renderList(item, { navigation, id, dataUser })
            } 
            numColumns={1} 
            keyExtractor={(item, index) => item.userName}
          /> */}
          <FlatList
            data={filteredData}
            renderItem={(item) => renderList(item, { navigation })}
            numColumns={1}
            keyExtractor={(item, index) => item.userName}
          />

          <Text>  </Text>
          <Text>  </Text>
          <Text>  </Text>
          <Text>  </Text>
           
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor:"#E3E1F3",
    paddingLeft:"5%"
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
    top:-10,
    marginBottom:50,
    // backgroundColor:'lime',
  },
  searchInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 16,
    paddingLeft: 15,
    marginRight:15,
    marginTop:15,
    backgroundColor:'white',
    borderRadius:10,
    paddingVertical:10,
  },

});


export default Complaint