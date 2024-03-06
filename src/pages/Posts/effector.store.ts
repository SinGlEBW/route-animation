import { createStore, createEffect, createEvent, sample } from 'effector/compat';



/*
  Использовать что-то вместо чего-то
  batch -> greedy
*/

const submitForm = createEvent<number>();
const $userName = createStore("john");

const signInFx = createEffect((params) => {
  console.log(params);
});


sample({
  clock: submitForm /* 1 */,
  source: $userName /* 2 */,
  fn: (name, password) => ({ name, password }) /* 3 */,
  target: signInFx /* 4 */,
});

submitForm(12345678);