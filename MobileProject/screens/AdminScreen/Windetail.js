import React, { useEffect,useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Button, Text, Image,
    TextInput,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';

import Modal from "react-native-modal";


// import icon
import { AntDesign } from '@expo/vector-icons'; 

// Import Firebase
import firebase from "../../database/firebaseDB";
// For Image
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../database/testDatabase';
import { getDownloadURL ,uploadBytes, ref, deleteObject } from 'firebase/storage';


const Windetail = ({ navigation, route }) => {

    

    const data = route.params.routeData; // {license: 'MM00 กรุงเทพมหานคร', no: '02', win_url: 'https://firebasestorage.', license_url: 'url', place: 'วินคลอง 4 เขตลาดกระบัง', name: "Blue Firebase"}
    //  point: 'ซอยเกกี1', item: 0
    // data = { license: "MM100" , license_url: "https://firebasestorage." , name: "โมริ รัน" , no: "103" , win_url: "https://firebasestorage.g }
    const win_url_data = data.win_url
    const point = route.params.point;
    const license_url = data.license_url;
    const item = route.params.item;
    
    const subjCollection = firebase.firestore().collection("Service_Points");
    const [all_price , setAll_price] = useState([]); // สองArrayนี้เอาไว้เก็บ price กับ winทั้งหมดในจุดให้บริการที่ตรงกับที่ adminเลือก
    const [all_winAll , setAll_winAll] = useState([]);

    const getCollection = (querySnapshot) => {
        var all_price = [];
        var all_winAll = [];
        querySnapshot.forEach((res) => {
            if(res.id == point){ 
                // FBT == FBT
                all_price = [...res.data().price]
                all_winAll = [...res.data().winAll]
            }
        });
        setAll_price(all_price);
        setAll_winAll(all_winAll);
      };
    
      useEffect(() => {
        const unsubscribe = subjCollection.onSnapshot(getCollection);
        return () => {
          unsubscribe(); // ในบางกรณี, คุณต้องการทำงานบางอย่าง (เช่น, unsubscribe จาก Firebase, หรือทำความสะอาดข้อมูลที่ไม่ได้ใช้ = Unmounting (การลบ component ออกจาก DOM)
        };
      }, []); // Empty dependency array means this effect runs once after the initial render

      
      
      const [name, setName] = useState(data.name);
      const [regisNumber, setRegisNumber] = useState(data.license);
      const [queueNumber, setQueueNumber] = useState(data.no);
      
      // modal
      const [isModalVisible, setModalVisible] = useState(false);
      
      // สำหรับปุ่มแก้ไขข้อมูลวิน 
      const [edit, setEdit] = useState(false)
      const [buttonEditText, setbuttonEditText] = useState("แก้ไข")
      const [colorButton, setcolorButton] = useState("rgba(255, 193, 7, 1)")
      
      // image
      const [image, setImage] = useState(win_url_data)
      const defaultLicenseWin = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fimage.png?alt=media&token=66e0aaa7-c87e-4d6c-97cd-fe37501affa9";
      
      const [imageLicense, setImageLicense] = useState(license_url) // set รูปภาพเริ่มต้นกรณีที่เราไม่ได้uploadรูปภาพจากคลัง
       
    
    const toggleModal = () => {
        console.log("toggleModal");
        setcolorButton("#FFD808")
        setModalVisible(!isModalVisible);
    };

   

    const updateData = () => {
         
        if(edit == false){
            // แก้ไม่ได้ ให้แก้ได้
            setEdit(true)
            setbuttonEditText("ยืนยันการเปลี่ยนแปลง")
            setcolorButton("#05A56B")
             

        }
        else{
            // แก้ได้ ให้ไม่สามารถแก้ได้ โดยตรงนี้จะอัพเดตลงฐานข้อมูล 
            setcolorButton("rgba(255, 193, 7, 1)")
            setEdit(false)
            setbuttonEditText("แก้ไข")


            
            let test = {...all_winAll[item]} // {no: '15', name: 'Blue Firebase', win_url: '', license: 'MM00 กรุงเทพมหานคร'}
            test.name = name
            test.license = regisNumber
            test.no = queueNumber
            test.win_url = image
            test.license_url = imageLicense

            let newWinAll = [...all_winAll]
            newWinAll[item] = test


            Alert.alert('Confirm', 'ยืนยันการแก้ไขไหม', [
                {
                  text: 'Cancel',
                  onPress: () => {
                    console.log('Cancel Pressed')
                    deleteImage()
                    // กรณีถ้ากดยกเลิกการแก้ไขในตอนDialog จะต้องย้อนค่าstateกลับไปเป็นเหมือนเดิม เหมือนค่าdefault
                    setImage(win_url_data)
                    setImageLicense(license_url)
                    setName(data.name)
                    setRegisNumber(data.license)
                    setQueueNumber(data.no)

                },
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {

                    subjCollection.doc(point)
                    .set({
                        winAll:newWinAll,
                        price:all_price,
                    })
                    .then(() => {
                        navigation.pop();
                    }).catch(() => {
                        alert("ยูเซอร์ไม่ถูก Add");
                    })
                    
                }},
            ]);

        }
    }
    
    const deleteData = () => {

        Alert.alert('Confirm', 'ยืนยันการลบไหม', [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
                // deleteImageFromCancleAlert()
                setImage(win_url_data)
                setImageLicense(defaultLicenseWin)
            },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                let newWinAll = [...all_winAll]
                newWinAll.splice(item, 1);
        
                subjCollection.doc(point)
                .set({
                    winAll:newWinAll,
                    price:all_price,
                })
                .then(() => {
                    navigation.pop();
                }).catch(() => {
                    alert("ยูเซอร์ไม่ถูก Add");
                })
                
            }},
        ]);

    }

    const [isloading, setloading] = useState(false)

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

    const [isloadingLicense, setloadingLicense] = useState(false)

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
            setImageLicense(defaultLicenseWin)
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
            // const storageRef = ref(storage, `Service_Points/Service_Points/-`+service_point+`/`+Date.now());
            const storageRef = ref(storage, `Image/image-`+Date.now());
            //  uploadBytes เป็น ฟังชัน upload ไปยัง storage
            const result = await uploadBytes(storageRef, blob);
            
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
      
        try{
            deleteObject(deleteRef1).then(() => {
                // setImageLicense(defaultLicenseWin)
                setloadingLicense(false)
            })
            deleteObject(deleteRef).then(() => {
                // setImage(win_url_data);
                setInterval(() => {
                    setloading(false);
                }, 2000);
            })
        }catch(err){
            console.log(err);
        }
    } 

    const deleteImageFromCancleAlert = async () => {
        const deleteRef = ref(storage, image);
        const deleteRef1 = ref(storage, imageLicense); // ลบรูปของlicense
        try{
            deleteObject(deleteRef1).then(() => {
                setloadingLicense(false)
            })
            deleteObject(deleteRef).then(() => {
                // setImage(win_url_data);
                setInterval(() => {
                    setloading(false);
                }, 2000);
            })
        }catch(err){
            console.log(err);
        }
    } 

    


    // เปลี่ยนกลับเป็นรูปเดิมสำหรับ รูปหน้าวิน
    const deleteImage1 = async () => {
        setloading(true);
        const deleteRef = ref(storage, image);
        try{
          deleteObject(deleteRef)
          .then(() => {
            setImage(win_url_data);
            setInterval(() => {
              setloading(false);
            }, 2000);

          })
        }catch(err){
          console.log("errorอีกแหละ : " + err);
        }
    }

    // เปล่ี่ยนกลับเป็นรูปเดิมสำหรับ ใบขับขี่วิน
    const deleteImage2 = async () => {
        setloadingLicense(true);
        const deleteRef = ref(storage, imageLicense);
        try{
          deleteObject(deleteRef)
          .then(() => {
            setImageLicense(defaultLicenseWin);
            setInterval(() => {
              setloadingLicense(false);
            }, 2000);

          })
        }catch(err){
          console.log("errorอีกแหละ : " + err);
        }
    }

    

    return (
        <View style={styles.list}>
            <View style={styles.detailBox}>
                <View style={styles.detail}> 
                    {/* กล่องชื่อของวิน */}
                    <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'row', }}>
                        {/* viewด้านล่าง = รูปภาพของ วิน */}
                        <View style={{flex:1, width:"100%", height:"100%", justifyContent:'center', alignItems:'center',alignSelf:'center'}}>
                            <Image source={{uri: image}} style={{width:"90%", height:"50%"}} /> 
                            {image == win_url_data ? (
                                    <>
                                        {isloading ? (
                                            <View style={{flex:0.2,position:'absolute', justifyContent:'center'}}>
                                                <ActivityIndicator color={"red"} animating size={"large"} />
                                            </View>
                                        ) : (
                                            <TouchableOpacity style={{borderWidth:1, 
                                                width:"90%",
                                                padding: 10,// แก้ขนาดปุ่ม
                                                borderRadius:10,
                                                marginTop:10,
                                                borderColor:'grey' , backgroundColor:'#D9D9D9',
                                                borderColor:'black',
                                            }}
                                                onPress={()=>{
                                                    if(edit==true){
                                                        pickImage()
                                                    }
                                                    else{
                                                        alert("กรุณากดแก้ไขก่อน")
                                                    }
                                                }}
                                            >
                                                <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : (
                                    <TouchableOpacity style={{borderWidth:1, 
                                        width:"90%",
                                        padding: 10,// แก้ขนาดปุ่ม
                                        borderRadius:10,
                                        marginTop:10,
                                        borderColor:'grey' , backgroundColor:'#D9D9D9',
                                        borderColor:'black',
                                        }} 
                                        onPress={deleteImage1}>
                                          <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  เปลี่ยนรูปเดิม</Text>
                                          
                                      </TouchableOpacity>
                                    
                            )}

                        </View>
                        <View style={{marginLeft:5, width:"60%" }}>
                            <Text style={styles.text}>ชื่อ:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                value={name}
                                editable={edit}
                            />
                            {/* <Text>{data.name}</Text> */}
                            <Text> </Text>

                            <Text style={styles.text}>เลขทะเบียนรถจักรยานยนต์:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setRegisNumber}
                                value={regisNumber}
                                editable={edit}
                            />
                            {/* <Text>{data.license}</Text> */}
                            
                            <Text> </Text>
                            
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' }} numColumns={2}>
                                <Text style={{flexDirection:'row', width:'30%', fontSize:12, }}>เลขคิววิน: </Text>
                                <TextInput
                                    style={{width:"70%",height:35,backgroundColor:'white', borderRadius:50, paddingLeft:15, }}
                                    onChangeText={setQueueNumber}
                                    value={queueNumber}
                                    editable={edit}
                                    keyboardType="numeric"
                                />
                            </View>
                            
                        </View>
                    </View >
                </View>
            </View>

            <View style={styles.licenseBox}>
                <View style={{justifyContent:'space-evenly', alignSelf:'center', flex:2,  }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>ใบอนุญาตขับรถจักรยานยนต์สาธารณะ</Text>
                    {/* viewด้านล่าง = รูปภาพของ ใบขับขี่วิน */}
                    <Image source={{uri: license_url}} style={{width:"auto", height:"50%" ,}} />     
                    {imageLicense == defaultLicenseWin ? (
                        <>
                            {isloadingLicense ? (
                                <View style={{height:"90%",flex:1,position:'absolute', justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                                <ActivityIndicator color={"red"} animating size={"large"} />
                                </View>
                            ) : (
                                <TouchableOpacity style={{borderWidth:1, 
                                    width:"90%",
                                    padding: 10,// แก้ขนาดปุ่ม
                                    borderRadius:10,
                                    borderColor:'grey' , backgroundColor:'#D9D9D9',
                                    alignSelf:'center', borderColor:'black',
                                    justifyContent:'center', alignItems:'center'
                                    }}
                                    onPress={()=>{
                                        if(edit == true){
                                            pickImageLicense()
                                        }
                                        else{
                                            alert("กรุณากดแก้ไขก่อน")
                                        }
                                    }}>
                                    <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <TouchableOpacity style={{borderWidth:1, 
                            width:"90%",
                            padding: 10,// แก้ขนาดปุ่ม
                            borderRadius:10,
                            borderColor:'grey' , backgroundColor:'#D9D9D9',
                            alignSelf:'center', borderColor:'black',
                            justifyContent:'center', alignItems:'center'
                            }}
                            onPress={deleteImage2}>
                            <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  เปลี่ยนรูปเดิม</Text>
                        </TouchableOpacity>
                    )}
                    
                    
                    
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', }}>
                        <TouchableOpacity
                            style={{backgroundColor:'#F65045',borderRadius:10, width:"45%", justifyContent:'center' , padding:6, alignItems:'center', marginBottom:15 ,paddingVertical:10}}
                            onPress={()=>{
                                deleteData()
                            }}
                        >
                            <Text style={{fontSize:12,color:'white' }}>ลบรายชื่อ</Text>
                        </TouchableOpacity>
                        {/* ปุ่มแก้ไข ปุ่มสีเหลือง */}
                        <TouchableOpacity
                            style={{borderRadius:10, width:"45%", marginLeft:10, flexDirection:'row', justifyContent:'center', padding:6,alignItems:'center' , marginBottom:15, 
                            backgroundColor:colorButton,paddingVertical:10}}
                            onPress={()=>{
                                updateData()
                            }}
                        >
                            <Text style={{fontSize:12, color:'white'}}>{buttonEditText}</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#C8D2D4'
    },
    detailBox: {
        backgroundColor: '#C8D2D4',
        height:300,
        width:"100%",
        position: 'absolute',
        top: -20,
        alignContent:'space-around',
    },
    licenseBox: {
        backgroundColor: '#FF9770', 
        flex: 1, 
        marginTop: 280,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        width: '93%',
        alignSelf:'center'
    },
    detail:{
        flex:1, 
        width:"95%", 
        height:'10%', 
        position:'relative', 
        alignSelf:'center', 
        flexDirection:'row'
    },
    button: {
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#C35257',
        width:"60%",
        padding: 10,//ขนาดปุ่ม
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'space-around'
    },
    // ถ้าจะเปลี่ยนอันนี้ ไปเปลี่ยนของเลขคิววินตามด้วย เพราะแยก css กัน
    input: {
        height: 35, 
        borderRadius:50, 
        padding: 5, 
        backgroundColor:'white', 
        width:"auto",
        paddingLeft:15,

    },
    text:{
        fontSize:12,
        marginBottom:10
    }

     
});


export default Windetail