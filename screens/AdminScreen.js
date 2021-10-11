import React,{useState,useEffect} from 'react';
import {
    View,Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Mytextinput from './components/Mytextinput';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AdminScreen = ({navigation,route}) => {

    

    const [artist,SetArtist] = useState('');
    const [title,SetTitle] = useState('');
    const [type,SetType] = useState('');
    const [duration,SetDuration] = useState('');
    const [err,SetErr] = useState(false);
    const [errtxt,SetErrtxt] = useState('');
    const [id,SetId] = useState(0);

    useEffect(() => {

        handleId();
    
    }, []);

    const handleId = () => {

        firestore()
        .collection('songlist')
        .get()
        .then(querySnapshot => {
            
            let cntid = 0;
            
            querySnapshot.forEach(documentSnapshot => {
                cntid++;
            })

            cntid++;

            SetId(cntid);

        })

    }

    const handleType = (vtype) => {
        SetType(vtype);
    }

    const handleRequest = () => {
        navigation.navigate('AdminRequest');
    }

    const handleSubmit = () => {
        
        console.log(artist+' '+title+' '+id+' '+type+' '+duration);

        if(artist==''||title==''||type==''){
            SetErr(true);
            SetErrtxt('Artist | Title | Type missing');
            return ;
        }

        /*if((type=='music')&&(duration=='')){
            SetErrtxt('For music duration needed');
            SetErr(true);
            return ;
        }*/

        SetErr(false);
        SetErrtxt('');
        SetId(id+1);

        firestore()
        .collection('songlist')
        .add({
            artist:artist,
            title:title,
            type:type,
            duration:parseFloat(duration),
            id:id,
            url:'',
        })
        .then(()=>{
            alert('Item added!!!');
        });
    }

    return (
        <View
        style={{
            flex:1,
            backgroundColor:'black',
        }}
        >
        <ScrollView
            style={{
                marginTop:15,
            }}
        >
            <TouchableOpacity
                onPress={()=>handleRequest()}
            >
                <View
                    style={{
                        justifyContent:'flex-end',
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                <Octicons
                    name='request-changes'
                    size={50}
                    color='#f4511e'
                />
                <Text
                    style={{
                        color:'#f4511e',
                        marginLeft:10,
                        fontSize:20,
                        marginRight:10,
                    }}
                >Requests</Text>
                </View>
            </TouchableOpacity>
            {err?
            <View
                style={{
                    alignItems:'center',
                    marginTop:25,
                }}
            >
                <Text
                    style={{
                        color:'red',
                        fontSize:18,
                        fontWeight:'bold',
                    }}
                >{errtxt}</Text>
            </View>:null}
            <Mytextinput
                label="Artist"
                placeholder="Give Artist's name" 
                placeholderTextColor="#f4511e"
                borderColor="#f4511e" 
                onChangeText={SetArtist}
                value={artist}
            />
            <Mytextinput
                label="Title"
                placeholder="Give Title's name" 
                placeholderTextColor="#f4511e"
                borderColor="#f4511e" 
                onChangeText={SetTitle}
                value={title}
            />
            {false?<Mytextinput
                label="Duration"
                placeholder="Give Duration" 
                placeholderTextColor="#f4511e"
                borderColor="#f4511e" 
                onChangeText={SetDuration}
                value={duration}
                keyboardType={'numeric'}
            />:null}
            <View
                style={{
                    alignItems:'center',
                    marginTop:20,
                }}
            >
                <Text
                    style={{
                        color:'grey',
                        fontSize:25,
                    }}
                >--Select A Type--</Text>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        margin:20,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginRight:40,
                        }}
                        onPress={()=>handleType('music')}
                    >
                        <FontAwesome
                            name='music'
                            size={50}
                            color='#f4511e'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>handleType('video')}
                    >
                        <FontAwesome
                            name='film'
                            size={50}
                            color='#f4511e'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginLeft:40,
                        }}
                        onPress={()=>handleType('pdf')}
                    >
                        <AntDesign
                            name='pdffile1'
                            size={50}
                            color='#f4511e'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={()=>handleSubmit()}
            >
                <View
                    style={{
                        borderColor:'#f4511e',
                        borderWidth:2,
                        padding:20,
                        alignItems:'center',
                        marginLeft:110,
                        marginRight:110,
                        borderRadius:50,
                        marginTop:50,
                        flexDirection:'row',
                    }}
                >
                    <AntDesign
                        name='upload'
                        size={50}
                        color='#f4511e'
                    />
                    <Text
                        style={{
                            color:'white',
                            fontWeight:'bold',
                            fontSize:25,
                            marginLeft:15,
                        }}
                    >Submit</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        </View>
    )

}

export default AdminScreen;