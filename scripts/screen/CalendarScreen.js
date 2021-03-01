import React, {useEffect, useState} from 'react';
import {
  ContributionGraph,
  LineChart,
  StackedBarChart,
} from 'react-native-chart-kit';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Util from '../Util';
import {L} from '../../resource/Values';

const commitsData = [
  {date: '2017-01-02', count: 1},
  {date: '2017-01-03', count: 2},
  {date: '2017-01-04', count: 3},
  {date: '2017-01-05', count: 4},
  {date: '2017-01-06', count: 5},
  {date: '2017-01-30', count: 2},
  {date: '2017-01-31', count: 3},
  {date: '2017-03-01', count: 2},
  {date: '2017-04-02', count: 4},
  {date: '2017-03-05', count: 2},
  {date: '2017-02-28', count: 10},
];

const screenWidth = Dimensions.get('window').width;

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
      <ScrollView
        style={{flex: 1, backgroundColor: 'black'}}
        indicatorStyle={'white'}>
        {/* <View style={{flex: 1}}>
          <Text>{record}</Text>
        </View> */}
        {/* weekly */}
        <ScrollView style={{flex: 1}} horizontal={true}>
          <StackedBarChart
            // barPercentage={0.1}
            // strokeWidth={5}
            // stackedBar={5}
            data={stackedData}
            width={screenWidth}
            height={220}
            chartConfig={stackChartConfig}
            // withHorizontalLabels={false}
            horizontalLabelRotation={300}
            formatYLabel={(v)=>{return v+"asdf"}}
          />
        </ScrollView>
        {/* monthly */}
        <ScrollView style={{flex: 1}} horizontal={true}>
          <LineChart
            data={lineData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </ScrollView>
        {/* yearly */}
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          indicatorStyle={'white'}>
          <ContributionGraph
            values={commitsData}
            endDate={new Date('2017-12-31')}
            numDays={365}
            width={1200}
            height={220}
            chartConfig={chartConfig}
          />
        </ScrollView>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          indicatorStyle={'white'}
          showsHorizontalScrollIndicator={true}>
          <Text>asjdfkla;sdjfklas;dfj</Text>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const lineData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'temp1',
    'temp2',
  ],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};

const stackedData = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  legend: [L.squat, `${L.left} ${L.lunge}`, `${L.right} ${L.lunge}`],
  style: {
    width: 100,
  },
  data: [
    [60, 60, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
    [30, 30, 60],
  ],
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
};

const stackChartConfig = {
  backgroundColor: '#ffffff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  barPercentage: 0.5,
  propsForHorizontalLabels:{horizontalLabelRotation:30}
};

const chartConfig = {
  backgroundColor: '#ffffff',
  // backgroundGradientFrom: '#fb8c00',
  // backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  barPercentage: 0.5,
};

export default CalendarScreen;
