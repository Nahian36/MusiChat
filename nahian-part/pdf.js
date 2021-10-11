import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  Text,
  NativeModules,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Pdf from 'react-native-pdf';

const Stack = createStackNavigator();
var PSPDFKit = NativeModules.PSPDFKit;

console.log(Platform.OS);

if (Platform.OS === 'ios') {
  PSPDFKit.setLicenseKey(
    'INSERT_YOUR_LICENSE_KEY_HEREjhdskfhaskhfldashflhasdl',
  );
}

const DOCUMENT =
  Platform.OS === 'ios'
    ? 'pdf.pdf'
    : 'file:///Users/Azman/Desktop/PDF/assets/pdf.pdf';

const HomeScreen = ({navigation}) => {
  function _presentPSPDFKit() {
    PSPDFKit.present(DOCUMENT, {
      pageTransition: 'scrollContinuous',
      scrollDirection: 'vertical',
    });
  }

  const navigationOptions = {
    title: 'Home',
  };

  return (
    <View style={styles.container}>
      <Button title="Open PDF" onPress={() => navigation.navigate('Pdf')} />
      <Button title="Open PDF with PSPDFKit" onPress={_presentPSPDFKit} />
    </View>
  );
};

function PdfScreen() {
  const navigationOptions = {
    title: 'PDF',
  };
  const source = require('./assets/pdf.pdf');

  return <Pdf source={source} style={styles.pdf} />;
}

const PdfApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Pdf"
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          component={PdfScreen}
        />
        <Stack.Screen name="Pdf2" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return <PdfApp />;
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
