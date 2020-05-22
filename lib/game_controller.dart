import 'dart:ui';

import 'package:flame/flame.dart';
import 'package:flame/game.dart';
import 'package:flame/position.dart';
import 'package:flutter/material.dart';
import 'package:loveletter/game_card.dart';
import 'package:loveletter/player.dart';

class GameController extends Game {
  static Size screenSize;
  List<GameCard> cards;
  List<String> names = [
    'baron',
    'countess',
    'guard',
    'handmaid',
    'king',
    'priest',
    'prince',
    'princess',
    'secret',
    'background',
  ];

  List<GameCard> deck;
  List<Player> players;

  GameController() {
    initialize();
    cards = List.generate(
      10,
      (i) => GameCard(names[i]),
    );
    deck = [
      cards[0],
      cards[0],
      cards[1],
      cards[2],
      cards[2],
      cards[2],
      cards[2],
      cards[2],
      cards[3],
      cards[3],
      cards[4],
      cards[5],
      cards[5],
      cards[6],
      cards[6],
      cards[7],
    ];
    deck.shuffle();
    players = [];
    players.add(
      Player(
        this,
        'Player 1',
      ),
    );
    players.add(
      Player(
        this,
        'Player 2',
      ),
    );
    players.add(
      Player(
        this,
        'Player 3',
      ),
    );
    players.add(
      Player(
        this,
        'Player 4',
      ),
    );
  }

  void initialize() async {
    resize(await Flame.util.initialDimensions());
  }

  void resize(Size size) {
    screenSize = size;
  }

  void update(double t) {}

  void render(Canvas c) async {
    Position p1 = Position(
      screenSize.width / 6 - 300 * 0.43 / 2,
      10,
    );
    Position p2 = Position(
      screenSize.width / 2 - 300 * 0.43 / 2,
      10,
    );
    Position p3 = Position(
      screenSize.width * 5 / 6 - 300 * 0.43 / 2,
      10,
    );
    Position p4 = Position(
      screenSize.width * 5 / 6 - 300 * 0.43 / 2,
      screenSize.height - 418 * 0.43 - 10,
    );

    players[0].drawCard(deck[0]);
    cards[9].image.renderScaled(
          c,
          Position(
            0,
            0,
          ),
          scale: 0.43,
        );

    players[0].cards[0].image.renderScaled(
          c,
          p4,
          scale: 0.43,
        );

    cards[8].image.renderScaled(
          c,
          Position(
            screenSize.width / 6 - 300 * 0.43 / 2,
            screenSize.height - 418 * 0.43 - 10,
          ),
          scale: 0.43,
        );

    TextPainter deckText = TextPainter(
      text: TextSpan(
        text: 'Deck',
        style: TextStyle(
          backgroundColor: Colors.transparent,
          fontSize: 35,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    );
    deckText.layout();
    deckText.paint(
      c,
      Offset(
        screenSize.width / 6 - deckText.width / 2,
        screenSize.height - 418 * 0.43 / 2 - deckText.height / 2 - 75,
      ),
    );

    cards[8].image.renderScaled(
          c,
          p1,
          scale: 0.43,
        );
    cards[8].image.renderScaled(
          c,
          p2,
          scale: 0.43,
        );
    cards[8].image.renderScaled(
          c,
          p3,
          scale: 0.43,
        );

  }
}
