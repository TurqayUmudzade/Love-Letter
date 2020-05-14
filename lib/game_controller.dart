import 'dart:ui';

import 'package:flame/flame.dart';
import 'package:flame/game.dart';
import 'package:flame/position.dart';
import 'package:flame/sprite.dart';

class GameController extends BaseGame {
  static Size screenSize;

  static Sprite baron = Sprite(
    'baron.jpg',
  );

  static Sprite countess = Sprite(
    'countess.jpg',
  );

  static Sprite guard = Sprite(
    'guard.jpg',
  );

  static Sprite handmaid = Sprite(
    'handmaid.jpg',
  );

  static Sprite king = Sprite(
    'king.jpg',
  );

  static Sprite priest = Sprite(
    'priest.jpg',
  );

  static Sprite prince = Sprite(
    'prince.jpg',
  );

  static Sprite princess = Sprite(
    'princess.jpg',
  );

  List<Sprite> cards = [
    baron,
    countess,
    guard,
    handmaid,
    king,
    priest,
    prince,
    princess,
  ];

  GameController() {
    initialize();
  }

  void initialize() async {
    resize(await Flame.util.initialDimensions());
  }

  void resize(Size size) {
    screenSize = size;
  }

  void update(double t) {}

  void render(Canvas c) {
    Rect rect = Rect.fromLTWH(
      0,
      0,
      screenSize.width,
      screenSize.height,
    );
    Paint paint = Paint()..color = Color(0xFFFF0000);
    c.drawRect(rect, paint);
    cards[0].renderPosition(
      c,
      Position(
        screenSize.width / 2 - 75,
        screenSize.height - 200,
      ),
    );
    cards[1].renderPosition(
      c,
      Position(
        0,
        screenSize.height / 2 - 100,
      ),
    );
    cards[2].renderPosition(
      c,
      Position(
        screenSize.width - 150,
        screenSize.height / 2 - 100,
      ),
    );
    cards[3].renderPosition(
      c,
      Position(
        screenSize.width / 2 - 75,
        0,
      ),
    );
  }
}
