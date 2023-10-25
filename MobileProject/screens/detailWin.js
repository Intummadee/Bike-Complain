import React from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Button, Text, Image } from 'react-native';

// import icon
import { AntDesign } from '@expo/vector-icons'; 


const detailWin = ({ navigation, route }) => {

    const data = route.params.routeData;
    // {name: 'Pink Firebase', license_url: 'url', win_url: 'https://firebasestorage', no: '18', license: 'MM00 กรุงเทพมหานคร',place: "วินคลอง 4 เขตลาดกระบัง"}
    const service_point = route.params.point; // ซอยเกกี1

    return (
        <View style={styles.list}>
            <View style={styles.detailBox}>
                <View style={styles.detail}> 
                    {/* กล่องชื่อของวิน */}
                    <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'row', }}>
                        <Image source={{uri : data.win_url}} style={{width:"50%", height:"60%"}} /> 
                        <View style={{marginLeft:'10%', }}>
                            <Text>ชื่อ:</Text>
                            <Text>{data.name}</Text>
                            <Text> </Text>
                            {/* <br /> */}
                            <Text>เลขทะเบียนรถจักรยานยนต์:</Text>
                            <Text>MM00 กรุงเทพมหานคร</Text>
                            <Text> </Text>
                            {/* <br /> */}
                            <Text>เลขคิววิน: {data.no}</Text>
                        </View>
                    </View >
                </View>
            </View>

            <View style={styles.licenseBox}>
                <View style={{justifyContent:'space-evenly', alignSelf:'center', flex:1}}>
                    <Text style={{fontWeight:'bold'}}>ใบอนุญาตขับรถจักรยานยนต์สาธารณะ</Text>
                    <Image source={{uri:data.license_url}} style={{width:"auto", height:"50%"}} /> 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            console.log("ร้องเรียน");
                            navigation.navigate("form", {routeData: data, service_point:service_point})
                        }}>
                            <View style={{flex:1, flexDirection:'row', width:'auto', justifyContent:'center', alignSelf:'center' }}>
                                <AntDesign name="notification" size={18} color="white" />
                                <Text style={{color:'white', paddingLeft:'10%'}}>ร้องเรียน</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#EEEBEB'
    },
    detailBox: {
        backgroundColor: '#EEEBEB',
        height:300,
        width:"100%",
        position: 'absolute',
        top: -20,
        alignContent:'space-around',
    },
    licenseBox: {
        backgroundColor: '#FF724C', 
        flex: 1, 
        marginTop: 280,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        width: '93%',
        alignSelf:'center'
    },
    detail:{
        flex:1, 
        // backgroundColor:'cyan', 
        width:"80%", 
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

     
});


export default detailWin