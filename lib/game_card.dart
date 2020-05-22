import 'package:flame/sprite.dart';
import 'package:loveletter/player.dart';

class GameCard {
  Sprite image;
  Function power;
  String name;
  GameCard(this.name) {
    switch (name) {
      case 'baron':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        break;
      case 'countess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        break;
      case 'guard':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        break;
      case 'handmaid':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        power = (Player player) => player.isProtected = true;
        break;
      case 'king':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        break;
      case 'priest':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        break;
      case 'prince':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        power = (Player player) => player.cards.removeLast();
        break;
      case 'princess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
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
