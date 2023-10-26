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
     
  
const SecondRoute = (props) => {

  const [editedPriceList, setEditedPriceList] = useState(props.myPrice);
  const data = props.data;

  const [newItem, setNewItem] = useState({ des: '', cost: '' });
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleAddItem = () => {
    if (newItem.des && newItem.cost) {
      // Create a new item object
      const newItemObject = { des: newItem.des, cost: newItem.cost };

      // Update the state to include the new item
      setEditedPriceList([...editedPriceList, newItemObject]);

      // Clear the form input fields
      setNewItem({ des: '', cost: '' });

      // Close the form modal
      setIsAddFormVisible(false);

      // Add the new item to your Firebase database
      // (You can add the Firebase update code here)
      const priceRef = firebase.firestore().collection("Service_Points").doc(data);

    priceRef.get()
      .then((doc) => {
        const currentData = doc.data();
        currentData.price.push(newItemObject);

        priceRef
          .update({ price: currentData.price })
          .then(() => {
            console.log("New item added successfully to Firebase.");
          })
          .catch((error) => {
            console.error("Error adding new item to Firebase: ", error);
          });
      })
      .catch((error) => {
        console.error("Error getting Firebase document: ", error);
      });
    }
  };

  const handleFormClose = () => {
    setNewItem({ des: '', cost: '' });
    setIsAddFormVisible(false);
  };

  const handleCostChange = (index, newText) => {
    const updatedPriceList = [...editedPriceList];
    updatedPriceList[index].cost = newText;
    setEditedPriceList(updatedPriceList);
  };

  const saveCostChangesToFirebase = () => {
    // Loop through the editedPriceList and update Firebase data
    editedPriceList.forEach((item, index) => {
      const priceRef = firebase.firestore().collection("Service_Points").doc(data);
      priceRef.get().then((doc) => {
        const currentData = doc.data();
        editedPriceList.forEach((item, index) => {
          currentData.price[index].cost = item.cost;
        });

        priceRef
          .update({ price: currentData.price })
          .then(() => {
            console.log(`Cost for item ${index} updated successfully`);
          })
          .catch((error) => {
            console.error(`Error updating cost for item ${index} in ${data}: ${error}`);
          });
      });
    });
  };


  // Function to handle text input changes
  const handleTextChange = (index, newText) => {
    const updatedPriceList = [...editedPriceList];
    updatedPriceList[index].des = newText;
    setEditedPriceList(updatedPriceList);
  };

  const handleDeleteItem = (index) => {
    const updatedPriceList = [...editedPriceList];
    updatedPriceList.splice(index, 1); // Remove the item at the specified index
  
    // Update Firebase to remove the item at the specified index
    const priceRef = firebase.firestore().collection("Service_Points").doc(data);
  
    priceRef.get().then((doc) => {
      const currentData = doc.data();
      currentData.price.splice(index, 1); // Remove the item from the array in Firebase
      priceRef
        .update({ price: currentData.price })
        .then(() => {
          console.log(`Item at index ${index} deleted successfully`);
        })
        .catch((error) => {
          console.error(`Error deleting item at index ${index}: ${error}`);
        });
    });
  
    // Set the editedPriceList with the item removed
    setEditedPriceList(updatedPriceList);
};


  const saveChangesToFirebase = () => {
    // Loop through the editedPriceList and update Firebase data
    editedPriceList.forEach((item, index) => {
      console.log("doc index", index)
      const priceRef = firebase.firestore().collection("Service_Points").doc(data);
      priceRef.get()
        .then((doc) => {
          const currentData = doc.data();
          editedPriceList.forEach((item, index) => {
            currentData.price[index].des = item.des;
          });

          priceRef.update({ price: currentData.price })
            .catch((error) => {
              console.error(`Error updating price items in ${data}: ${error}`);
            });
        });
    });
  };


  return (
    <View style={styles.list}>

      <FlatList
        style={{ width: "100%" }}
        data={props.myPrice}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: "5%" }}>
            <View style={{ width: "40%", flexDirection: 'row', height: 'auto'}}>
              <Text style={{ marginLeft: '15%', fontSize: 17 }}> <FontAwesome name="circle" size={15} color="#FF724C" /></Text>
              <TextInput
                value={item.des}
                style={{ marginLeft: '10%', width: '100%', fontSize: 18 }}
                onChangeText={(newText) => handleTextChange(index, newText)}
                onEndEditing={saveChangesToFirebase}
              />
                <TextInput
                  value={item.cost}
                  style={{  fontSize: 17 }}
                  onChangeText={(newText) => handleCostChange(index, newText)}
                  onEndEditing={saveCostChangesToFirebase}
                />

                <Text style={{ marginTop: 3, marginLeft: 10,  fontSize: 18 }}>บาท</Text>
                <FontAwesome
                  name="trash"
                  size={18}
                  color="red"
                  style={{ marginTop: '3%',marginLeft: '40%', cursor: 'pointer' }}
                  onPress={() => handleDeleteItem(index)}
                />
              
            </View>
          </View>
        )}
      />
      {/* "Add" button to open the form */}
      
      <View style={{marginBottom: 15, marginTop: 12}}>
        <Button
        title='เพิ่มรายการใหม่'
        
        onPress={() => setIsAddFormVisible(true)}
        />
      </View>

      {/* Form Modal */}
      <Modal isVisible={isAddFormVisible} style={{alignItems: 'center'}}>
        <View style={styles.formContainer}>
        <Text style={{fontSize: 18}}>สถานที่:</Text>
          <TextInput
            style={{borderWidth: 1, width: '100%'}}
            value={newItem.des}
            onChangeText={(text) => setNewItem({ ...newItem, des: text })}
          />
          <Text style={{fontSize: 18}}>ราคา:</Text>
          <TextInput
            style={{borderWidth: 1, width: '100%'}}
            value={newItem.cost}
            onChangeText={(text) => setNewItem({ ...newItem, cost: text })}
          />
          <View style={{marginTop: 15}}>
          <Button
            title='ยกเลิก'
            onPress={handleFormClose}
            color={"red"}
          />
          </View>

          <View style={{marginTop: 5}}>
           <Button
            title='ยืนยัน'
            color={"green"}
            onPress={handleAddItem}
          />
          </View>
          
        </View>
      </Modal>
    </View>
  );
};
  


const WinList = ({ navigation, route }) => {
    const layout = useWindowDimensions();
    const data = route.params.service;
    console.log(data, "data");
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
          // console.log("res: ", res.id); // จะได้ชื่อ documentมา เช่น  ซอยเกกี1, ซอยเกกี 3
          // console.log("res.data() : ", res.data()); // res.data().ซอยเกกี1 = {price : [], winAll : []} 
          
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
            second: () => <SecondRoute myPrice={price_list} data={data} /> ,
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
    formContainer: {
      backgroundColor: 'white',
      padding: 20,
      width: '75%',
      borderRadius:10
    },
    
});


export default WinList