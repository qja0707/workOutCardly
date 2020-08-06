import Toast from 'react-native-root-toast';

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

  const tStyle = {
    fontFamily: fonts.notoSansMedium,
    color: '#ffffff',
    fontSize: 13,
  };

  const toast = Toast.show(text, {
    duration: !time ? Toast.durations.LONG : Toast.durations.SHORT,
    position: !pos ? Toast.positions.BOTTOM : Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: cStyle,
    textStyle: tStyle,

    onShow: () => {
      // 이 전에 출력된 메시지는 제거 후 새로운 토스트를 출력한다.
      if (toastIns != null) {
        Toast.hide(toastIns);
      }
      toastIns = toast;
    },
    onHidden: () => {
      toastIns = null;
    },
  });
}

export default {
  showToast,
};
