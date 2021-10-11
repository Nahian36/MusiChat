import React from 'react';
import { View,Text,StyleSheet,Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PdfPlayerScreen = ({navigation,route}) => {

    const source = {uri:route.params.url};

    const handleChat = () => {
        navigation.navigate('Chat',{
            id:route.params.id,
            user_info:route.params.user_info,
        })
    }

    return (
        <View
            style={{
                flex:1,
                backgroundColor:'black',
            }}
        >
            <TouchableOpacity
                onPress={() => handleChat()}
                style={{
                    alignItems:'center',
                    marginTop:15,
                }}
            >
                <View
                    style={{
                        borderColor: '#f4511e',
                        borderWidth:2,
                        borderRadius: 50,
                        alignItems: 'center',
                        margin: 10,
                        padding: 10,
                        flexDirection:'row',
                    }}
                >
                    <AntDesign
                        name='wechat'
                        size={50}
                        color='#f4511e'
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginLeft:15,
                            marginRight:10,
                        }}
                    >Chat</Text>
                </View>
            </TouchableOpacity> 
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}
                />
            </View>
        </View>
    );
};

export default PdfPlayerScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
    },
    pdf: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});