---
title: "Introducing behavior-state: a BLoC pattern library for React"
date: 2019-09-10T20:00:21-04:00
type: "post"
author: "Cole Lawrence"
draft: false
---

I'm currently working on [my `behavior-state` library](https://github.com/colelawrence/behavior-state) which leverages the primitives of `rxjs` to create
incredible development experiences by creating strict separations between business logic and presentation logic.

Although, little is written on `behavior-state` there is [a rough initial presentation](/storybook/?path=/story/writing-observable-state-presentations--react-nyc-oct-2019) demonstrating the concepts so far.

For other musings, please take a look at the [Storybook](/storybook) which is home to most of my recent front-end library experiments.

#### Todo App Sample
[Storybook](/storybook/?path=/story/writing-observable-state-presentations--react-nyc-oct-2019-todo-app) [Source Code](https://github.com/RefactorOrDie/refactorordie.com/tree/master/storybook/stories/writing/presentations/ObservableStateOct2019/TodoApp/src/app)

<iframe
    style="width: 500px; height: 560px; border: none"
    src="/storybook/iframe.html?id=writing-observable-state-presentations--react-nyc-oct-2019-todo-app#/"
></iframe>

```jsx
function TodoApp() {
  const state = useContext(TodoState);

  return (
    <div className="container">
      <h1>Todos <small style={{ fontSize: 16}}>APP</small></h1>
      <ul className="list-group">
        <state.$todos.react
          nextItem={todo => <TodoItem key={todo.id} todo={todo} />}
        />
      </ul>
      <br />
      <form className="form-group" onSubmit={preventDefaultThen(state.addTodo)}>
        <label htmlFor="todo-title">New Todo Title</label>
        <div className="input-group">
          <state.$todoInput.react
            next={value => (
              <input
                id="todo-title"
                type="text"
                className="form-control"
                value={value}
                onChange={changeValue(state.updateNewTodoInput)}
                placeholder="What do you want to get done?"
              />
            )}
          />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}
```
