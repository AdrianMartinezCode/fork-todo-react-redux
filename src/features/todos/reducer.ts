import { Todo } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import {
  loadTodosAsync,
  addTodo,
  removeTodo,
  loadAllCurrenciesAsync,
} from './actions';

export const isLoadingTodos = createReducer(false as boolean)
  .handleAction([loadTodosAsync.request], (state, action) => true)
  .handleAction(
    [loadTodosAsync.success, loadTodosAsync.failure],
    (state, action) => false
  );

export const todos = createReducer([
  {
    id: '0',
    title: 'You can add new todos using the form or load saved snapshot...',
  },
] as Todo[])
  .handleAction(loadTodosAsync.success, (state, action) => action.payload)
  .handleAction(addTodo, (state, action) => [...state, action.payload])
  .handleAction(removeTodo, (state, action) =>
    state.filter((i) => i.id !== action.payload)
  );

export const currencies = createReducer([]).handleAction(
  loadAllCurrenciesAsync.success,
  (state, action) => action.payload
);

const todosReducer = combineReducers({
  isLoadingTodos,
  todos,
  currencies,
});

export default todosReducer;
export type TodosState = ReturnType<typeof todosReducer>;
