import { storiesOf } from '@storybook/react';
import React from 'react';
import { App } from './App';
import { AppRedux } from './AppRedux';
import { createTodosService } from './Todos.service';
import { AppView } from './AppView';

const todosService = createTodosService(localStorage)

storiesOf('Todos', module)
  .add('Todo App Observer', () => <App todosService={todosService}/>)
  .add('Todo App Observer (View)', () => <AppView todosService={todosService}/>)
  .add('Todo App Redux', () => <AppRedux todosService={todosService}/>);
