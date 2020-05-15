import 'dart:ui';

import 'package:flame/flame.dart';
import 'package:flame/game.dart';
import 'package:flame/position.dart';
import 'package:flutter/material.dart';
import 'package:loveletter/game_card.dart';

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
  ];

  GameController() {
    initialize();
    cards = List.generate(
      8,
      (i) => GameCard(names[i]),
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
    Rect rect = Rect.fromLTWH(
      0,
      0,
      screenSize.width,
      screenSize.height,
    );
    Paint paint = Paint()..color = Colors.redAccent[400];
    c.drawRect(rect, paint);

    cards[0].image.renderScaled(
          c,
          Position(
            screenSize.width - screenSize.width / 6 - 300 * 0.43 / 2,
            screenSize.height - 418 * 0.43,
          ),
          scale: 0.43,
        );

    Paint deckColor = Paint()..color = Colors.amber;
    RRect deckRRect = RRect.fromLTRBXY(
      screenSize.width / 6 - 300 * 0.43 / 2,
      screenSize.height - 418 * 0.43 - 10,
      screenSize.width / 6 + 300 * 0.43 / 2,
      screenSize.height - 10,
      10,
      10,
    );
    c.drawRRect(deckRRect, deckColor);
    Paint enemyColor = Paint()..color = Color(0xFF999999);
    RRect enemy1 = RRect.fromLTRBXY(
      screenSize.width / 6 - 300 * 0.43 / 2,
      10,
      screenSize.width / 6 + 300 * 0.43 / 2,
      418 * 0.43 + 10,
      10,
      10,
    );
    c.drawRRect(enemy1, enemyColor);

    RRect enemy2 = RRect.fromLTRBXY(
      screenSize.width / 2 - 300 * 0.43 / 2,
      10,
      screenSize.width / 2 + 300 * 0.43 / 2,
      418 * 0.43 + 10,
      10,
      10,
    );
    c.drawRRect(enemy2, enemyColor);

    RRect enemy3 = RRect.fromLTRBXY(
      screenSize.width * 5 / 6 - 300 * 0.43 / 2,
      10,
      screenSize.width * 5 / 6 + 300 * 0.43 / 2,
      418 * 0.43 + 10,
      10,
      10,
    );
    c.drawRRect(enemy3, enemyColor);
    TextPainter enemyName1 = TextPainter(
      text: TextSpan(
        text: 'Enemy 1',
        style: TextStyle(
          backgroundColor: Colors.transparent,
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    );
    enemyName1.layout();
    enemyName1.paint(
      c,
      Offset(
        screenSize.width / 6 - 300 * 0.43 / 2 + 5,
        15,
      ),
    );

    TextPainter enemyName2 = TextPainter(
      text: TextSpan(
        text: 'Enemy 2',
        style: TextStyle(
          backgroundColor: Colors.transparent,
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    );
    enemyName2.layout();
    enemyName2.paint(
      c,
      Offset(
        screenSize.width / 2 - 300 * 0.43 / 2 + 5,
        15,
      ),
    );

    TextPainter enemyName3 = TextPainter(
      text: TextSpan(
        text: 'Enemy 3',
        style: TextStyle(
          backgroundColor: Colors.transparent,
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    );
    enemyName3.layout();
    enemyName3.paint(
      c,
      Offset(
        screenSize.width * 5 / 6 - 300 * 0.43 / 2 + 5,
        15,
      ),
    );

    TextPainter tp = TextPainter(
        text: TextSpan(
          text: 'Deck',
          style: TextStyle(
            backgroundColor: Colors.transparent,
            fontSize: 25,
            color: Colors.greenAccent[400],
          ),
        ),
        textDirection: TextDirection.ltr,
        textAlign: TextAlign.center);
    tp.layout();
    tp.paint(
      c,
      Offset(
        screenSize.width / 6 - 24,
        screenSize.height - 418 * 0.43 / 2 - 20,
      ),
    );
  }
}
