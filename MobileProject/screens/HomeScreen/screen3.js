import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, SafeAreaView, ScrollView,StatusBar  } from 'react-native';


const screen3 = () => {
  const uri_image = "https://firebasestorage.googleapis.com/v0/b/projectmobile-3a802.appspot.com/o/Home%2Fscreen1.jpg?alt=media&token=08358861-8ccf-4547-9a93-8f60f29546c3" 

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content_above}>
              
          </View>
          <View style={{height:'70%', marginHorizontal:"2%", backgroundColor:'yellow', alignItems:'center', marginTop:'5%'}}>
              <Image style={{width:"100%", height:'100%'}} source={{uri : uri_image}} />
          </View>
          <View style={styles.content_below}>

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