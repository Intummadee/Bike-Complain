import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, FlatList, Button, Text, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Modal from 'react-native-modal';

// Icon
import { AntDesign } from "@expo/vector-icons"; 
import { FontAwesome } from '@expo/vector-icons'; 

// Firebase
import firebase from "../../database/firebaseDB";

// Component
import GridWinList from "../../components/adminComponents/GridWinList";

// AdminScreen
import AddDataForm from './AddForm';



// const dummyData = [
//   {number: 1, name: "นายโยคี ขี่", place:"วินคลอง" , pic: require('../assets/raiden.jpg') },
//   {number: 1, name: "นายโยคี ขี่", place:"วินคลอง" , pic: require('../assets/raiden.jpg') },
//   {number: 1, name: "นายโยคี ขี่", place:"วินคลอง" , pic: require('../assets/raiden.jpg') },
//   {number: 1, name: "งงอะ", place:"วินคลอง" , pic: require('../assets/raiden.jpg')},
//   {number: 1, name: "งงอะ", place:"วินคลอง" , pic: require('../assets/raiden.jpg')},
//   {number: 1, name: "งงอะ", place:"วินคลอง" , pic: require('../assets/raiden.jpg')},
// ]

const dummyCost = [
  {des: "วิศวะ/ตึกพระเทพ" , cost: "15"},
  {des: "FBT", cost: "30"},
  {des: "RNP", cost: "40"},
  {des: "โรบินสัน", cost: "50"},
  
] 
    

const FirstRoute = (props) => {
  const [searchText, setSearchText] = useState('');

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  // Function to open the Add Data Form
  const handleOpenAddForm = () => {
    setIsAddFormVisible(true);
  };

  // Function to close the Add Data Form
  const handleCloseAddForm = () => {
    setIsAddFormVisible(false);
  };
  // Filter items based on search text
  const filteredWin = props.allWin.filter(item => {
    const searchTextLower = searchText.toLowerCase()
    return (
      item.name.toLowerCase().includes(searchTextLower) ||
      item.no.toLowerCase().includes(searchTextLower)
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="เพิ่มรายชื่อวิน" onPress={handleOpenAddForm} />
        <Modal visible={isAddFormVisible} style={styles.modalContainer} animationType="slide">
          {/* modal Formอยู่ตรงนี้ */}
            <AddDataForm allPrice={props.allPrice} allWin={props.allWin} service_point={props.service_point}  onClose={handleCloseAddForm} />
        </Modal>
      </View>
      {filteredWin.length > 0 ? ( // Conditional rendering based on search results
        <FlatList
          data={filteredWin}
          renderItem={({ item, index }) => (
            <GridWinList
              dataItem={item}
              service_point={props.service_point}
              onSelect={() => {
                props.navigation.navigate("WinDetail", {
                  routeData: item,
                  point: props.service_point,
                  item: index
                });
              }}
            />
          )}
          numColumns={2}
        />
      ) : (
        <Text style={{textAlign: 'center'}}>ไม่พบผลการค้นหา</Text> // Display a message when no results are found
      )}
    </View>
  );
};
     
  
  const SecondRoute = (props) => (
    <View style={styles.list}>
      <FlatList 
        style={{ width: "100%", }}
        data={props.myPrice} 
        renderItem={
          ({ item  ,index }) => (
            <View style={{flex:3, flexDirection:'row' ,marginTop:"5%", }}>
               <View style={{width:"50%", flexDirection:'row', justifyContent:'flex-start' , height: 'auto' ,alignItems:'center' ,}}>
                  <Text style={{marginLeft:'10%', width:'100%', fontSize:17, }}> <FontAwesome name="circle" size={15} color="#FF724C" style={{}} /> {item.des}</Text>
               </View>
               <View style={{width:"50%", alignItems:'center', justifyContent:'center' }}>
                  <Text style={{fontSize:15}}>{item.cost} บาท</Text>
               </View>
            </View>
          )} 
        
      />
    </View>
  );
  


const WinList = ({ navigation, route }) => {
    const layout = useWindowDimensions();
    const data = route.params.service;
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'รายชื่อผู้ขับขี่'},
      { key: 'second', title: 'ราคา' },
    ]);

    



    // ไว้เก็บ จุดให้บริการ ที่ผู้ใช้เลือก
    const [nameService_point, setnameService_point] = React.useState("")
    
    // FireBase
    const subjCollection = firebase.firestore().collection("Service_Points");
    // array of Win
    const [subject_list, setsubject_list] = React.useState([]);
    // array of Price
    const [price_list, setprice_list] = React.useState([]);
    
    const getCollection = (querySnapshot) => {
      const all_data = [];
      const all_price = [];
      querySnapshot.forEach((res) => {
          console.log("res: ", res.id); // จะได้ชื่อ documentมา เช่น  ซอยเกกี1, ซอยเกกี 3
          console.log("res.data() : ", res.data()); // res.data().ซอยเกกี1 = {price : [], winAll : []} 
          
          if(res.id == data){
            res.data().winAll.forEach((item) => {
              all_data.push(item)
              setnameService_point(res.id)
            })
            res.data().price.forEach((item) => {
              all_price.push(item)
            })
            setsubject_list(all_data);
            setprice_list(all_price);
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
    
    

    const renderTabBar = props => (
      <TabBar
          {...props}
          activeColor={'#FF9770'}
          inactiveColor={'white'}
          indicatorContainerStyle={{backgroundColor:"#004466"}}
          indicatorStyle={{backgroundColor:'#FF9770', height:"10%"}}
      />
    );

    return (
      <TabView
        
        navigationState={{ index, routes }}
        renderScene={
          // SceneMap = ฟังก์ชันที่ใช้สร้าง map ของ component ที่ควรแสดงในแต่ละ tab ของ TabView.
          SceneMap({
            first: () => <FirstRoute allWin={subject_list} allPrice={price_list}  navigation={navigation} service_point={nameService_point} />,
            second: () => <SecondRoute myPrice={price_list} /> ,
          })
        }
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        
      />
   
    );
}


const styles = StyleSheet.create({
  list: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    searchInput: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 5,
    },
    
});


export default WinList