// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer,
// } from '@ngrx/store';

// export * from '../app.state';
export * from '../actions/task.actions';
export * from '../actions/user.actions';
export * from '../actions/board.actions';
export * from '../actions/column.actions';
export * from './task.reducer';
export * from './user.reducer';
export * from './board.reducer';
export * from './column.reducer';

// import { environment } from '../../../environments/environment';
// import { taskReducer } from './task.reducer';

// export interface State {
// }

// export const reducers: ActionReducerMap<State> = {
//   [TASKS]: taskReducer,
// };


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
