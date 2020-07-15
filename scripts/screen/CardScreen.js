import React, {useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {SPADE, HEART, DIAMONDS, CLUB} from '../../resource/CommonString';

function CardScreen() {
  useEffect(() => {
    let deck = makeDeck();
    deck = shuffleDeck(deck);

    console.log('deck:::', deck);
    console.log("afsdlasdfljk")
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Card Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default CardScreen;

/**@function makeDeck
 * @description 순서대로 카드를 생성하는 함수
 **/
function makeDeck() {
  let deck = [];
  for (let i = 0; i < 13; i++) {
    let card = {type: SPADE, number: i + 1};
    deck.push(card);
  }
  for (let i = 0; i < 13; i++) {
    let card = {type: CLUB, number: i + 1};
    deck.push(card);
  }
  for (let i = 0; i < 13; i++) {
    let card = {type: DIAMONDS, number: i + 1};
    deck.push(card);
  }
  for (let i = 0; i < 13; i++) {
    let card = {type: HEART, number: i + 1};
    deck.push(card);
  }
  return deck;
}

function shuffleDeck(deck) {
  let shuffledDeck = [];
  while (deck.length > 0) {
    const randNum = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck.splice(randNum,1));
  }
  return shuffledDeck;
}
