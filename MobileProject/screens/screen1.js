import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button } from 'react-native';
 

const screen1 = ({navigation, route}) => {
    const data = route.params.item;
    console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={{width:"95%", height:"70%"}} source={data.image} />
            </View>
        </View>
    )
   
}
const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#FF724C',
    },
    content:{
      flex: 0.55,
      justifyContent:'center',
      alignItems:'center',
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