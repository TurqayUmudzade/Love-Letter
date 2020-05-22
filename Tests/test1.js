"use strict";
 

function classDeterminer(cardValue) {
    let className;
    if (cardValue == 1)
        className = 'guard';
    if (cardValue == 2)
        className = 'priest';
    if (cardValue == 3)
        className = 'baron';
    if (cardValue == 4)
        className = 'handmaid';
    if (cardValue == 5)
        className = 'prince';
    if (cardValue == 6)
        className = 'king';
    if (cardValue == 7)
        className = 'countess';
    if (cardValue == 8)
        className = 'princess';

    return className;
}


if(classDeterminer(1)!=='guard')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 1)')
else 
console.log("Everything works 1")

if(classDeterminer(2)!=='priest')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 2)')
else 
console.log("Everything works 2")

if(classDeterminer(3)!=='baron')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 3)')
else 
console.log("Everything works 3")

if(classDeterminer(4)!=='handmaid')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 4)')
else 
console.log("Everything works 4")

if(classDeterminer(5)!=='prince')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 5)')
else 
console.log("Everything works 5")

if(classDeterminer(6)!=='king')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 6)')
else 
console.log("Everything works 6")

if(classDeterminer(7)!=='countess')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 7)')
else 
console.log("Everything works 7")

if(classDeterminer(8)!=='princess')
throw new Error ('Check fail: Function classDeterminer has some problems(Example 8)')
else 
console.log("Everything works 8")

