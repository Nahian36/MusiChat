import React,{useState} from 'react';
import {View,Text,TextInput,
TouchableOpacity,ScrollView} from 'react-native';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

const UpdateScreen = ({navigation,route}) => {

    const [username,SetUsername] = useState();
    const [password,SetPassword] = useState();
    const [uavatar,SetUavatar] = useState();

    const avatar = new Array();

    avatar[0] = 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/26bdad3d88dd702a548f1cfe46513574.jpg?alt=media&token=edd7f525-0922-417e-be72-562584e5ce2d';
    avatar[1] = 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/210479227_302194538328606_5657531639808165251_n.jpg?alt=media&token=d9ea3501-9d52-4f62-be10-8854a6324fbe';
    avatar[2] = 'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/00-featured-dark-smiling-blindfolded-satoru-anime-character.jpg?alt=media&token=817ba333-1fc6-4dc9-9d3b-beeacaee69c4';

    const handleUserNameUp = () => {

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .update({
            user_name:username,
        }).then(()=>{
            alert('User Name Updated!!!');
        });

    }

    const handlePasswordUp = () => {

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .update({
            password:password,
        }).then(()=>{
            alert('Password Updated!!!');
        });

    }

    const handleSetAvatar = (index) => {

        SetUavatar(avatar[index]);

    }

    const handleAvatarUp = () => {

        firestore()
        .collection('users')
        .doc(route.params.user_info.email)
        .update({
            avatar:uavatar,
        }).then(()=>{
            alert('Avatar Updated!!!');
        });

    }

    return (
        <View
            style={{
                backgroundColor:'black',
                flex:1,
            }}
        >
        <ScrollView
            style={{
                marginTop:20,
            }}
        >
            <View
                style={{
                    alignItems:'center',
                    borderWidth:2,
                    borderColor:'#f4511e',
                    borderRadius:120,
                    marginLeft:120,
                    marginRight:120,
                    marginBottom:10,
                }}
            >
                <AntDesign
                    name='retweet'
                    size={120}
                    color='#f4511e'
                />
            </View>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    margin:10,
                    borderWidth:2,
                    borderColor:'#f4511e',
                }}
            >
            <TextInput
                style={{
                    color:'white',
                    fontSize:20,
                }}
                placeholder={'Update Your User Name...'}
                onChangeText={SetUsername}
                value={username}
                placeholderTextColor='white'
            />
            <View
                style={{
                    borderColor:'#f4511e',
                    borderWidth:2,
                    borderLeftWidth:4,
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleUserNameUp()}
                >
                    <AntDesign
                        name='retweet'
                        color='#f4511e'
                        size={50}
                    />
                </TouchableOpacity>
            </View>          
            </View>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    margin:10,
                    marginBottom:0,
                    borderWidth:2,
                    borderColor:'#f4511e',
                }}
            >
                <TextInput
                    style={{
                        color:'white',
                        fontSize:20,
                    }}
                    placeholder={'Update Your Password...'}
                    onChangeText={SetPassword}
                    value={password}
                    placeholderTextColor='white'

                />
                <View
                    style={{
                        borderColor:'#f4511e',
                        borderWidth:2,
                        borderLeftWidth:4,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handlePasswordUp()}
                    >
                        <AntDesign
                            name='retweet'
                            color='#f4511e'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>          
            </View>
            <View
                style={{
                    alignItems:'center',
                    marginTop:20,
                }}
            >
                <Text
                    style={{
                        color:'grey',
                        fontSize:20,
                        marginBottom:20,
                    }}
                >--Update Your Avatar--</Text>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderColor:'#f4511e',
                    borderWidth:2,
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleSetAvatar(0)}
                >
                <Avatar.Image
                    size={50}
                    source={{uri:avatar[0]}}
                />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>handleSetAvatar(1)}
                >
                <Avatar.Image
                    size={50}
                    source={{uri:avatar[1]}}
                />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>handleSetAvatar(2)}
                >
                <Avatar.Image
                    size={50}
                    source={{uri:avatar[2]}}
                />
                </TouchableOpacity>
                <View
                    style={{
                        borderColor:'#f4511e',
                        borderWidth:2,
                        borderLeftWidth:4,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleAvatarUp()}
                    >
                        <AntDesign
                            name='retweet'
                            color='#f4511e'
                            size={70}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </View>
    )

}

export default UpdateScreen;