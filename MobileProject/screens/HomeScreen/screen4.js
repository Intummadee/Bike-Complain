import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TextInput,Button } from 'react-native';
// import firebase from "../../database/db";
import firebase from '../../database/firebaseDB';


function screen4() {

    const subjCollection = firebase.firestore().collection("Users");
    const getCollection = (querySnapshot) => {
         
        querySnapshot.forEach((res) => {
            console.log(res.data());
        });
 
    };

    useEffect(() => {
        const unsubscribe = subjCollection.onSnapshot(getCollection);
        return () => {
          unsubscribe(); // ในบางกรณี, คุณต้องการทำงานบางอย่าง (เช่น, unsubscribe จาก Firebase, หรือทำความสะอาดข้อมูลที่ไม่ได้ใช้ = Unmounting (การลบ component ออกจาก DOM)
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    
    
    
    const [id , changeID] = useState('');
  return (
    <View style={styles.container}>
        
        <View style={styles.content}>
            <TextInput
                style={styles.input}
                placeholder="Student ID"
                onChangeText={changeID}
                value={id}
            />

            <Text>{id}</Text>
            
        </View>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#fff',
      
    },
    header:{
      flex: 0.1,
      backgroundColor: "#1E90FF",
      justifyContent: 'flex-start',
    },
    content:{
      flex: 0.8,
      justifyContent:'center',
      alignItems:'center',
      width: 'auto',
    },
     
    tinyLogo: {
      width: 160,
      height: 130,
    },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      placeholderTextColor: 'gray',
      borderBottomWidth: 1,
      
    },
    btn:{
      width:200,
    },
    btn1:{
      width:'100',
      paddingTop: 50,
      marginTop: 50,
    },
    content2:{
      height: 80,
      width: "60%",
      alignSelf:'center',
      justifyContent:'space-between'
    }
  });
  


export default screen4