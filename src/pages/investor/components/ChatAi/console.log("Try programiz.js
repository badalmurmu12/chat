console.log("Try programiz.pro");
{
    var x=0;
    console.log(x);
    x = 1;
}

{
    let x=0;
    x = 2;
    console.log(x);
}

console.log(x);


const obj1 = { 
    firstName: "First_name", 
    lastName: "Last_name"
}; 
const obj2 = { 
    firstName: "Sachin", 
    lastName: "Tendulkar"
}; 
function printName() { 
    console.log(this.firstName + " " + this.lastName); 
} 
printName.apply(obj2); 
console.log(obj1.firstName + " " + obj1.lastName);



function clousureEx(){
    let counter = 1
    return {
        add: function(){
        counter =  counter + 1
        },
                subtract: function(){
        counter =  counter - 1
        },
                getvalue: function(){
         return counter
        },
    }
}
let temp = clousureEx()
temp.add()
temp.add()
temp.add()
console.log(temp.getvalue())
temp.subtract()
console.log(temp.getvalue())



function clousureEx2(name){
    let counter = 'hi'
     function greet(){
         return counter +  'welcome ' + name
    }
    return greet
}

let temp3 = clousureEx2('badal')

console.log(temp3())