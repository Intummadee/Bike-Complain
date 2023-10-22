import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { putTEST } from "../store/actions/myAction";

const screen1 = ({navigation, route}) => {
    const data = route.params.item;
     

    const dispatch = useDispatch();
    dispatch( putTEST( 2 ) );
     
  
    
    console.log("finish", useSelector((state) => state.myReducer.finish)  );
    console.log("unfinish", useSelector((state) => state.myReducer.unfinish)  );
    console.log("name", useSelector((state) => state.myReducer.name)  );
    console.log("doc_name", useSelector((state) => state.myReducer.doc_name)  );
    console.log("user", useSelector((state) => state.myReducer.myUser)  );
    
    console.log("test : ", useSelector((state) => state.myReducer.test)  );
    console.log("user_data", useSelector((state) => state.myReducer.user_data)  );

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