import React,{useState} from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableOpacity  } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-paper';

import Mytextinput from './components/Mytextinput'; 
import Mybutton from './components/Mybutton';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Signin = ({navigation,route}) => {

    const [user_name,setUser_name] = useState('');
    const [fav_col,setFav_col] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [avatar,setAvatar] = useState('');
    const [errtxt,setErrtxt] =useState('Result');
    const [numreg,setNumreg] = useState(1);

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
          return (true);
        }
        
        return (false);
    }

    const handleRegister = () => {

        if(numreg>1){
            setErrtxt('You can only register once,Go back and Login.')
            return ;
        }

        if(!user_name){
            setErrtxt('Please Give a Username.');
            return ;
        }

        if(validateEmail(email)==false){
            setErrtxt("Invalid Email.");
            return ;
        }

        if(!password){
            setErrtxt('Please Give a Password');
            return ;
        }

        if(password.length<6){
            setErrtxt('Please Give a Password more than 5 characters.')
            return ;
        }

        /*if(!fav_col){
            setErrtxt('Please Choose a Color.')
            return ;
        }*/

        if(!avatar){
            setErrtxt('Please Choose a Avatar.');
            return ;
        }

        setErrtxt('Result');

        firestore()
        .collection('users')
        .doc(email)
        .set({
            user_name:user_name,
            fav_col:fav_col,
            avatar:avatar,
            history:[],
            email:email,
            password:password,
        })
        .then(()=>{
            setErrtxt('Succesfully Registered!!!');
            setNumreg(prev=>prev+1);

        });
    }

    const handleFirstAvatar = () => {
        setAvatar('https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/00-featured-dark-smiling-blindfolded-satoru-anime-character.jpg?alt=media&token=817ba333-1fc6-4dc9-9d3b-beeacaee69c4');
    }

    const handleSecondAvatar = () => {
        setAvatar('https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/210479227_302194538328606_5657531639808165251_n.jpg?alt=media&token=d9ea3501-9d52-4f62-be10-8854a6324fbe');
    }

    const handleThirdAvatar = () => {
        setAvatar('https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/26bdad3d88dd702a548f1cfe46513574.jpg?alt=media&token=edd7f525-0922-417e-be72-562584e5ce2d');
    }

    const handleFirstColor = () => {
        setFav_col('#f4511e');
    }

    const handleSecondColor = () => {
        setFav_col('#bbfa69');
    }

    const handleThirdColor = () => {
        setFav_col('#2d23eb');
    }

    return (
    
        <ScrollView
            style={{
                flexGrow:1,
                backgroundColor:'black',
            }}
        >
          
            <Mytextinput
                label="Username"
                placeholder="Give Username" 
                placeholderTextColor="#f4511e"
                borderColor="#f4511e" 
                onChangeText={setUser_name}
                value={user_name}
            />
            <Mytextinput
                label="Email"
                placeholder="Give Email" 
                placeholderTextColor="#f4511e"
                borderColor="#f4511e"
                onChangeText={setEmail}
                value={email} 
            />
            <Mytextinput
                label="Password"
                placeholder="Give Password"
                placeholderTextColor="#f4511e"
                borderColor="#f4511e"
                onChangeText={setPassword}
                value={password} 
                secureTextEntry={true}
            />
            {false?<View
                style={{
                    borderWidth:1,
                    borderColor:"#f4511e",
                    marginTop:20,
                    borderRadius:10,
                }}
            >
                <View
                    style={{
                        alignItems:'center',
                    }}
                >
                <Text 
                style={{color:"white",marginBottom:10,fontWeight:'bold'}}>
                    Favourite Color
                </Text>
                </View>
                <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-around',
                }}
                >
                    <TouchableOpacity
                        onPress={handleFirstColor}
                    >
                        <View 
                            style={{
                                width:50,
                                height:50,
                                backgroundColor:'#f4511e',
                                marginBottom:10,
                                borderRadius:25,
                            }}
                        >

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSecondColor}
                    >
                        <View 
                            style={{
                                width:50,
                                height:50,
                                backgroundColor:'#bbfa69',
                                marginBottom:10,
                                borderRadius:25,
                            }}
                        >

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleThirdColor}
                    >
                        <View 
                            style={{
                                width:50,
                                height:50,
                                backgroundColor:'#2d23eb',
                                marginBottom:10,
                                borderRadius:25,
                            }}
                        >

                        </View>
                    </TouchableOpacity>
                </View>
            </View>:null}
            <View 
                style={{
                    borderWidth:1,
                    borderColor:"#f4511e",
                    marginTop:20,
                    borderRadius:10,
                }}
            >
                <View
                    style={{
                        alignItems:'center',
                    }}
                >
                <Text style={{color:"white",marginBottom:10,fontWeight:'bold'}}>
                    Avatar Available
                </Text>
                </View>
                <View style={styles.avatarCont}>
                    <TouchableOpacity
                        onPress={handleFirstAvatar}
                    >
                        <Avatar.Image
                            size={50}
                            source={{
                                uri:"https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/00-featured-dark-smiling-blindfolded-satoru-anime-character.jpg?alt=media&token=817ba333-1fc6-4dc9-9d3b-beeacaee69c4",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSecondAvatar}
                    >
                        <Avatar.Image
                            size={50}
                            source={{
                                uri:"https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/210479227_302194538328606_5657531639808165251_n.jpg?alt=media&token=d9ea3501-9d52-4f62-be10-8854a6324fbe",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleThirdAvatar}
                    >
                        <Avatar.Image
                            size={50}
                            source={{
                                uri:"https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/26bdad3d88dd702a548f1cfe46513574.jpg?alt=media&token=edd7f525-0922-417e-be72-562584e5ce2d",
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={()=>handleRegister()}
                style={{
                    alignItems:'center',
                    marginTop:20,
                }}
            >
                <View
                    style={{
                        borderColor:'#f4511e',
                        borderWidth:2,
                        alignItems:'center',
                        borderRadius:50,
                        flexDirection:'row',
                    }}
                >
                    <FontAwesome
                        name='check-square-o'
                        size={50}
                        color='#f4511e'
                        style={{
                            margin:10,
                        }}
                    />
                    <Text
                        style={{
                            color:'white',
                            fontWeight:'bold',
                            fontSize:25,
                            margin:10,
                            marginLeft:0,
                        }}
                    >Register</Text>
                </View>
            </TouchableOpacity>
            <View style={{
                alignItems:'center',
                borderColor:'#f4511e',
                borderWidth:1,
                borderRadius:10,
                marginTop:20,}}>
                {errtxt!='Succesfully Registered!!!'?<Text 
                style={{
                    color:"red",
                    fontWeight:'bold',
                    fontSize:20,
                }}>
                    {errtxt}
                </Text>:
                <Text
                style={{
                    color:"#12fc25",
                    fontWeight:'bold',
                    fontSize:20,
                }}
                >
                    {errtxt}
                </Text>}
            </View>
          
        </ScrollView>
      
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      flex: 1,
      justifyContent: "space-around",
      backgroundColor:"black",
    },
    avatarCont:{
        flexDirection:'row',
        justifyContent:'space-around',
    }
  });