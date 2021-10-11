import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Provider as PaperProvider,TextInput,DarkTheme,DefaultTheme,configureFonts } from 'react-native-paper';

const Mytextinput = (props) => {

    const fontConfig = {
        default: {
          regular: {
            fontWeight: 'normal',
            fontSize: 10, // <-- Try using this but not work
          },
        },
    };

    const theme = {
        ...DarkTheme,
        roundness: 5,
        colors: {
            ...DarkTheme.colors,
            text: "white",
            placeholder: "white",
            background: 'transparent',
        },
        fonts: configureFonts(fontConfig),
    }

    return (
        <View style={styles.container}>
            <TextInput
                label={props.label}
                value={props.value}
                onChangeText={props.onChangeText}
                outlineColor="#f4511e"
                placeholder={props.placeholder}
                theme={theme}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
            />
        </View>
    );
};

export default Mytextinput;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        marginBottom:0,
        marginTop:0,
        backgroundColor:'black',
    },
    input:{
        height:60,
        backgroundColor:"black",
        color:"#f4511e",
        borderColor:"#f4511e",
    },
});

/*margin:12,
        borderWidth:2,
        padding:10,
        borderTopColor:"#f4511e",
        borderRightColor:"#f4511e",
        borderBottomColor:"#f4511e",
        borderLeftColor:"#f4511e",*/