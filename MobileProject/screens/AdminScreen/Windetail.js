import React, { useEffect,useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Button, Text, Image,
    TextInput
} from 'react-native';

// import icon
import { AntDesign } from '@expo/vector-icons'; 


const Windetail = ({ navigation, route }) => {
    const data = route.params.routeData; // {license: 'MM00 กรุงเทพมหานคร', no: '02', win_url: 'https://firebasestorage.', license_url: 'url', place: 'วินคลอง 4 เขตลาดกระบัง', name: "Blue Firebase"}

    const licenseWin = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Service_Points%2Fimage.png?alt=media&token=89225b40-7817-421e-8f77-d2c439935aea";

    const [name, setName] = useState(data.name);
    const [regisNumber, setRegisNumber] = useState(data.license);
    const [queueNumber, setQueueNumber] = useState(data.no);

    return (
        <View style={styles.list}>
            <View style={styles.detailBox}>
                <View style={styles.detail}> 
                    {/* กล่องชื่อของวิน */}
                    <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'row', }}>
                        <View style={{flex:1, width:"100%", height:"100%", justifyContent:'center', alignItems:'center',alignSelf:'center'}}>
                            <Image source={{uri: data.win_url}} style={{width:"90%", height:"50%"}} /> 
                            <TouchableOpacity style={{borderWidth:1, 
                              width:"90%",
                              padding: 10,// แก้ขนาดปุ่ม
                              borderRadius:10,
                              marginTop:10,
                              borderColor:'grey' , backgroundColor:'#D9D9D9',
                              borderColor:'black',
                            }}>
                                <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                              </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:5, width:"60%" }}>
                            <Text style={styles.text}>ชื่อ:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                value={name}
                            />
                            {/* <Text>{data.name}</Text> */}
                            <Text> </Text>

                            <Text style={styles.text}>เลขทะเบียนรถจักรยานยนต์:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setRegisNumber}
                                value={regisNumber}
                            />
                            {/* <Text>{data.license}</Text> */}
                            
                            <Text> </Text>
                            
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' }} numColumns={2}>
                                <Text style={{flexDirection:'row', width:'30%', fontSize:12, }}>เลขคิววิน: </Text>
                                <TextInput
                                        style={{width:"70%",height:35,backgroundColor:'white', borderRadius:50, paddingLeft:15, }}
                                        onChangeText={setQueueNumber}
                                        value={queueNumber}
                                />
                            </View>
                            
                        </View>
                    </View >
                </View>
            </View>

            <View style={styles.licenseBox}>
                <View style={{justifyContent:'space-evenly', alignSelf:'center', flex:1, }}>
                    <Text style={{fontWeight:'bold'}}>ใบอนุญาตขับรถจักรยานยนต์สาธารณะ</Text>
                    <Image source={{uri: licenseWin}} 
                    style={{width:"auto", height:"50%"}} /> 
                    <TouchableOpacity style={{borderWidth:1, 
                        width:"90%",
                        padding: 10,// แก้ขนาดปุ่ม
                        borderRadius:10,
                        borderColor:'grey' , backgroundColor:'#D9D9D9',
                        alignSelf:'center', borderColor:'black',
                        }}>
                        <Text style={{fontSize:12}}><AntDesign name="plus" size={10} color="black" />  อัพโหลดไฟล์</Text>
                    </TouchableOpacity>
                    
                    
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', }}>
                        <TouchableOpacity
                            style={{backgroundColor:'#F65045',borderRadius:10, width:"45%", justifyContent:'center' , padding:6, alignItems:'center', marginBottom:15 ,paddingVertical:10}}
                        >
                            <Text style={{fontSize:12,color:'white' }}>ลบรายชื่อ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{borderRadius:10, width:"45%", marginLeft:10, flexDirection:'row', justifyContent:'center', padding:6,alignItems:'center' , marginBottom:15, backgroundColor:'#05A56B',paddingVertical:10}}
                        >
                            <Text style={{fontSize:12, color:'white'}}>ยันยันการเปลี่ยนแปลง</Text>
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