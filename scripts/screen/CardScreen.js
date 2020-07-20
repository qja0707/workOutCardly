import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {SPADE, HEART, DIAMOND, CLUB} from '../../resource/CommonString';

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
};

//총 카드 수, 이전 페이지에서 난이도에 따라 카드 수를 조절할 수 있음
let totalCardNum = 52;

//현재 카드 인덱스
// let cardIndex = 0;

//FlatList 컴포넌트
let flatList;

function CardScreen() {
  useEffect(() => {});
  //현재 카드 인덱스
  const [cardIndex, setCardIndex] = useState(0);

  //파트당 운동 갯수
  const [spade, setSpade] = useState(0); //right leg
  const [club, setClub] = useState(0);  //left leg
  const [heart, setHeart] = useState(0);  //squot
  const [diamond, setDiamond] = useState(0);  //squot


  let matchCardWithPart = {
    spade: 0,
    club: 0,
    heart: 0,
    diamond: 0,
  };

  let deck = makeDeck();
  deck = shuffleDeck(deck);

  //deck 에 있는 카드를 총 카드 수로 맞춤 (뒤 카드 버림)
  deck = deck.splice(0, totalCardNum);

  const renderItem = (item) => {
    const card = item.item;

    return (
      <View
        style={{
          height: '100%',
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
        }}>
        <TouchableOpacity
          style={{backgroundColor: 'cyan'}}
          onPress={() => {
            cardControl(1);
          }}>
          <Image
            style={{flex: 1, resizeMode: 'contain', backgroundColor: 'blue'}}
            source={card.cardImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**@function makeDeck
   * @description 순서대로 카드를 생성하는 함수
   **/
  function makeDeck() {
    try {
      let deck = [];
      for (let i = 0; i < 13; i++) {
        let card = {type: SPADE, number: i + 1, cardImage: images.spade[i]};
        deck.push(card);
      }
      for (let i = 0; i < 13; i++) {
        let card = {type: CLUB, number: i + 1, cardImage: images.club[i]};
        deck.push(card);
      }
      for (let i = 0; i < 13; i++) {
        let card = {type: DIAMOND, number: i + 1, cardImage: images.diamond[i]};
        deck.push(card);
      }
      for (let i = 0; i < 13; i++) {
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
    let destinationCard = cardIndex + offset
    if(destinationCard > totalCardNum-1){
      destinationCard = totalCardNum-1
    }
    
    setCardIndex(destinationCard);

    flatList.scrollToIndex({index: destinationCard});
  }

  function countPartNumber(){

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>remaining : {totalCardNum - cardIndex}</Text>
        <Text>오른발 : {}</Text>
        <Text>왼발 : {}</Text>
        <Text>스쿼트 : {}</Text>
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
    </SafeAreaView>
  );
}

export default CardScreen;
