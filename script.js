console.log("OOP-#3");

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car.
Besides a make and current speed, the EV also has the current battery charge in % ('charge' property); 

2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';

3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';

4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉!

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%!

GOOD LUCK 😀

*/

///////////////////////////////////// CAR /////////////////////////////////////
// CODING CHALLENGE IS ABOUT: ONE CLASS INHERIT FROM ANOTHER CLASS USING TWO FOLLOWING FUNCTIONS:
// 1. CONSTRUCTOR FUNCTIONS AND
// 2. Object.create() Function

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// PROTOTYPAL INHERITANCE:
Car.prototype.accelerate = function () {
  console.log(`Speed after acceleration: ${(this.speed += 10)} km/h`);

  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  console.log(`Speed after brake: ${(this.speed -= 5)} km/h`);

  console.log(`${this.make} is going at ${this.speed} km/h`);
};
///////////////////////////////////// CAR /////////////////////////////////////

///////////////////////////////////// EV /////////////////////////////////////
const EV = function (make, speed, charge) {
  // We will not manually set the make and speed manually on this keyword, but we call them from parent class which is Car and at the same time bring the this keyword inside too!
  Car.call(this, make, speed);

  this.charge = charge;
};

// Linking the Prototypes => and Now EV as Child class has access(inherits all the) to all the properties and methods of the Car class as parent class!
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  console.log(`Speed after acceleration: ${(this.speed += 20)} km/h`);

  // console.log((this.charge -= 1 + "%")); OR the following:
  console.log(`Charge after acceleration: ${--this.charge}%`); // --behind the charge to see the result immediately!

  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};
///////////////////////////////////// EV /////////////////////////////////////

const Tesla = new EV("Tesla", 120, 23);
// console.log(Tesla); // EV {make: 'Tesla', speed: 120, charge: 23}

Tesla.chargeBattery(90); // set the 90% of charge to the Tesla as Child class here!

Tesla.brake(); // Tesla is going at 115km/h
Tesla.accelerate(); // Tesla is going at 135km/h, with a charge of 89%
console.log(Tesla); // EV {make: 'Tesla', speed: 120, charge: 90}

// NOTE: WHEN THERE ARE TWO PROPERTIES OR METHODS WITH THE SAME NAME IN PROTOTYPE CHAIN LIKE WHAT WE HAVE HERE AS ACCELERATE METHOD FOR BOTH CAR AS PARENT CLASS AND EV AS CHILD CLASS, JS TAKES THE FIRST ONE THAT APPAERS IN THE CHAIN!

// NOTE: In this case, a CHILD CLASS can overwrite a method that indeed it inherited from parent class! It means the accelerate() method in EV Class as Child here will overwrite the accelerate() method in Car Class as Parent => and this is actually the concept of POLYMORPHISM!

// NOTE: EVEN without the accelerate() method in EV class, We will have the accelerate() method ihherited from Car class because of prototype inheritance => EV.prototype = Object.create(Car.prototype); The DIFFERENCE would be: The accelerate() method in Car class doesn't have charge property!
