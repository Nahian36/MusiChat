import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';

const Mybutton = (props) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={styles.button}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Mybutton;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        marginBottom:20,
    },
    button:{
        borderRadius:20,
        backgroundColor:"#f4511e",
        height:50,
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        color:"white",
        fontSize:30,
        fontWeight:"bold",
    }
});