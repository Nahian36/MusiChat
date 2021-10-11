import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Button,TextInput,LogBox,FlatList} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-paper';

const Chat=({navigation,route})=>{

    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

    useEffect(() => {
        const subscriber = firestore()
          .collection(route.params.id.toString())
          .orderBy('time','desc')
          .limit(1)
          .onSnapshot(querySnapshot => {

            querySnapshot.forEach(documentSnapshot=>{
                //console.log("doc_id : ",documentSnapshot.id);
                //console.log(" sort : ",documentSnapshot.data().time);
                //console.log(" message : ",documentSnapshot.data().text);
                //console.log(messages.find(({time}) => time === documentSnapshot.data().time));

                let flag = messages.find(({time}) => time === documentSnapshot.data().time);
                
                if(flag==undefined){
                    setMessages(prev=>[documentSnapshot.data(),...prev]);
                }
            });

          });
    
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [messages]);

    const handleSend=()=>{
        if(!message){
            return ;
        }

        firestore()
        .collection(route.params.id.toString())
        .add({
            message:message,
            time:firebase.firestore.Timestamp.now().seconds,
            user_name:route.params.user_info.user_name,
            avatar:route.params.user_info.avatar,
        })
        .then(()=>{
            console.log('message added..');
        });

        setMessage('');
    }

    const handleTest=()=>{  

        console.log(firebase.firestore.Timestamp.now());
        console.log(route.params);
    }
    
    const renderItem = ({item}) => {

        if(item.user_name!=route.params.user_info.user_name){
            return(
                <View>
                    <Text
                        style={{
                            color:'white',
                            marginLeft:50,
                        }}
                    >{item.user_name} said,</Text>
                    <View 
                        style={{
                            flexDirection:'row',
                            justifyContent:'flex-start',
                            marginBottom:4,
                        }}
                    >
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: item.avatar
                            }}
                        />
                        <View 
                            style={{
                                borderColor:'#f4511e',
                                borderRadius:50,
                                borderWidth:2,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <Text 
                                style={{
                                    fontSize:20,
                                    color:'white',
                                    margin:10,
                                }}
                            >{item.message}</Text>
                        </View>
                    </View>
                </View>
            )
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
                    <View 
                        style={{
                            flexDirection:'row',
                            justifyContent:'flex-end',
                            marginBottom:4,
                        }}
                    >
                        <View 
                            style={{
                                paddingVertical:5,
                                paddingHorizontal:10,
                                backgroundColor:'#0084ff',
                                borderRadius:20,
                            }}
                        >
                            <Text 
                                style={{
                                    fontSize:20,
                                    color:'white',
                                }}
                            >{item.message}</Text>
                        </View>
                    </View>
                </View> 
            )
        }

    }

    return (
        <View 
            style={{
                flex:1,
                alignItems:'stretch',
                justifyContent:'space-between',
                padding:0,
                backgroundColor:'black',
            }}
        >
        <View
            style={{
                alignItems:'center',
                margin:10,
            }}
        >
            <Text
                style={{
                    color:'grey',
                    fontSize:20,
                }}
            >--You are in Room no {route.params.id}--</Text>
        </View>
        <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item=>item.time.toString()}
            inverted
        />
        <TextInput 
            style={{
                borderColor:'#f4511e',
                borderWidth:2,
                color:'white',
                fontSize:20,
            }}
            placeholder={'Write your message...'}
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={handleSend}
            placeholderTextColor='white'
        />
        </View> 
    )

}

export default Chat;