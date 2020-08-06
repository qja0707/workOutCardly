import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const easyCardNum = 7;
const normalCardNum = 10;
const hardCardNum = 13;

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <Text>Home Screen</Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            onPress={() => {
              console.log('clicked work out');
              navigation.push('CardScreen', {totalCardNum: easyCardNum});
            }}>
            <Text>EASY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            onPress={() => {
              console.log('clicked work out');
              navigation.push('CardScreen', {totalCardNum: normalCardNum});
            }}>
            <Text>NORMAL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            onPress={() => {
              console.log('clicked work out');
              navigation.push('CardScreen', {totalCardNum: hardCardNum});
            }}>
            <Text>HARD</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
