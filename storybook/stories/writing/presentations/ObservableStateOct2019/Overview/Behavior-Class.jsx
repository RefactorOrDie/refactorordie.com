import { Behavior } from 'behavior-state'

const state = new Behavior(1)

state.value == 1

state.next(2)

state.value == 2

state.subscribe(nextValue => {
  console.log(nextValue)
}) // immediately prints current value, 2

state.next(5) // => prints 5
