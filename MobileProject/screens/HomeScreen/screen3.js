import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, SafeAreaView, ScrollView,StatusBar  } from 'react-native';


const screen3 = ({route}) => {
  const uri_image = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen3.1.webp?alt=media&token=f35ef046-d89e-47b3-8c3f-3da2b224e5a6" 
  const uri_image1 = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen3.2.webp?alt=media&token=4f86832e-dfcd-4eb8-88d9-26061941d308";
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content_above}>
            <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>แนะเลือกใช้วินมอเตอร์ไซค์ถูกกฎหมาย</Text>
            <Text style={{color:'grey', fontSize:14, marginTop:5,marginLeft:'2%' }}>เขียนโดย อุ้ม. </Text>
          </View>
          {/* <View style={{height:'70%', marginHorizontal:"2%", backgroundColor:'yellow', alignItems:'center', marginTop:'5%'}}> */}
              <Image style={{width:"100%", height:'40%'}} source={{uri : uri_image}} />
          {/* </View> */}
          <View style={styles.content_below}>
            
            <Text>  1.ต้องเป็นรถจักรยานยนต์ที่สามารถนำมารับส่งผู้โดยสารได้ต้องจดทะเบียนเป็นรถจักรยานยนต์สาธารณะ (ป้ายเหลือง)</Text>
            <Text>  2.ต้องมีที่ตั้งวินตามที่ได้รับอนุญาต</Text>
            <Text>  3.ต้องให้บริการในเส้นทางหรือพื้นที่ที่ได้รับอนุญาตเท่านั้น</Text>
            <Text>  </Text>
            <Text style={{fontWeight:'bold', fontSize:25, }}>  ด้านผู้ขับขี่</Text>
            <Text>  </Text>
            <Image style={{width:"100%", height:'100%'}} source={{uri : uri_image1}} />
            <Text>  </Text>
            <Text>  1.ต้องมีใบอนุญาตขับรถจักรยานยนต์สาธารณะ (ไม่สิ้นอายุ)</Text>
            <Text>  2.ต้องแต่งกายตามระเบียบที่ทางราชการกำหนด สวมเสื้อวินที่แสดงบัตรประจำตัวและหมายเลขประจำตัวที่ถูกต้องตรงกัน</Text>
            <Text>  3.ผ่านการตรวจสอบประวัติอาชญากรรมและบันทึกข้อมูลประวัติผู้ขับรถสาธารณะและวัตถุอันตราย</Text>
            <Text>  </Text>
            <Text>  การเรียกเก็บอัตราค่าโดยสารต้องเป็นไปตามที่ทางราชการกำหนด ต้องติดตั้งป้ายแสดงอัตราค่าโดยสารให้ประชาชนรับทราบอย่างชัดเจนในบริเวณที่ตั้งวินด้วย</Text>
            <Text>  </Text>
            <Text>  หากพบการฝ่าฝืนนำรถจักรยานยนต์ส่วนบุคคลมาให้บริการ จะมีความผิดฐานนำรถจักรยานยนต์ส่วนบุคคลมาใช้รับ-ส่งผู้โดยสาร ปรับไม่เกิน 2,000 บาท, กรณีแต่งกายไม่ถูกต้องตามประกาศกรมการขนส่งทางบก ปรับไม่เกิน 1,000 บาท , การไม่แสดงใบอนุญาตขับรถสาธารณะปรับไม่เกิน 1,000 บาท, และหากนำรถจักรยานยนต์สาธารณะของตนไปรับจ้างในสถานที่ตั้งวินอื่นจะถูกพิจารณาถอนชื่อออกจากบัญชีรายชื่อในสถานที่ตั้งวินที่ผู้นั้นขับรถอยู่ทั้งนี้ หากพบปัญหาจากการใช้บริการสามารถร้องเรียนได้ที่ ศูนย์คุ้มครองผู้โดยสารและรับเรื่องร้องเรียน สายด่วน 1584 ตลอด 24 ชั่วโมง, แอปพลิเคชัน DLT GPS, Line ID “@1584dlt”, facebook “1584 ร้องเรียนรถโดยสารสาธารณะ”</Text>
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
    

});

export default screen3