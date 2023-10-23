import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, SafeAreaView, ScrollView,StatusBar  } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { putTEST } from "../../store/actions/myAction";

import { storage } from '../../database/testDatabase';
import { getDownloadURL ,uploadBytes, ref, deleteObject } from 'firebase/storage';


const screen1 = ({navigation, route}) => {
    const data = route.params.item;

    const uri_image = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen1.jpg?alt=media&token=08358861-8ccf-4547-9a93-8f60f29546c3" 
    
 
   

     
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
              <View style={styles.content_above}>
                <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>ผู้บริโภคแจ้งยังพบวินมอไซค์เก็บค่าโดยสารเกินราคาจริงและขับรถหวาดเสียว</Text>
                <Text style={{color:'grey', fontSize:14, marginTop:5,marginLeft:'2%' }}>เขียนโดย เฟรม. </Text>
              </View>
              <View style={{height:'70%', marginHorizontal:"2%", backgroundColor:'yellow', alignItems:'center', marginTop:'5%'}}>
                <Image style={{width:"100%", height:'100%'}} source={{uri : uri_image}} />
              </View>
              <View style={styles.content_below}>
                <Text>  ปัญหาการใช้บริการรถโดยสารสาธารณะนับเป็นปัญหาที่เกิดขึ้นทุกวันกับผู้บริโภคที่ต้องใช้บริการ แต่ก็มีบางส่วนยอมที่ทนความยากลำบากเพื่อให้ถึงจุดหมายปลายทางที่รวดเร็วและตรงเวลาทำงาน ซึ่งก็ส่งผลกระทบการสภาพจิตใจในการทำงาน เช่น มีความหงุดหงิด มีความตื่นกลัว หรือ หดหู่กับสิ่งที่พบเจอ</Text>
                <Text>  </Text>
                <Text>  ศูนย์ข้อมูล มูลนิธิเพื่อผู้บริโภคและเครือข่ายผู้บริโภค 7 ภาค เปิดเผยข้อมูลร้องเรียนจากผู้บริโภคกรณีการใช้บริการรถโดยสารสาธารณะ โดยข้อมูลตั้งแต่ 2560 จนถึงเดือนกรกฎาคม 2561 มีผู้บริโภคร้องเรียนด้านรถโดยสารสาธารณะ ทั้งหมด 729 ราย</Text>
                <Text>  </Text>
                <Text>  ทั้งนี้ปัญหาพฤติกรรมรถจักรยานยนต์รับจ้าง ถูกร้องเรียนดังนี้ 1. ถูกเรียกเก็บค่าโดยสารเกินอัตรา / เก็บแพงกว่าป้ายที่ระบุ 2. ขับรถเร็ว หวาดเสียว เกิดอุบัติเหตุ 3. ใช้วาจาไม่สุภาพกับผู้โดยสาร ซึ่งปัญหาผู้บริโภคด้านการใช้บริการรถจักรยานยนต์รับจ้างเริ่มเพิ่มมากขึ้นทุกปี เกิดจากผู้บริโภคไม่รู้สิทธิตนเอง หรือไม่สนใจสิทธิของตนเอง รวมถึงการไม่มีเวลาที่จะจัดการเรื่องร้องเรียน จึงทำให้ปัญหาถูกละเมิดสิทธิมีเพิ่มมากขึ้น</Text>
                <Text>  </Text>
                <Text>  ศูนย์รับเรื่องร้องเรียนได้ใช้กระบวนจัดการเรื่องร้องเรียนโดยการประสานไปยังสำนักงานเขต และกรมการขนส่งเพื่อให้ตรวจสอบ ยังพบปัญหาผู้บริโภคที่ร้องเรียนไม่ได้จดจำเลขทะเบียน หรือเบอร์เสื้อวินรถจักรยานยนต์รับจ้าง การแก้ไขปัญหาจึงมีความล่าช้า</Text>
                <Text>  </Text>
                <Text>  ดังนั้นหากผู้บริโภคพบว่ามีจักรยานยนต์รับจ้างที่ไม่ปฏิบัติตามกฎระเบียบ สามารถแจ้งเรื่องร้องเรียนได้ โดยให้ผู้บริโภคดำเนินการดังนี้</Text>
                <Text>  </Text>
                <Text>  1. จดจำวันเวลาที่เกิดเหตุ</Text>
                <Text>  2. จำชื่อ-สกุลที่ติดตรงเสื้อวิน หรือจำเลขเสื้อวิน</Text>
                <Text>  3. จดทะเบียนรถจักรยานยนต์</Text>
                <Text>  4. จดสถานที่เกิดเหตุ</Text>
                <Text>  5. ร้องเรียนได้ที่ กรมการขนส่งทางบก สายด่วน 1584 , มูลนิธิเพื่อผู้บริโภค 02-2483737</Text>
                <Text>  </Text>
                <Text>  </Text>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      paddingTop: StatusBar.currentHeight,
    },
    content_above:{
      height:'auto',
      backgroundColor:'#EEEBEB',
      marginTop:"5%"
    },
    content_below : {
      height:'auto',
      width:'100%',
      marginTop:'5%',
      backgroundColor:'#EEEBEB', 
      paddingHorizontal:'4%'
    },
    scrollView: {
      backgroundColor: '#EEEBEB',
    },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      placeholderTextColor: 'gray',
      borderBottomWidth: 1,
      
    },
    title: {
        flex:0.1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Cochin', //ค่อยเปลี่ยน
    },
  
  });


export default screen1;