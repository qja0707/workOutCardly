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
import Util from '../Util';

function HomeScreen({navigation}) {
  //저장된 정보 로드
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <Text>Calendar Screen</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>{Util.loadRecord()}</Text>
        </View>

        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
