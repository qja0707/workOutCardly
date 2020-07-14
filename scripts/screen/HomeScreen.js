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

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <TouchableOpacity
          style={{backgroundColor: 'blue'}}
          onPress={() => {
            console.log('clicked work out');
            navigation.navigate('CardScreen');
          }}>
          <Text>Work out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
