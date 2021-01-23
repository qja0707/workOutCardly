import React, {useEffect, useState} from 'react';

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

function CalendarScreen({navigation}) {
  //저장된 정보 로드
  const [record, setRecord] = useState('');
  useEffect(() => {
    getRecord().then((r) => {
      setRecord(r);
      console.log('return:', r);
    });

    //날짜, 갯수, 레벨로 재변환
  }, []);

  async function getRecord() {
    try {
      let r = await Util.loadRecord();
      return r;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <Text>Calendar Screen</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>{record}</Text>
        </View>

        <View style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;
