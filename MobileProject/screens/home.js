import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground, Image,TextInput,Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';



const dummyData = [
    {
        id:"รถจักรยานยนต์สาธารณะที่ถูกกฎหมาย",
        image: require('../assets/รูปวิน-1.jpg')
    }
    ,{
        id:"คำว่าวินมาจากไหน",
        image: require('../assets/รูปวิน-2.jpg')
    },{
        id:"เลือกใช้วินมอเตอร์ไซค์ถูกกฎหมาย",
        image: require('../assets/รูปวิน-3.webp')
    }
]

 


const home = ({navigation}) => {

   


    const renderMealItem = (itemData) => {     
        return (
            <View style={styles.mealItem}>
                <TouchableOpacity onPress={() => { navigation.navigate("screen1", {item: itemData.item}) }}>
                    <View>
                        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                            <ImageBackground source={itemData.item.image} style={styles.bgImage}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}  numberOfLines={1}>
                                        {itemData.item.id}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>


                        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                            
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.list}>
            <FlatList
                style={{ width: "100%", marginTop:"20px", }}
                data={dummyData}
                renderItem={renderMealItem}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    mealItem: {
      flex:1,
      height: 300,
      width: "90%",
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      overflow: "hidden",
      alignSelf:"center",
    },
    mealRow: {
      flexDirection: "row",
      marginBottom:'20%',
      marginTop:"10%",
    },
    mealHeader: {
      backgroundColor:'yellow',
      // ตรงรูปภาพ background 
      height: "80%",
    },
  
    mealDetail: {
      zIndex: 10000,
      paddingHorizontal: 20, //แนวนอน
      paddingVertical: 10, //แนวนอน
      justifyContent: "space-between",
      // alignItems: "center",
      height: "45%",
    },
  
    
    bgImage: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
    },
    titleContainer: {
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingVertical: 20,
      paddingHorizontal: 12,
    },
    title: {
      // fontFamily: "open-sans-bold",
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
    },
  });
  

export default home;