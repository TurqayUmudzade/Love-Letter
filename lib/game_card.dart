import 'package:flame/sprite.dart';
import 'package:loveletter/game_controller.dart';

class GameCard {
  GameController gameController;
  Sprite image;
  int count;
  Function power;
  GameCard(this.gameController, name){
    switch (name) {
      case 'baron':
        image = Sprite(name + '.jpg');
        count = 2;
        break;
      case 'countess':
        image = Sprite(name + '.jpg');
        count = 1;
        break;
      case 'guard':
        image = Sprite(name + '.jpg');
        count = 5;
        break;
      case 'handmaid':
        image = Sprite(name + '.jpg');
        count = 2;
        break;
      case 'king':
        image = Sprite(name + '.jpg');
        count = 1;
        break;
      case 'priest':
        image = Sprite(name + '.jpg');
        count = 2;
        break;
      case 'prince':
        image = Sprite(name + '.jpg');
        count = 2;
        break;
      case 'princess':
        image = Sprite(name + '.jpg');
        count = 1;
        break;
      default:
        break;
    }
  }
}
