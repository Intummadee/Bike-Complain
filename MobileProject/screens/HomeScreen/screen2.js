import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, SafeAreaView, ScrollView,StatusBar  } from 'react-native';



const screen2 = () => {
    const uri_image = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen2.1.jpg?alt=media&token=b75e2de1-7511-4c42-a9f2-32a572ad0f97" 
    const uri_image1 = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen2.2.jpg?alt=media&token=190d2998-9041-4d3f-929c-d6b6e481aea6";

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content_above}>
                    <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>คำว่า "วิน" มาจากไหน</Text>
                    <Text style={{color:'grey', fontSize:14, marginTop:5,marginLeft:'2%' }}>เขียนโดย เอิน. </Text>
                </View>
                {/* <View style={{height:'70%', marginHorizontal:"2%", backgroundColor:'yellow', alignItems:'center', marginTop:'5%'}}> */}
                    <Image style={{width:"100%", height:'15%'}} source={{uri : uri_image}} />
                {/* </View> */}
                <View style={styles.content_below}>
                    <Text>  บรรดาสื่อต่างๆ มักใช้คำว่า "วิน จยย." หรือ "วินมอเตอร์ไซค์" หลายคนอาจจะสงสัย คำว่า "วิน" นั้น มาจากไหน? ทำไมถึงใช้คำนี้? "วิน" เป็นคำที่ใช้กันโดยทั่วไปและที่ปรากฏในสื่อมวลชนก็มีต่างๆ กันไป เช่น "วินมอเตอร์ไซค์" "วินรถจักรยานยนต์รับจ้าง" "วินรถตู้โดยสาร" "ผู้ขี่รถวิน" "เจ้าแม่วิน" "ผู้คุมวิน" "เจ้าของวิน" "เสื้อวิน" ฯลฯ</Text>
                    <Text>  </Text>
                    <Text>  เป็นที่เข้าใจกันว่า วิน หมายถึง "สถานที่ซึ่งผู้ขี่รถจักรยานยนต์รับจ้างหรือรถตู้โดยสารนำรถมาจอดคอยรับผู้โดยสาร" การจอดนั้นก็ต้องจอดกันอย่างมีระเบียบ กล่าวคือ ใครมาถึงก่อนก็ได้จอดอยู่ในลำดับต้น ใครมาทีหลังก็ได้จอดต่อๆ กันไป ผู้ใช้บริการที่รู้ธรรมเนียมก็จะไปใช้บริการที่คันแรกสุดก่อน</Text>
                    <Text>  </Text>
                    <Image style={{width:"100%", height:'20%'}} source={{uri : uri_image1}} />
                    <Text>  </Text>
                    <Text>  รถที่เข้ามาร่วมในกระบวนการนี้จึงเรียกว่า "รถวิน"</Text>
                    <Text>  </Text>
                    <Text>  ผู้ขับขี่รถดังกล่าวจึงเรียกว่า "ผู้ขี่รถวิน" หรือ "ผู้ขับรถวิน"</Text>
                    <Text>  </Text>
                    <Text>  สถานที่จอดรถก็เรียกว่า "วิน" ซึ่งอาจจะเป็นที่สาธารณะ หรือที่ส่วนบุคคลก็ได้</Text>
                    <Text>  </Text>
                    <Text>  ผู้ดูแลหรือผู้เก็บค่าธรรมเนียมก็เรียกว่า "เจ้าของวิน" "ผู้คุมวิน" "เจ้าพ่อวิน" "เจ้าแม่วิน" ฯลฯ</Text>
                    <Text>  </Text>
                    <Text>  คํานี้มาจากภาษาอังกฤษว่า "Win" แปลว่า "ชัยชนะ" ซึ่งได้มาจากการแข่งขัน โดยเฉพาะอย่างยิ่งในด้านกีฬา ที่คนไทยรู้จักกันดีก็คือการแข่งม้า ตัวที่ชนะที่หนึ่งก็เรียกว่า "เข้าวิน" ตัวที่ชนะเป็นที่สองถ้าคิดแบบอเมริกันก็เรียกว่า "เข้าเพรซ" (Place) ถ้าคิดแบบอังกฤษตัวที่ชนะเป็นที่สองหรือสามก็เรียกว่า "เข้าเพรซ" ได้เหมือนกัน</Text>
                    <Text>  </Text>
                    <Text>  ในภาษาไทย ความหมายของคำว่า วิน ได้เปลี่ยนแปลงไป กลายเป็น "สถานที่จอดรถ" ลักษณะการนำรถเข้ามาจอดแบบมาถึงก่อนได้ก่อนก็เป็นการแข่งขันกันกลายๆ เมื่อนำรถมาจอดที่ "วิน" ได้ก็เรียกว่า "เข้าวิน" ทุกคน ไม่มีใคร "เข้าเพรซ"</Text>
                    <Text>  </Text>
                    <Text>  คำนี้เมื่อจะแปลกลับเป็นภาษาอังกฤษ หนังสือพิมพ์ภาษาอังกฤษบ้านเราใช้ว่า "Queue" ซึ่งแปลกลับมาเป็นไทย (เชื้อสายฝรั่ง) ได้ว่า "คิว" นั่นเอง บางครั้งจึงมีคนใช้คำว่า "คิวรถ" แทน "วินรถ" ใครขืนแปลคำว่า "วิน" กลับไปเป็น "Win" ฝรั่งคงงง</Text>
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




export default screen2