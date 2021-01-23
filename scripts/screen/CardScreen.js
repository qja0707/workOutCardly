import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import {SPADE, HEART, DIAMOND, CLUB} from '../../resource/CommonString';

// import showToast from '../Util';
import Util from '../Util';

const images = {
  spade: [
    require('../../resource/images/cards/ace_of_spades.png'),
    require('../../resource/images/cards/2_of_spades.png'),
    require('../../resource/images/cards/3_of_spades.png'),
    require('../../resource/images/cards/4_of_spades.png'),
    require('../../resource/images/cards/5_of_spades.png'),
    require('../../resource/images/cards/6_of_spades.png'),
    require('../../resource/images/cards/7_of_spades.png'),
    require('../../resource/images/cards/8_of_spades.png'),
    require('../../resource/images/cards/9_of_spades.png'),
    require('../../resource/images/cards/10_of_spades.png'),
    require('../../resource/images/cards/jack_of_spades.png'),
    require('../../resource/images/cards/queen_of_spades.png'),
    require('../../resource/images/cards/king_of_spades.png'),
  ],
  club: [
    require('../../resource/images/cards/ace_of_clubs.png'),
    require('../../resource/images/cards/2_of_clubs.png'),
    require('../../resource/images/cards/3_of_clubs.png'),
    require('../../resource/images/cards/4_of_clubs.png'),
    require('../../resource/images/cards/5_of_clubs.png'),
    require('../../resource/images/cards/6_of_clubs.png'),
    require('../../resource/images/cards/7_of_clubs.png'),
    require('../../resource/images/cards/8_of_clubs.png'),
    require('../../resource/images/cards/9_of_clubs.png'),
    require('../../resource/images/cards/10_of_clubs.png'),
    require('../../resource/images/cards/jack_of_clubs.png'),
    require('../../resource/images/cards/queen_of_clubs.png'),
    require('../../resource/images/cards/king_of_clubs.png'),
  ],
  diamond: [
    require('../../resource/images/cards/ace_of_diamonds.png'),
    require('../../resource/images/cards/2_of_diamonds.png'),
    require('../../resource/images/cards/3_of_diamonds.png'),
    require('../../resource/images/cards/4_of_diamonds.png'),
    require('../../resource/images/cards/5_of_diamonds.png'),
    require('../../resource/images/cards/6_of_diamonds.png'),
    require('../../resource/images/cards/7_of_diamonds.png'),
    require('../../resource/images/cards/8_of_diamonds.png'),
    require('../../resource/images/cards/9_of_diamonds.png'),
    require('../../resource/images/cards/10_of_diamonds.png'),
    require('../../resource/images/cards/jack_of_diamonds.png'),
    require('../../resource/images/cards/queen_of_diamonds.png'),
    require('../../resource/images/cards/king_of_diamonds.png'),
  ],
  heart: [
    require('../../resource/images/cards/ace_of_hearts.png'),
    require('../../resource/images/cards/2_of_hearts.png'),
    require('../../resource/images/cards/3_of_hearts.png'),
    require('../../resource/images/cards/4_of_hearts.png'),
    require('../../resource/images/cards/5_of_hearts.png'),
    require('../../resource/images/cards/6_of_hearts.png'),
    require('../../resource/images/cards/7_of_hearts.png'),
    require('../../resource/images/cards/8_of_hearts.png'),
    require('../../resource/images/cards/9_of_hearts.png'),
    require('../../resource/images/cards/10_of_hearts.png'),
    require('../../resource/images/cards/jack_of_hearts.png'),
    require('../../resource/images/cards/queen_of_hearts.png'),
    require('../../resource/images/cards/king_of_hearts.png'),
  ],
  backArrow:require('../../resource/images/button/backArrow.png')
};

//총 카드 수, 이전 페이지에서 난이도에 따라 카드 수를 조절할 수 있음
let totalCardNum = 13;

//현재 카드 인덱스
// let cardIndex = 0;

//FlatList 컴포넌트
let flatList;

//카드 이동 가능한지
let cardMoveable = true;
let moveableCountdown = 500;

function CardScreen({route, navigation}) {
  // console.log("param :", route.params)
  totalCardNum = route.params.totalCardNum;
  const [deck, setDeck] = useState(() => {
    let deck = makeDeck();
    deck = shuffleDeck(deck);
    // deck = deck.splice(0, totalCardNum);
    return deck;
  });
  //현재 카드 인덱스
  const [cardIndex, setCardIndex] = useState(0);

  //파트당 운동 갯수
  const [spade, setSpade] = useState(0); //right leg
  const [club, setClub] = useState(0); //left leg
  const [heart, setHeart] = useState(0); //squot
  const [diamond, setDiamond] = useState(0); //squot

  //운동 종료를 위한 모달 창
  const [modalVisible, setModalVisible] = useState(false);

  //운동한 날짜
  const date = Math.floor((new Date().getTime())/(1000*3600*24))*1000*3600*24 ;

  const matchCardWithPart = {
    spade: '오른발',
    club: '왼발',
    heart: '스쿼트',
    diamond: '스쿼트',
  };

  useEffect(() => {});
  // console.log("asdfjk;")

  //deck 에 있는 카드를 총 카드 수로 맞춤 (뒤 카드 버림)

  // console.log('total deck :', deck);

  //헤더 백 버튼 이벤트 추가
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
        style={{width:50, height:50}}
          onPress={() => {
            setModalVisible(true)
            console.log('운동 종료');
          }}>
            <Image style={{width:50, height:50}} resizeMode={'contain'} source={images.backArrow}/>
          </TouchableOpacity>
      ),
      // headerBackImage:()=>(

      // )
    });
  }, [navigation]);

  const renderItem = (item) => {
    const card = item.item;
    return (
      <View
        style={{
          height: '100%',
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{height: '90%'}}
          onPress={() => {
            console.log('cardMoveable', cardMoveable);
            if (cardMoveable) {
              cardControl(1);
              countPartNumber(card);
              setTimeout(() => {
                cardMoveable = true;
              }, moveableCountdown);
            } else {
              console.log('asdf');

              Util.showToast('운동하고 넘겨, 인성에 문제있어?');
              // Toast.show(toast)
            }
          }}>
          <Image
            style={{flex: 1, resizeMode: 'contain'}}
            source={card.cardImage}
          />
        </TouchableOpacity>
        <Text style={{height: '10%'}}>{matchCardWithPart[card.type]}</Text>
      </View>
    );
  };

  /**@function makeDeck
   * @description 순서대로 카드를 생성하는 함수
   **/
  function makeDeck() {
    try {
      let deck = [];
      for (let i = 0; i < totalCardNum; i++) {
        let card = {type: SPADE, number: i + 1, cardImage: images.spade[i]};
        deck.push(card);
      }
      for (let i = 0; i < totalCardNum; i++) {
        let card = {type: CLUB, number: i + 1, cardImage: images.club[i]};
        deck.push(card);
      }
      for (let i = 0; i < totalCardNum; i++) {
        let card = {type: DIAMOND, number: i + 1, cardImage: images.diamond[i]};
        deck.push(card);
      }
      for (let i = 0; i < totalCardNum; i++) {
        let card = {type: HEART, number: i + 1, cardImage: images.heart[i]};
        deck.push(card);
      }
      return deck;
    } catch (e) {
      console.log(e);
    }
  }

  /**@function shuffleDeck
   * @param deck 카드 오브젝트를 원소로 가지는 array
   * @description 카드를 섞는 함수
   **/
  function shuffleDeck(deck) {
    let shuffledDeck = [];
    while (deck.length > 0) {
      const randNum = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck.splice(randNum, 1)[0]);
    }
    return shuffledDeck;
  }

  /**@function cardControl
   * @param offset 몇장 이동할건지 number
   * @description 카드를 이동하는 함수
   **/
  function cardControl(offset) {
    cardMoveable = false;

    let destinationCard = cardIndex + offset;
    if (destinationCard > deck.length - 1) {
      // destinationCard = deck.length - 1;

      setModalVisible(true);

      return;
    }

    setCardIndex(destinationCard);

    flatList.scrollToIndex({index: destinationCard});
  }

  function countPartNumber(card) {
    if (card.type == SPADE) {
      setSpade(spade + card.number);
    } else if (card.type == CLUB) {
      setClub(club + card.number);
    } else if (card.type == DIAMOND) {
      setDiamond(diamond + card.number);
    } else if (card.type == HEART) {
      setHeart(heart + card.number);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>remaining : {deck.length - cardIndex}</Text>
        <Text>오른발 : {spade}</Text>
        <Text>왼발 : {club}</Text>
        <Text>스쿼트 : {heart + diamond}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          ref={(ref) => {
            flatList = ref;
          }}
          data={deck}
          renderItem={renderItem}
          keyExtractor={(card) => `${card.number}_${card.type}`}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* 저장할 갯수 출력 */}
            {/* 같은 날짜에 갯수 데이터 있으면 플러스 */}

            <Text style={styles.modalText}>{Util.getDate(date)}</Text>
            <Text>오른발 : {spade}</Text>
            <Text>왼발 : {club}</Text>
            <Text>스쿼트 : {heart + diamond}</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                Util.saveRecord(date,heart+diamond,club,spade)
                navigation.navigate('HomeScreen');
              }}>
              <Text style={styles.textStyle}>저장 후 종료</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <KeepAwake/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CardScreen;
