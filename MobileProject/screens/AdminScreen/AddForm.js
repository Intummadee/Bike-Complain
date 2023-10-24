import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import firebase from "../../database/firebaseDB";

const AddDataForm = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [image, setImage] = useState(null);
  const [license, setLicense] = useState(null);
  const [license_img, setLicense_img] = useState(null);


    return (
        
        <View style={styles.container}>
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
                value={no}
                onChangeText={setLicense}
            />
            <Text style={styles.label}>รูปผู้ขับขี่:</Text>
            
            <Button title="อัปโหลดไฟล์" />

            <Text style={styles.label2}>ใบอนุญาตขับรถจักรยานยนต์สาธารณะ:</Text>

            <Button title="อัปโหลดไฟล์" />

            <View style={styles.buttonContainer}>
                <Button title="ยกเลิก" onPress={onClose}
                color={'red'}
                />
                <Button title="ยืนยัน"
                    color={'green'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 36,
    backgroundColor: 'white',
    height: 570,
   
    borderRadius: 10,
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
  },
  fontButton:{
    width: '40px',
  }
});

export default AddDataForm;