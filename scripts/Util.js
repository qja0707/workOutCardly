import Toast from 'react-native-root-toast';
import DefaultPreference from 'react-native-default-preference';

const EXERCISE_RECORD = 'exerciseRecord';

var toastIns = null;

/**
 *  @function showToastMessage
 *  @brief 화면에 토스트 메시지를 출력한다.
 *  @param {*} text
 *  @param {*} time
 *  @param {*} pos
 *  @param {*} style
 */
function showToast(text, time = null, pos = null) {
  console.log('2234');
  const cStyle = {
    backgroundColor: '#3b3d42',
    borderRadius: 15,
  };

  // const toast = Toast.show(text, {
  //   duration: Toast.durations.LONG,
  //   position: Toast.positions.BOTTOM,
  //   shadow: true,
  //   animation: true,
  //   hideOnPress: true,
  //   delay: 0,
  //   containerStyle: cStyle,
  // });
  const toastOption = {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: cStyle,
  };
  Toast.show('운동 하고 넘겨, 인성에 문제있어?', toastOption);
}

/*
[
  {
    timestamp:"",
    squot:NUM,
    left:NUM,
    right:NUM
  },
  {

  }
]

*/

/**
 *  @function saveRecord
 *  @brief 운동 갯수를 해당 타임스템프와 함께 저장한다.
 *  @param {*} date
 *  @param {*} squot
 *  @param {*} left
 *  @param {*} right
 */
async function saveRecord(date, squot, left, right) {
  // const
  try {
    let exerciseRecord = await DefaultPreference.get(EXERCISE_RECORD);

    if (!exerciseRecord) {
      exerciseRecord = [];
    } else {
      exerciseRecord = JSON.parse(exerciseRecord);
    }

    const newRecord = {
      timestamp: date,
      squot: squot,
      leftLunge: left,
      rightLunge: right,
    };
    exerciseRecord.push(newRecord);
    exerciseRecord = JSON.stringify(exerciseRecord);

    const r = await DefaultPreference.set(EXERCISE_RECORD, exerciseRecord);
    console.log('save value::', r);
    return r;
  } catch (e) {
    console.log('error during save record:', e);
  }
}

async function loadRecord() {
  try {
    const r = await DefaultPreference.get(EXERCISE_RECORD);
    return r;
  } catch (e) {
    console.log('e');
  }
}

/**
 *  @function makeDataForGraph
 *  @brief 시작 날짜, 끝 날짜,
 *  @param {*} startDate
 *  @param {*} endDate
 */
function makeDataForGraph(startDate, endDate) {
  // const
  //return 그래프에 사용할 데이터 오브젝트, 운동 데이터는 전체 리턴하고 ui 상에서 뺐다가 넣었다가 해야할 듯
}

function getDate(date) {
  const d = new Date(date);
  const _year = d.getFullYear();
  const _month = d.getMonth() + 1;
  const _date = d.getDate();

  return `${_year}.${_month}.${_date}`;
}

export default {
  showToast,
  saveRecord,
  loadRecord,
  getDate,
};
