import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Profile = ({ navigation, route }) => {

    const [user_name,SetUser_name] = useState();
    const [fav_col,SetFav_col] = useState(route.params.user_info.fav_col);
    const email = route.params.user_info.email;
    const [password,SetPassword] = useState();
    const [avatar,SetAvatar] = useState();
    const [recently_played, SetRecently_played] = useState();
    const [recently_played_obj, SetRecently_played_obj] = useState();
    const [history,SetHistory] = useState();
    const [mostly_played,SetMostly_played] = useState();
    const [mostly_played_obj,SetMostly_played_obj] = useState();

    useEffect(() => {
        loadUser_info();
        loadRecentMost();
    }, [])

    const loadUser_info = () => {

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .get()
        .then(documentSnapshot=> {
            SetUser_name(documentSnapshot.data().user_name);
            SetPassword(documentSnapshot.data().password);
            SetAvatar(documentSnapshot.data().avatar);
        });

    }

    const loadRecentMost = () => {

        firestore()
            .collection('users')
            .doc(route.params.user_info.email)
            .get()
            .then(documentSnapshot => {

                //console.log('inside useeffect '+documentSnapshot.data().recently_played.title);
                SetRecently_played(documentSnapshot.data().recently_played.title);
                SetRecently_played_obj(documentSnapshot.data().recently_played);

                detMostlyPlayed(documentSnapshot.data().history);

            });

    }

    const detMostlyPlayed = (arrObj) => {

        let vmap = new Map();

        arrObj.forEach(element => {
        
            if(vmap.get(element.id)==undefined){
                vmap.set(element.id,1);
            } else {
                let vc = vmap.get(element.id);
                vc++;
                vmap.set(element.id,vc);
            }

        });

        let mx = 0;
        let mxObj = new Object();

        arrObj.forEach(element =>{

            if(vmap.get(element.id)>mx){
                mx = vmap.get(element.id);
                mxObj = element;
            }

        });

        SetMostly_played(mxObj.title);
        SetMostly_played_obj(mxObj);

    } 

    let cnt = 1;
    
    const [pass,SetPass] = useState();

    const handlePassTxt = () => {

        if (cnt % 2 == 0) SetPass(password);
        else SetPass('');

        cnt++;
    }

    const handleTest = () => {

        let varr = [
            {
                title:'atiq',
                age:21,
            },
            {
                title:'shafin',
                age:22,
            }
        ]

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .update({
            history:varr,
        })
        .then(()=>{
            console.log('History udated');
        });

    }

    const handlePressOnRecent = () => {

        let obj = recently_played_obj;

        if (obj.type == 'music') {
            navigation.navigate('MusicPlayerScreen1', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })

        } else if (obj.type == 'video') {
            navigation.navigate('VideoPlayerScreen', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })
        } else if (obj.type == 'pdf') {
            navigation.navigate('PdfPlayerScreen', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })
        }

    }

    const handlePressOnMost = () => {

        let obj = mostly_played_obj;

        if (obj.type == 'music') {
            navigation.navigate('MusicPlayerScreen1', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })

        } else if (obj.type == 'video') {
            navigation.navigate('VideoPlayerScreen', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })
        } else if (obj.type == 'pdf') {
            navigation.navigate('PdfPlayerScreen', {
                artist: obj.artist,
                duration: obj.duration,
                id: obj.id,
                title: obj.title,
                type: obj.type,
                url: obj.url,
            })
        }

    }

    const handleUpdate = () => {
        navigation.navigate('UpdateScreen',{
            user_info:route.params.user_info,
        })
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'black',
            }}
        >
            {false?<Button
                title='testinprofile'
                onPress={() => handleTest()}
            />:null}
            <View
                style={{
                    flexDirection: 'row',
                    margin: 10,
                    borderRadius: 25,
                    borderColor:'#f4511e',
                    borderWidth:2,
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleUpdate()}
                >
                    <Avatar.Image
                        size={50}
                        source={{
                            uri: avatar
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                        }}
                    >Welcome to your profile {user_name}.</Text>
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                }}
            >
                <Avatar.Image
                    size={200}
                    source={{
                        uri: avatar
                    }}
                />
            </View>
            <ScrollView>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#f4511e",
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: 2.5,
                        marginRight: 2.5,
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                        }}
                    >User Name : {user_name}</Text>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#f4511e",
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: 2.5,
                        marginRight: 2.5,
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                        }}
                    >User Email : {email}</Text>
                </View>
                {false?<View
                    style={{
                        borderWidth: 1,
                        borderColor: "#f4511e",
                        padding: 10,
                        marginBottom: 10,
                        marginLeft: 2.5,
                        marginRight: 2.5,
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                        }}
                    >Favourite Color : </Text>
                    <View style={{ backgroundColor: fav_col, width: 50, height: 25 }}></View>
                </View>:null}
                <TouchableOpacity
                    onPress={()=>handlePressOnMost()}
                >
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#f4511e",
                            padding: 10,
                            marginBottom: 10,
                            marginLeft: 2.5,
                            marginRight: 2.5,
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                            }}
                        >Click for Most Played : {mostly_played}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePressOnRecent()}
                >
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#f4511e",
                            padding: 10,
                            marginBottom: 10,
                            marginLeft: 2.5,
                            marginRight: 2.5,
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                            }}
                        >Click for Recently Played : {recently_played}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePassTxt}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#f4511e",
                            padding: 10,
                            marginBottom: 10,
                            marginLeft: 2.5,
                            marginRight: 2.5,
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                            }}
                        >Click to See Password : {pass}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Profile;