import React, { useState,useEffect } from 'react';
import {View,Button,Text,FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AdminRequest = ({navigation,route}) => {

    useEffect(() => {

        loadRequest();
    
    }, []);

    const [DATA,SetDATA] = useState();

    const loadRequest = () => {

        firestore()
        .collection('request')
        .get()
        .then(querySnapshot => {

            const data = [];

            querySnapshot.forEach(documnetSnapshot =>{
                data.push(documnetSnapshot.data());
            });

            SetDATA(data);
        });
    
    }

    const handleTest = () => {
        console.log(DATA);
    }

    const renderItem = ({item}) => {

        return (
            <View
                style={{
                    borderColor:'#f4511e',
                    borderWidth:2,
                    margin:10,
                }}
            >
                <View
                    style={{
                        margin:10,
                    }}
                >
                <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                >
                    Artist: {item.artist}
                </Text>
                <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                >
                    Title: {item.title}
                </Text>
                <Text
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                >
                    Type: {item.type}
                </Text>
                </View>
            </View>
        )

    }

    return (
        <View
            style={{
                backgroundColor:'black',
                flex:1,
            }}
        >
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item=>item.id}
            />
        </View>
    )
}

export default AdminRequest;