import 'package:flame/sprite.dart';

class GameCard {
  Sprite image;
  int count;
  Function power;
  GameCard(name) {
    switch (name) {
      case 'baron':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 2;
        break;
      case 'countess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 1;
        break;
      case 'guard':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 5;
        break;
      case 'handmaid':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 2;
        break;
      case 'king':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 1;
        break;
      case 'priest':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 2;
        break;
      case 'prince':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 2;
        break;
      case 'princess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        count = 1;
        break;
      case 'background':
        image = Sprite(
          name + '.jpg',
        );
        break;
      default:
        break;
    }
  }
}
