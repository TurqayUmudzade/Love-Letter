import 'package:flame/sprite.dart';
import 'package:loveletter/player.dart';

class GameCard {
  Sprite image;
  Function power;
  int number;
  String name;
  GameCard(this.name) {
    switch (name) {
      case 'baron':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 3;
        power = (Player player1, Player player2) {
          if (player1.cards[0].number > player2.cards[0].number) {
            player2.isDead = true;
          } else if (player2.cards[0].number > player1.cards[0].number) {
            player2.isDead = true;
          }
        };
        break;
      case 'countess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 7;
        power = (Player player) {
          if (player.cards.contains(GameCard('prince')) ||
              player.cards.contains(GameCard('king'))) {
            player.chosenCard = this;
          }
        };
        break;
      case 'guard':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 1;
        power = (Player player, GameCard card) {
          if (player.cards.contains(card)) {
            player.isDead = true;
          }
        };
        break;
      case 'handmaid':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 4;
        power = (Player player) => player.isProtected = true;
        break;
      case 'king':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 6;
        power = (Player player1, Player player2) {
          List<GameCard> tmp = player1.cards;
          player1.cards = player2.cards;
          player2.cards = tmp;
        };
        break;
      case 'priest':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 2;
        power = (Player player1, Player player2) {
          player1.enemyCard = player2.cards[0];
        };
        break;
      case 'prince':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 5;
        power = (Player player) => player.discard(player.cards[0]);
        break;
      case 'princess':
        image = Sprite(
          name + '.png',
          width: 300,
          height: 418,
        );
        number = 8;
        power = (Player player) => player.isDead = true;
        break;
      case 'secret':
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
