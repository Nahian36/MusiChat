import React from 'react';
import {View} from 'react-native';
import { HelperText } from 'react-native-paper';

const Myhelpertext = (props) => {
    return (
        <View style={{flex:1}}>
        <HelperText type="error" visible={props.hasErrors()}>
            {props.errtxt}
        </HelperText>
        </View>
    );
};

export default Myhelpertext;