import React from 'react';
import {View,SafeAreaView,FlatList,StyleSheet,Text} from 'react-native';
import {Avatar} from 'react-native-paper';

const MessageList=({items,user})=>{

    const avatar0 = 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/00-featured-dark-smiling-blindfolded-satoru-anime-character.jpg?alt=media&token=817ba333-1fc6-4dc9-9d3b-beeacaee69c4';
    const avatar1 = 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/26bdad3d88dd702a548f1cfe46513574.jpg?alt=media&token=edd7f525-0922-417e-be72-562584e5ce2d';
    
    const renderItem=({item})=>{

        if(item.user!=user){
            return(
                <View>
                    <Text
                        style={{
                            color:'white',
                            marginLeft:50,
                        }}
                    >{item.user} said,</Text>
                    <View style={styles.messageRow1}>
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: avatar0
                            }}
                        />
                        <View style={styles.messageBubble1}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'flex-end',
                        }}
                    >
                        <Text
                            style={{
                                color:'white',
                            }}
                        >You said,</Text>
                    </View>
                    <View style={styles.messageRow}>
                        <View style={styles.messageBubble}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item=>item.time.toString()}
            inverted
            />
        </SafeAreaView>
    );
}

export default MessageList;

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
    },
    messageRow1:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:4,
    },
    messageRow:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:4,
    },
    messageBubble1:{
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor:'red',
        borderRadius:20,
    },
    messageBubble:{
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor:'rgb(16,135,255)',
        borderRadius:20,
    },
    text:{
        fontSize:20,
        color:'white',
    },
    text1:{
        fontSize:20,
        backgroundColor:'yellow',
        color:'black',
    },
});