import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, 
  SafeAreaView, Button, StyleSheet, 
  Alert, ScrollView,Image,
  TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EntTypo from 'react-native-vector-icons/Entypo';

const Login = ({navigation,route}) => {
  
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [errtxtEmail,setErrtxtEmail] = useState('');
  const [errtxtPass,setErrtxtPass] = useState('');
  const [uid,setUid] = useState('');

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      return (true);
    }
    
    return (false);
  } 

  const handleHasErrorEmail = (txt) => {
    setErrtxtEmail(txt);
  }

  const handleHasErrorPass = (txt) => {
    setErrtxtPass(txt);
  }

  const handleLogin = () => {
    
    if(validateEmail(email)==false){
      handleHasErrorEmail('Invalid Email Address.');
      return ;
    }

    handleHasErrorEmail('');


    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      
      let tempArrayObj = [];

      querySnapshot.forEach(documentSnapshot => {

        tempArrayObj.push(documentSnapshot.data());
        
        //console.log(documentSnapshot.data());

      });

      let tempindex = -1; 

      tempArrayObj.forEach((item,index) => {

        if(item.email==email){
          tempindex = index;
        };

      });
      
      if(tempindex>-1){
        if(tempArrayObj[tempindex].password!=pass){
          handleHasErrorPass('Password is incorrect,If you forgot you can press Forgot Password');
          return ;
        } else {
          handleHasErrorPass('');
        }
      } else {
        handleHasErrorEmail('Email is not registered,You can press Sign-In to register.');
        return ;
      }

      handleHasErrorEmail('');
      handleHasErrorPass('');

      navigation.navigate('PlayList',
        {user_info:tempArrayObj[tempindex],}
      );

      setEmail('');
      setPass('');

    });

  }

  const handleSignIn = () => {

    navigation.navigate('Signin');
    setEmail('');
    setPass('');

  }

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
    setEmail('');
    setPass('');
  }

  const handleAdmin = () => {
    
    if(email=='admin'&&pass=='admin'){
      
      navigation.navigate('AdminScreen');
      setErrtxtEmail('');
      setErrtxtPass('');

    } else {
      setErrtxtEmail('Wrong Credentials..');
      setErrtxtPass('Wrong Credentials...');
    }

  }

  return (
    <View
      style={{
        backgroundColor:'black',
        flex:1,
      }}
    >
      <ScrollView>
      <View
        style={{
          margin:10,
          alignItems:'center',
        }}
      >
          <Image
            source={{
              uri:'https://raw.githubusercontent.com/Nahian36/FreeCodeCamp_Project_Images-/main/Musi%5BC%5Dhat.png'
            }}
            style={{
              width:280,
              height:130,
            }}
          />
        </View>  
        <View>
          <Mytextinput
            label="Email"
            placeholder="Enter email"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="white"
            color="white"
          />
          <Text style={{color:"red",fontWeight:"bold",marginBottom:0}}>
            {errtxtEmail}
          </Text>
          <Mytextinput
            label="Password"
            placeholder="Enter Password"
            onChangeText={setPass}
            value={pass}
            placeholderTextColor='white'
            color="white"
            secureTextEntry={true}
          />  
          <Text style={{color:"red",fontWeight:"bold",marginTop:5}}>
            {errtxtPass}
          </Text>
        </View>
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:10,
            marginTop:40,
          }}
        >
          <View
            style={{
              borderWidth:0,
              borderColor:'#f4511e',
              borderRadius:5,
              flexDirection:'row',
            }}
          >
            <TouchableOpacity
              onPress={()=>handleLogin()}
            >
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}
              >
              <AntDesign
                name='login'
                size={50}
                color='#f4511e'
              />
              <Text
                style={{
                  color:'#f4511e',
                  marginLeft:5,
                }}
              >Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={()=>handleSignIn()}
            >
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}
              >
              <AntDesign
                name='adduser'
                size={50}
                color='#f4511e'
              />
              <Text
                style={{
                  color:'#f4511e'
                }}
              >Sign-In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:10,
            marginTop:40,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={()=>handleForgotPassword()}
            >
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}
              >
              <AntDesign
                name='unlock'
                size={50}
                color='#f4511e'
              />
              <Text
                style={{
                  color:'#f4511e'
                }}
              >Forgot Password</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={()=>handleAdmin()}
            >
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}
              >
              <AntDesign
                name='user'
                size={50}
                color='#f4511e'
              />
              <Text
                style={{
                  color:'#f4511e'
                }}
              >Admin</Text>
              </View>
            </TouchableOpacity>
          </View>   
        </View>
      </ScrollView> 
    </View> 
  );
}

export default Login;