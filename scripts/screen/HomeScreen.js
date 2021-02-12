import React, {useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Util from '../Util';

const easyCardNum = 7;
const normalCardNum = 10;
const hardCardNum = 13;

const images = {
  backArrow: require('../../resource/images/button/backArrow.png'),
  easy: require('../../resource/images/easy.jpg'),
  normal: require('../../resource/images/normal.jpg'),
  hard: require('../../resource/images/hard.jpg'),
  funnyHell: require('../../resource/images/funnyHell.jpg'),
};

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          style={[{backgroundColor: 'white'}, styles.cardButton]}
          onPress={() => {
            console.log('clicked work out');
            navigation.push('CardScreen', {totalCardNum: easyCardNum});
          }}>
          {/* imageView */}
          <View style={styles.imageView}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={images.easy}
            />
          </View>
          {/* titleView */}
          <View style={styles.titleView}>
            <Text style={styles.title}>EASY</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[{backgroundColor: 'white'}, styles.cardButton]}
          onPress={() => {
            console.log('clicked work out');
            navigation.push('CardScreen', {totalCardNum: normalCardNum});
          }}>
          {/* imageView */}
          <View style={styles.imageView}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={images.normal}
            />
          </View>
          {/* titleView */}
          <View style={styles.titleView}>
            <Text style={styles.title}>NORMAL</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[{backgroundColor: 'white'}, styles.cardButton]}
          onPress={() => {
            console.log('clicked work out');
            navigation.push('CardScreen', {
              totalCardNum: hardCardNum,
              joker: true,
            });
          }}>
          {/* imageView */}
          <View style={styles.imageView}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={images.hard}
            />
          </View>
          {/* titleView */}
          <View style={styles.titleView}>
            <Text style={styles.title}>HARD</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{backgroundColor: 'white'}, styles.cardButton]}
          onPress={() => {
            console.log('clicked calendar');
            navigation.push('CalendarScreen');
          }}>
          {/* imageView */}
          <View style={styles.imageView}></View>
          {/* titleView */}
          <View style={styles.titleView}>
            <Text style={styles.title}>CALENDAR</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardButton: {
    height: 300,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
  },
  imageView: {height: 270},
  titleView: {height: 30},
  textView: {},
  title: {fontSize: 20, alignSelf: 'center'},
});

export default HomeScreen;
