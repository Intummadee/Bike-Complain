import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

const GridTile = (props) => {
    // console.log("ข้อมูล card ", props.dataItem); 
    // {win_url: 'https://' no: '18', license_url: 'url', license: 'MM00 กรุงเทพมหานคร', name: 'Pink Firebase',zone: "วินคลอง 4 เขตลาดกระบัง"}

    const service_point = props.service_point // ซอยเกกี1

    return (
        <TouchableOpacity style={styles.gridItem} onPress={() => {props.onSelect();}}  >
            <View style={styles.container}>
                <Image source={{uri: props.dataItem.win_url}}
                style={styles.pic} />

                <Text style={styles.number}>
                    {props.dataItem.no}
                </Text>
                <Text style={styles.title} numberOfLines={2}>
                    {props.dataItem.name}
                </Text>
                <Text style={{color:'grey', fontSize:10}}>
                    {props.dataItem.zone}
                </Text>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    marginTop: 30,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
    borderColor: '#FF724C',
    borderWidth: 1.5,
  },
  // ชื่อวิน
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
  },
  // หมายเลขวิน
  number: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FF724C'
  },
  pic: {
    width: 55, 
    height: 55, 
    position:'absolute' , 
    left: '6%' , 
    top: '-20%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF724C',
  },
});

export default GridTile;
