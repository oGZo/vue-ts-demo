import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync';
import store from './store'
import router from './router';

sync(store, router);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

// type ar = string | number;
// let a: Array<ar> = [];

// class A {
//   say() {
//     console.log('say');
//   }
// }

// interface Loggable {
//   sayHi(): void;
// }

// class B implements Loggable{
//   sayHi() {
//     console.log('sayHi');
//   }
// }


// class C extends A{
//   sayBye() {
//     console.log('sayBye');
//   }
// }


// const c = new C();

// function extend<T, U>(first: T, second: U): T & U {
//   let result = <T & U>{};
//   for (let id in first) {
//       (<any>result)[id] = (<any>first)[id];
//   }
//   for (let id in second) {
//       if (!result.hasOwnProperty(id)) {
//           (<any>result)[id] = (<any>second)[id];
//       }
//   }
//   return result;
// }


// const d = extend(new A(), new B());

// // d.sayHi();
// // d.say();

// interface Bird {
//   fly():any;
//   layEggs():any;
// }

// interface Fish {
//   swim():any;
//   layEggs():any;
// }

// function getSmallPet(): Fish | Bird {
//   return { fly:()=>{}, layEggs:() => {}};
// }

// let pet = getSmallPet();
// pet.layEggs(); // okay
// // pet.swim();    // errors


// declare function create(o: object | null): void;


// declare interface A {
//   a: number
// }


// const d: A = {a:1};
// console.log(d);

// create({ prop: 0 }); // OK
// create(null); // OK

// FGAH.a

// FGA.a