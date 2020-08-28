import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import {
  RootAction,
  RootState,
  Services,
  isActionOf,
  action,
} from 'typesafe-actions';
import * as E from 'fp-ts/lib/Either';

import {
  loadTodosAsync,
  saveTodosAsync,
  loadAllCurrenciesAsync,
} from './actions';
import { getTodos } from './selectors';

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    switchMap(() =>
      from(api.todos.loadSnapshot()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );

export const saveTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(saveTodosAsync.request)),
    switchMap(() =>
      from(api.todos.saveSnapshot(getTodos(state$.value.todos))).pipe(
        map(saveTodosAsync.success),
        catchError((message: string) => of(saveTodosAsync.failure(message)))
      )
    )
  );

export const getAllCurrenciesEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadAllCurrenciesAsync.request)),
    switchMap(() =>
      api.todos.getCurrencies().pipe(
        map(
          E.fold(
            (error) => loadAllCurrenciesAsync.failure(error),
            (currs) => loadAllCurrenciesAsync.success(currs)
          )
        )
      )
    )
  );
