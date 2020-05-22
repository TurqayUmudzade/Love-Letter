import 'package:loveletter/game_card.dart';
import 'package:loveletter/game_controller.dart';

class Player {
  String name;
  List<GameCard> cards = [];
  bool isDead = false;
  GameController gameController;
  bool isProtected = false;

  Player(this.gameController, this.name);

  void drawCard (GameCard card){
    cards.add(card);
  }

  void discard(GameCard card){
    cards.remove(card);
  }

  void lose(){
    isDead = true;
  }

}
