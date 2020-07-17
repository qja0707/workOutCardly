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

function CardScreen() {
  useEffect(() => {
    // setDeck(deck)
    // console.log('afsdlasdfljk', globalDeck);
  });

  let deck = makeDeck();
  deck = shuffleDeck(deck);

  const k = deck[0];
  console.log('deck:::', deck);
  const [globalDeck, setDeck] = useState(deck);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={globalDeck}
          renderItem={renderItem}
          keyExtractor={(card) => `${card.number}_${card.type}`}
        />
      </View>
    </SafeAreaView>
  );
}

export default CardScreen;

const renderItem = ({card}) => {
  console.log('afds;jlk', card);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}>
      <Text>{card}</Text>
      {/* <Image style={{flex: 1, resizeMode: 'contain'}} source={card.cardImage} /> */}
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

function shuffleDeck(deck) {
  let shuffledDeck = [];
  while (deck.length > 0) {
    const randNum = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck.splice(randNum, 1)[0]);
  }
  return shuffledDeck;
}
