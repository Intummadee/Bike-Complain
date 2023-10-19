import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Text,

} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../database/testDatabase';
import { getDownloadURL ,uploadBytes, ref, deleteObject } from 'firebase/storage';
 
 



const testUpload = () => {

   const [image, setImage] = useState(null)
   const [isloading, setloading] = useState(false)

   const [imageURL, setImageURL] = useState(null);

   const pickImage = async  () => {
    setloading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result: ",result);

    if (!result.canceled) {
      console.log("result.assets[0].uri ", result.assets[0].uri );
      
      // จุดที่ผู้ใช้ไม่ยกเลิกอัพโหลดภาพ
      // setImage(result.assets[0].uri);
      const uploadURL = await uploadImageAsync(result.assets[0].uri)
      setImage(uploadURL);
      console.log("uploadURL => ",uploadURL);
      setInterval(() => {
        setloading(false)
      }, 1000);
    }
    else{
      console.log("ทำไม");
      setImage(null)
      setInterval(()=>{
        setloading(false);
      },2000);
    }
   };

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
      const storageRef = ref(storage, `Image/image-`+Date.now());
      const result = await uploadBytes(storageRef, blob);

      // We're done with the blob, close and release it
      blob.close();
      return await getDownloadURL(storageRef);

    }catch(err){
      alert(err+"")
    }
   };

   const deleteImage = async () => {
    setloading(true);
    const deleteRef = ref(storage, image);
    try{
      deleteObject(deleteRef).then(() => {
        setImage(null);
        setInterval(() => {
          setloading(false);
        }, 2000);
      })
    }catch(err){
      console.log("errorอีกแหละ ไอสัส : " + err);
    }
   } 

  
  const downloadImage = async  () => {
    try {
    // เรียกใช้ URL ที่คุณได้รับจาก Firebase Storage
    const response = await fetch('https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Image%2Fimage-1697737165098?alt=media&token=6e8d344a-d42e-4255-b4b4-e60eabe6d9f1');
    const blob = await response.blob();

    // สร้าง URL สำหรับรูปภาพที่ดาวน์โหลด
    const url = URL.createObjectURL(blob);
    setImageURL(url);

    // นำ URL นี้ไปใช้งานต่อ โดยเช่นการแสดงรูปภาพในแอปของคุณ
    console.log('Downloaded image URL:', url);
    }
    catch(err){
      console.error('Error downloading image:', err);
    }
  }


  return (
    <View style={styles.container}>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          {!image ? (
            <>
              {isloading ? (
                <View style={{flex:1, backgroundColor:'cyan' , justifyContent:'center'}}>
                  <ActivityIndicator color={"red"} animating size={"large"} />
                </View>
              ) : (
                <Button title="Pick Image" onPress={pickImage} />
              )}
            </>
          ) : (
            <>
            {image && (<View style={{flex:0.4, backgroundColor:'yellow' , justifyContent:'center' , width:"50%", alignItems:'center', height:'auto'}}>
                <Image style={{width:200, height:200}} source={{uri : image}} />
                <Text>งง</Text>
            </View>)}
            <Button title='ขอร้องไม่อยากแก้แล้ว' onPress={deleteImage} />
            
            </>
          )}

          <View style={{flex:0.3}}>
            <TouchableOpacity style={{borderWidth:1, backgroundColor:'yellow', margin:10, padding:10}} 
            onPress={downloadImage}>
              <Text>downloadImage</Text>
            </TouchableOpacity>
          </View>
            

          {imageURL ? (
            <View style={{backgroundColor:'grey'}}>
              <Image
                source={{ uri: imageURL }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            ) : (
              <Button title='Download Image' onPress={downloadImage} />
            )}


      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});




export default testUpload