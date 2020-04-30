class User {
    constructor(userID, username, turn = false) {
        this.userID = userID;
        this.username = username;
        this.protected = false;
        this.cards = [0, 0];
        this.turn = turn;
        this.hearts = 0;
        this.lost = false;
    }

}
var userArray = new Array();
user1 = new User(1, "user1", true);
userArray.push(user1)
user2 = new User(2, "user2");
userArray.push(user2)
user3 = new User(3, "user3");
userArray.push(user3)
user4 = new User(4, "user4");
userArray.push(user4)



let Guard = {
    value: 1,
    name: "Guard",
    copies: 5,
    power: function(guessValue, EnemyValue) {
        if (guessValue == EnemyValue) {
            lose(userID);
        } else {
            console.log("did not guess");
        }
    }
}
let Priest = {
    value: 2,
    name: "Priest",
    copies: 2,
    power: function() {
        peak(userID)
    }
}
let Baron = {
    value: 3,
    name: "Baron",
    copies: 2,
    power: function(MyCardValue, EnemyValue) {
        if (MyCardValue == EnemyValue) {
            console.log("draw");
        } else if (MyCardValue > EnemyValue) {
            lose(userID); //enemy
        } else {
            lose(userID); //me
        }
    }
}
let Handmaid = {
        value: 4,
        name: "Handmaid",
        copies: 2,
        power: function(User) {
            User.protected = true;
        }
    }
    // let guard = {
    //     value: 1,
    //     name: "guard",
    //     copies: 5,
    //     power: function(guessValue, EnemyValue) {
    //         if (guessValue == EnemyValue) {
    //             lose(userID);
    //         } else {
    //             console.log("did not guess");
    //         }
    //     }
    // }

let counter = 0;


function gameStart() {
    allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
    //shuffle the deck
    allcards.sort(() => Math.random() - 0.5);
    userArray.forEach(u => {
        u.cards[0] = allcards[counter]
        counter++;
    });
};
gameStart();

function Round() {
    userArray.forEach(u => {
        if (u.turn === true) {
            console.log("its turn of " + u.username);
            u.cards[1] = allcards[counter]
            counter++;
        }
    });
}