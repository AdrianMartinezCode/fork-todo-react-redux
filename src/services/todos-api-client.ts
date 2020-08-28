import { Todo, Currency } from 'MyModels';
import { Observable } from 'redux';
import * as E from 'fp-ts/lib/Either';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as A from 'fp-ts/lib/Array';
import { getCurrencyFromApiResponse } from './mappers/currencies.mappers';

let todos: Todo[] = [
  { id: '0', title: `Yo, your snapshot has been loaded successfully!` },
];

//const API_KEY = 'XXX';

export function loadSnapshot(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  });
}

export function saveSnapshot(data: Todo[]): Promise<undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      todos = data;
      resolve();
    }, 500);
  });
}

export function getCurrencies(): Observable<E.Either<Error, Currency[]>> {
  return ajax
    .get('https://rest.coinapi.io/v1/assets', {
      'X-CoinAPI-Key': '172F1445-108C-42BA-AC64-FB20DE6DA972',
    })
    .pipe(
      map((res) => res.response as any[]),
      map(A.map((elem) => getCurrencyFromApiResponse(elem))),
      map((currs) => E.right(currs)),
      catchError((err) => of(E.left(new Error(JSON.stringify(err)))))
    );
}
