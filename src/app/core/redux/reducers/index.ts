import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

export * from '../app.state';
export * from '../actions/app.actions';
export * from '../reducers/app.reducer';

import { environment } from '../../../../environments/environment';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
