import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const key = 'my_value';

const App: () => React$Node = () => {
  const [data, setData] = useState('');

  const retrieve = () => {
    try {
      (async () => {
        const storage_data = await AsyncStorage.getItem(key);
        if (storage_data !== null) {
          setData(storage_data);
        }
      })();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieve();
  }, []);

  const doWhatMustBeDone = () => {
    try {
      console.log(data);
      AsyncStorage.setItem(key, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (text) => {
    console.log(text);
    setData(text);
  };

  return (
      <>
        <SafeAreaView>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
            <View style={styles.body}>

              <View style={{height: 20}}/>
              <TextInput value={data} onChangeText={handleChange}/>
              <View style={{height: 20}}/>
              <Button title={'Save'} onPress={doWhatMustBeDone}/>

              <View style={{height: 20}}/>
              <Button title={'Retrive'} onPress={retrieve}/>

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
