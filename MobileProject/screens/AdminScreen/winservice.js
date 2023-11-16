import React, {useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";


// Import Firebase
import firebase from "../../database/firebaseDB";


const WinService = ({ navigation }) => {
  const [serviceData, setServiceData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Reference the "Classes" collection in Firestore
    const serviceRef = firebase.firestore().collection("Service_Points");

    // Retrieve the documents (class names) from the collection
    serviceRef.get().then((querySnapshot) => {
      const names = [];
      querySnapshot.forEach((doc) => {
        // Assuming each document contains a "title" field
        names.push({id: doc.id});
      });
      console.log("ข้อมูลที่ได้รับจาก Firestore:", names);
      setServiceData(names);
    });
  }, []);


 // const colors = ["rgba(245, 66, 141, 0.5)", "rgba(245, 66, 66, 0.60)","rgba(245, 164, 66, 0.65)", "rgba(245, 209, 66, 0.60)", "rgba(54, 141, 255, 0.55)", "rgba(65, 217, 93, 0.5)"]
  
const renderGridItem = (itemData) => {
    const backgroundColors = ["rgba(245, 66, 141, 0.5)", "rgba(245, 66, 66, 0.60)","rgba(245, 164, 66, 0.65)", "rgba(245, 209, 66, 0.60)", "rgba(54, 141, 255, 0.55)", "rgba(65, 217, 93, 0.5)"]

    // Calculate the index to select the background color
    const colorIndex = itemData.index % backgroundColors.length;


   
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          setSelectedClass(itemData.item.id);
          navigation.navigate("WinList", { service: itemData.item.id });
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor:backgroundColors[colorIndex],
          }}
        >
          
          <Text style={styles.title} numberOfLines={2}>
            {itemData.item.id}
          </Text>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{itemData.index + 1}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={serviceData} renderItem={renderGridItem} numColumns={2} />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    backgroundColor:'#E3E1F3',
    // backgroundColor:'black',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    justifyContent: "flex-end",
    position: "relative",
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    // fontFamily: "IBMPlexSansThai-Bold"
    fontWeight: "600"
  },
  numberContainer: {
    position: "absolute",
    top: 10, 
    right: 10, 
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  number: {
    color: "black",
    fontSize: 30,
    fontWeight: "600"
  },
});

export default WinService;