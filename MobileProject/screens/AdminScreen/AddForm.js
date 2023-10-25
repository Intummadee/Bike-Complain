import React, { useEffect,useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, TouchableOpacity,
  SafeAreaView,
  ScrollView 

} from 'react-native';

// Icon
import { AntDesign } from '@expo/vector-icons'; 

// Database & Storage
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../database/testDatabase';
import { getDownloadURL ,uploadBytes, ref, deleteObject } from 'firebase/storage';
import firebase from "../../database/firebaseDB";



const AddDataForm = ( props ) => {
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [license, setLicense] = useState(null);
  
  const service_point = props.service_point // จะได้จุดให้บริการมา เช่น ซอยเกกี 3 , ซอยเกกี1

  // forImage
  const [image, setImage] = useState(null);
  const [imageLicense, setImageLicense] = useState(null);
  const [isloading, setloading] = useState(false)
  const [isloadingLicense, setloadingLicense] = useState(false)

  const defaultImage = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Service_Points%2Fmr-anonymous.png?alt=media&token=dcf6f7bb-6940-434e-8aae-8e9aee445bf1"

  const pickImage = async () => {
    console.log("pickImage 🟢🟢🟢");
    setloading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        const uploadURL = await uploadImageAsync(result.assets[0].uri)
        setImage(uploadURL);
        console.log("image 🎋🎋 => ",uploadURL); // ได้ url มาตรงupload
        setInterval(() => {
            setloading(false)
        }, 1000);
    }
    else{
        console.log("ทำไม");
        setImage(win_url_data)
        setInterval(()=>{
          setloading(false);
        },2000);
    }
  }
  // สำหรับใบอนุญาต
  const pickImageLicense = async () => {
    console.log("pickImage 🟢🟢🟢");
    setloadingLicense(true)
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        const uploadURL = await uploadImageAsync(result.assets[0].uri)
        setImageLicense(uploadURL);
        console.log("image 🍉🍉 => ",uploadURL); // ได้ url มาตรงupload
        setInterval(() => {
            setloadingLicense(false)
        }, 1000);
    }
    else{
        console.log("ทำไม");
        setImageLicense(licenseWin)
        setInterval(()=>{
            setloadingLicense(false);
        },2000);
    }
}
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
    try{
        const storageRef = ref(storage, `Service_Points/-`+service_point+`/`+Date.now());
        //  uploadBytes เป็น ฟังชัน upload ไปยัง storage
        const result = await uploadBytes(storageRef, blob);
  
        // We're done with the blob, close and release it
        blob.close();
        return await getDownloadURL(storageRef);
  
    }catch(err){
        alert(err+"")
    }
}
// สำหรับ ลบ รูปภาพ 
  const deleteImage = async () => {
    setloading(true);
    setloadingLicense(true)
    const deleteRef = ref(storage, image);
    const deleteRef1 = ref(storage, imageLicense); // ลบรูปของlicense
    // image = https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Image%2Fimage-1697881800366?alt=media&token=82981114-0602-4fe8-a76d-a3507a1866b3
    try{
        deleteObject(deleteRef1).then(() => {
            // setImageLicense(licenseWin)
            setloadingLicense(false)
        })
        deleteObject(deleteRef).then(() => {
            // setImage(win_url_data);
            setInterval(() => {
                setloading(false);
            }, 2000);
        })
    }catch(err){
        console.log("errorอีกแหละ ไอสัส : " + err);
    }
  } 
  
  // console.log("props");
  // console.log(props);
  
  const subjCollection = firebase.firestore().collection("Service_Points");
  const [all_price , setAll_price] = useState([]);
  const [all_winAll , setAll_winAll] = useState([]);

  const updateStore = () => {
    console.log("🍯🍯 updateStore");
    let newWinAll = [...props.allWin];
    if(win_url == null){
      setImage(defaultImage);
    }
    if(license_url == null){
      setImageLicense(defaultImage);
    }
    newWinAll.push({
      license:license,
      license_url:imageLicense,
      name: name,
      no: no,
      win_url: image,
    })
    console.log(newWinAll);



    subjCollection.doc(service_point)
    .set({
      price:props.allPrice,
      winAll:newWinAll,
    })
    .then(() => {
      console.log("เสร็จแล้ว");
    }).catch(() => {
        alert("ยูเซอร์ไม่ถูก Add");
    })


  }
    




    return (
      <SafeAreaView style={styles.container}>
        <ScrollView  style={styles.scrollView}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>เพิ่มรายชื่อวิน</Text>
            <Text style={styles.label}>ชื่อ-นามสกุล:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>หมายเลขคิววิน:</Text>
            <TextInput
                style={styles.input}
                value={no}
                onChangeText={setNo}
            />
            <Text style={styles.label}>เลขทะเบียนรถจักรยานยนต์:</Text>
            <TextInput
                style={styles.input}
                value={license}
                onChangeText={setLicense}
            />
            <Text style={styles.label}>รูปผู้ขับขี่:</Text>
            
            {/* <Button title="อัปโหลดไฟล์" /> */}
            {!image ? (
            <>
              {isloading ? (
                <View style={{flex:1, backgroundColor:'cyan' , justifyContent:'center'}}>
                  <ActivityIndicator color={"red"} animating size={"large"} />
                </View>
              ) : (
                    <TouchableOpacity style={{borderWidth:1, 
                        alignItems:'center',
                        width:"50%",
                        padding: 10,// แก้ขนาดปุ่ม
                        borderRadius:5,
                        marginTop:10,
                        borderColor:'grey' , backgroundColor:'#D9D9D9',
                        borderColor:'black',
                      }}
                          onPress={()=>{
                            pickImage()
                        }}
                      >
                        <Text style={{fontSize:12, fontWeight:'bold'}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                    </TouchableOpacity>
              )}
            </>
            ) : (
            <>
              <View style={{flex:0.4, backgroundColor:'cyan' , justifyContent:'center' , width:"50%", alignContent:'center',alignItems:'center' , alignSelf:'center' ,height:'auto'}}>
                  <Image style={{width:"100%", height:200, }} source={{uri : image}} />
              </View>
            </>
            )}


            <Text style={styles.label2}>ใบอนุญาตขับรถจักรยานยนต์สาธารณะ:</Text>

            {/* <Button title="อัปโหลดไฟล์" /> */}
            {!imageLicense ? (
            <>
              {isloadingLicense ? (
                <View style={{flex:1, backgroundColor:'cyan' , justifyContent:'center'}}>
                  <ActivityIndicator color={"red"} animating size={"large"} />
                </View>
              ) : (
                <TouchableOpacity style={{borderWidth:1, 
                  alignItems:'center',
                  width:"50%",
                  padding: 10,// แก้ขนาดปุ่ม
                  borderRadius:5,
                  marginTop:10,
                  borderColor:'grey' , backgroundColor:'#D9D9D9',
                  borderColor:'black',
                }}
                    onPress={()=>{
                      pickImageLicense()
                  }}
                  >
                    <Text style={{fontSize:12, fontWeight:'bold'}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                </TouchableOpacity>
              )}
            </>
            ) : (
            <>
              <View style={{flex:0.4, backgroundColor:'cyan' , justifyContent:'center' , width:"50%", alignContent:'center',alignItems:'center' , alignSelf:'center' ,height:'auto'}}>
                <Image style={{width:"100%", height:200}} source={{uri : imageLicense}} />
              </View>
              
            </>
            )}



            <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonEnd, {backgroundColor:'#F65045'}]}
                onPress={()=>{
                  deleteImage() 
                  props.onClose()
                }}>
                  <Text>ยกเลิก</Text>
            </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonEnd, {backgroundColor:'#05A56B'}]}
                onPress={()=>{updateStore()}}>
                  <Text>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 36,
    backgroundColor: 'white',
    height: 570,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontalRight: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  label2: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 18
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  buttonContainer:{
    flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginTop: 20,
      backgroundColor:'yellow',
  },
  fontButton:{
    width: '40px',
  },
  buttonEnd: {
    width:90, 
    justifyContent:'center', 
    alignItems:'center', 
    padding:10,
    borderRadius:30,
  }
});

export default AddDataForm;