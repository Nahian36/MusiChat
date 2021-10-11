import React,{useState} from 'react';
import {View,Text,FlatList,TextInput} from 'react-native';
import { Avatar } from 'react-native-paper';

const SearchBarComp = () => {

    const DATA = [
        {
            name:'atiqur rahman',
            age:22,
            id:1,
        },
        {
            name:'shafin mohammad',
            age:22,
            id:2,
        },
        {
            name:'mushfiqul Haque',
            age:22,
            id:3,
        },
        {
            name:'Nahian Ibn Asad',
            age:22,
            id:4,
        },
    ]

    const [searchText,SetSearchText] = useState();
    const [filteredDATA,SetFilteredDATA] = useState([]);

    const handleSearch = (vtext) => {

        SetSearchText(vtext);

        let fdata = DATA.filter((item) =>{
            return item.name.includes(searchText);
        });

        SetFilteredDATA(fdata);
    }

    const renderItem = ({item}) => {
        return(
            <View
                style={{
                    margin:10,
                }}
            >
                <Text
                    style={{
                        color:'white',
                        fontSize:25,
                    }}
                >{item.name} {item.age}</Text>
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
            <View
                style={{
                    flexDirection:'row',
                    marginTop:20,
                    borderColor:'#f4511e',
                    borderWidth:2,
                    borderRadius:50,
                }}
            >
                <Avatar.Image
                    size={50}
                    source={{
                        uri:'https://firebasestorage.googleapis.com/v0/b/onemoretime-bfcd9.appspot.com/o/search_icon.png?alt=media&token=3ef27eba-d253-4e49-9a1e-314929c636f7'
                    }}
                    style={{
                        backgroundColor:'black'
                    }}
                />
                <TextInput 
                    style={{
                        color:'white',
                        fontSize:20,
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
                keyExtractor={item=>item.id.toString()}
            />
        </View>
    )

}

export default SearchBarComp;