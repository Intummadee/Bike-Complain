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
    console.log("pickImage 🟢🟢🟢");
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
      console.log("image => ",uploadURL);
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
      //  uploadBytes เป็น ฟังชัน upload ไปยัง storage
      const result = await uploadBytes(storageRef, blob);

      // We're done with the blob, close and release it
      blob.close();
      return await getDownloadURL(storageRef);

    }catch(err){
      alert(err+"")
    }
   };


  // สำหรับ ลบ รูปภาพ 
  const deleteImage = async () => {
      setloading(true);
      const deleteRef = ref(storage, image);
      // image = https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Image%2Fimage-1697881800366?alt=media&token=82981114-0602-4fe8-a76d-a3507a1866b3
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

  // เอาไว้ เพิ่มข้อมูล ลงใน ข้อมูล user
  const addImage = async  () => {
    console.log("addImage 🔴🔴🔴");
    let firebaseImageUrl = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Image%2Fimage-1697882372354?alt=media&token=460a6b9c-7861-41f7-a248-193f43b20360";

    

     


    


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
            <Button title='deleteImage' onPress={deleteImage} />
            
            </>
          )}

          <View style={{flex:0.3}}>
            <TouchableOpacity style={{borderWidth:1, backgroundColor:'yellow', margin:10, padding:10}} 
            onPress={addImage}>
              <Text>downloadImageFromStorage</Text>
            </TouchableOpacity>
          </View>
            

          {!image ? (
            // ไม่มีรูปภาพ
            <View style={{backgroundColor:'grey'}}>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            ) : (
              // กรณีมีรูป
              <View style={{backgroundColor:'white'}}>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
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