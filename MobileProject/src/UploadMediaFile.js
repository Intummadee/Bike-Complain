// import React, { useState, useEffect } from 'react';
// import { View, Button, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// // import { storage } from '../database/firebase'; // import Firebase storage instance
 
// import storage from "../database/firebase"; // Import storage instance

// const UploadImage = () => {
//   const [image, setImage] = useState(null);

//   // useEffect(() => {
//   //   (async () => {
//   //     if (Platform.OS !== 'web') {
//   //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   //       if (status !== 'granted') {
//   //         alert('Sorry, we need media library permissions to make this work.');
//   //       }
//   //     }
//   //   })();
//   // }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   // const uploadImage = async () => {
//   //   const response = await fetch(image);
//   //   const blob = await response.blob();

//   //   const filename = new Date().getTime() + '.jpg'; // Generate unique filename
//   //   const storageRef = storage.ref().child('images/' + filename); // Set storage reference path

//   //   await storageRef.put(blob);
//   //   alert('Image uploaded successfully!');
//   // };

//   const uploadImage = async () => {
//     const response = await fetch(image);
//     const blob = await response.blob();

//     const filename = new Date().getTime() + '.jpg';
//     const storageRef = storage.ref().child('images/' + filename);

//     await storageRef.put(blob);
//     alert('Image uploaded successfully!');
//   };

//   return (
//     <View>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       {image && <Button title="Upload Image" onPress={uploadImage} />}
//     </View>
//   );
// };

// export default UploadImage;
