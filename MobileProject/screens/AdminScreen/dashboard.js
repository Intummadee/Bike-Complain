import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from "../../database/firebaseDB";

export default function Dashboard() {
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalRedComplaints, setTotalRedComplaints] = useState(0);
  const [totalGreenComplaints, setTotalGreenComplaints] = useState(0);
  const [mostFrequentNames, setMostFrequentNames] = useState([]);
  
  // Declare nameCountMap at the component level
  const [nameCountMap, setNameCountMap] = useState(new Map());

  useEffect(() => {
    const usersRef = firebase.firestore().collection('Users');

    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      let totalComplaintsCount = 0;
      let totalRedComplaintsCount = 0;
      let totalGreenComplaintsCount = 0;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.history) {
          const redComplaints = userData.history.filter(
            (entry) => entry.status === 'red'
          );

          const greenComplaints = userData.history.filter(
            (entry) => entry.status === 'green'
          );

          totalRedComplaintsCount += redComplaints.length;
          totalGreenComplaintsCount += greenComplaints.length;

          totalComplaintsCount += userData.history.length;

          // Count names in the history and gather place and detail
          userData.history.forEach((entry) => {
            const name = entry.nameWin;
            const place = entry.service_point;
            const detail = entry.numberWin;
            if (!nameCountMap.has(name)) {
              nameCountMap.set(name, { count: 0, place, detail });
            }
            nameCountMap.get(name).count++;
          });
          
        }
      });

      setTotalComplaints(totalComplaintsCount);
      setTotalRedComplaints(totalRedComplaintsCount);
      setTotalGreenComplaints(totalGreenComplaintsCount);

      // Find the most frequent names
      const mostFrequentNames = Array.from(nameCountMap.keys())
        .filter(name => nameCountMap.get(name).count > 1)
        .sort((a, b) => nameCountMap.get(b).count - nameCountMap.get(a).count);

      setMostFrequentNames(mostFrequentNames);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.allComplaintContainer}>
        <Text style={{ fontSize: 20, fontWeight:'bold', }}>จำนวนที่ร้องเรียน:</Text>
        <Text style={{ textAlign: 'right', fontSize: 35,  fontWeight:'bold' }}>{totalComplaints}</Text>
      </View>
      <View style={styles.complaint}>
        <View style={styles.done}>
          <Text style={{ fontSize: 35, fontWeight:'bold', textAlign:'center' }}>{totalGreenComplaints}</Text>
          <Text style={{ marginTop: 5, fontSize: 14,fontWeight:'bold', textAlign:'center' }}>ดำเนินการเสร็จแล้ว</Text>
        </View>
        <View style={styles.undone}>
          <Text style={{ fontSize: 35, fontWeight:'bold', textAlign:'center' }}>{totalRedComplaints}</Text>
          <Text style={{ marginTop: 5, fontSize: 14,fontWeight:'bold', textAlign:'center' }}>ยังไม่ได้ดำเนินการ</Text>
        </View>
      </View>
      <View style={{ textAlign: 'left', marginTop: '4%' }}>
        <Text style={{ fontSize: 20,fontWeight:'bold' }}>ลำดับคนที่โดนร้องเรียน:</Text>
      </View>
      
      {mostFrequentNames.map((name, index) => (
        <View style={{flexDirection: 'row', alignItems:'center', marginTop:'3%' , backgroundColor:'white', paddingVertical: 10}}>
            <View style={{width: '40%'}} >
              <Text style={{textAlign: 'center', fontSize: 20, backgroundColor: 'orange', marginVertical: 20, marginHorizontal: 45, borderRadius: 50, padding: 7}}> {index+1}</Text>
            </View>
            
            <View style={{flexDirection: 'column'}}>
              <Text style={{ fontSize: 18 }}> {name}</Text>
              <Text style={{ fontSize: 15 }}> เขต: {nameCountMap.get(name).place}</Text>
              <Text style={{ fontSize: 15 }}> เลขคิววิน: {nameCountMap.get(name).detail}</Text>
            </View>
        </View>
      ))}
      
      <Text> </Text> 
      <Text> </Text> 
      <Text> </Text> 
      
      
       
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor:"red",
  },
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    // backgroundColor: 'green',
    backgroundColor:"#E3E1F3",
    paddingHorizontal: 20,
    paddingTop: 25,
    // marginBottom: 10
  },
  allComplaintContainer: {
    padding: 10,
    backgroundColor: "#F8C484",
    width: "100%",
    borderRadius: 10,
  },
  complaint: {
    //backgroundColor: "yellow",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '4%'

  },
  done: {
    backgroundColor: '#9BFF92',
    width: '48%',
    padding: 20,
    fontSize: 50,
    borderRadius: 10,
  },
  undone: {
    backgroundColor: '#FAA0A0',
    width: '48%',
    padding: 20,
    borderRadius: 10,
  }

});
