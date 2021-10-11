import React, { useState, useEffect } from 'react';

import { Button, SafeAreaView, 
  View, FlatList, Text, 
  TouchableOpacity,TextInput } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PlayList = ({ route, navigation }) => {

  const [DATA, setDATA] = useState([]);
  const [searchText, SetSearchText] = useState();
  const [filteredDATA, SetFilteredDATA] = useState([]);
  const [searchButton,SetSearchButton] = useState(true);

  useEffect(() => {

    loadSongList();

  }, []);

  const loadSongList = () => {
    //console.log('DATA length ' + DATA.length);
    if (DATA.length > 0) return;
    console.log(route.params.userInfo);
    firestore()
      .collection('songlist')
      .get()
      .then(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {

          //console.log(documentSnapshot.data());
          data.push(documentSnapshot.data());

        });

        setDATA(data);

      });

  }

  const handleTestInPlay = () => {
    console.log(songs);
  }

  const handlePressOnFile = (obj) => {

    //console.log(obj.artist+' '+obj.duration+' '+obj.id+' '+obj.title+' '+obj.type+' '+obj.url);

    handleRecentlyPlayed(obj);
    handleMostlyPlayed(obj);

    if (obj.type == 'music') {
      navigation.navigate('MusicPlayerScreen1', {
        artist: obj.artist,
        duration: obj.duration,
        id: obj.id,
        title: obj.title,
        type: obj.type,
        url: obj.url,
        user_info: route.params.user_info,
      })

    } else if (obj.type == 'video') {
      navigation.navigate('VideoPlayerScreen', {
        artist: obj.artist,
        duration: obj.duration,
        id: obj.id,
        title: obj.title,
        type: obj.type,
        url: obj.url,
        user_info: route.params.user_info,
      })
    } else if (obj.type == 'pdf') {
      navigation.navigate('PdfPlayerScreen', {
        artist: obj.artist,
        duration: obj.duration,
        id: obj.id,
        title: obj.title,
        type: obj.type,
        url: obj.url,
        user_info: route.params.user_info,
      })
    }

  }

  const handleRecentlyPlayed = (obj) => {

    //console.log(route.params.user_info);

    firestore()
      .collection('users')
      .doc(route.params.user_info.email)
      .update({
        recently_played: obj,
      })
      .then(() => {
        console.log('recently_played updated...');
      });

  }

  const handleMostlyPlayed = (obj) => {

    let varr = route.params.user_info.history;

    varr.push(obj);

    firestore()
      .collection('users')
      .doc(route.params.user_info.email)
      .update({
        history: varr,
      })
      .then(() => {
        console.log('history updated...');
      });

  }

  const handleSearch = (vtext) => {

    //console.log('khali '+vtext);
    
    SetSearchButton(false);
    SetSearchText(vtext);

    let fdata = DATA.filter((item)=>{
      return item.title.includes(searchText);
    });

    SetFilteredDATA(fdata);

  }

  const handleBack = () => {
    SetFilteredDATA([]);
    SetSearchText('');
    SetSearchButton(true);
  }

  const handleRequest = () => {

    navigation.navigate('RequestScreen',{
      user_info:route.params.user_info,
    })

  }

  const renderItem = ({ item }) => {

    let musicBool = false;
    let videoBool = false;
    let pdfBool = false;
    
    if(item.type=='music'){
      musicBool = true;
    } else if(item.type=='video'){
      videoBool = true;
    } else if(item.type=='pdf'){
      pdfBool = true;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
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
            width: '80%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handlePressOnFile({
            artist: item.artist,
            duration: item.duration,
            id: item.id,
            title: item.title,
            type: item.type,
            url: item.url,
          })}
        >
          {musicBool?
          <FontAwesome
            name='music'
            size={50}
            color='#f4511e'
            style={{
              marginRight:10,
            }}
          />:null}
          {videoBool?
          <FontAwesome
            name='film'
            size={45}
            color='#f4511e'
          />:null}
          {pdfBool?
          <AntDesign
            name='pdffile1'
            size={50}
            color='#f4511e'
          />:null}
        </TouchableOpacity>
      </View>
    )
  };

  //main return

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
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
          onPress={() => navigation.navigate('Profile', {
            user_info: route.params.user_info,
          })}
        >
          <Avatar.Image
            size={50}
            source={{
              uri: route.params.user_info.avatar
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
          >Welcome {route.params.user_info.user_name}.</Text>
        </View>
        <TouchableOpacity
          onPress={()=>handleRequest()}
        >
        <View
          style={{
            
          }}
        >
          <AntDesign
            name='pluscircle'
            size={50}
            color='#f4511e'
          />
        </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          margin:10,
          borderColor: '#f4511e',
          borderWidth: 2,
          borderRadius: 50,        
        }}
      >
        {searchButton?
        <View
          style={{
            borderRadius:50,
            borderColor:'#f4511e',
            borderWidth:2,
          }}
        >
        <AntDesign
          name='search1'
          color='#f4511e'
          size={40}
        />
        </View>:
        <View
          style={{
            borderWidth:2,
            borderColor:'#f4511e',
            borderRadius:50,
          }}
        >
          <TouchableOpacity
            onPress={()=>handleBack()}
          >
            <AntDesign
              name='arrowleft'
              color='#f4511e'
              size={40}
            />
          </TouchableOpacity>
        </View>}
        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
          }}
          placeholder={'Search...'}
          onChangeText={handleSearch}
          value={searchText}
          placeholderTextColor='white'
        />
      </View>
      <FlatList
        data={filteredDATA&&filteredDATA.length>0?filteredDATA:DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default PlayList;