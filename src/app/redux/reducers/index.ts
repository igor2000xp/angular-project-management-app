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
export * from './task.reducer';
export * from './user.reducer';

// import { environment } from '../../../environments/environment';
// import { taskReducer } from './task.reducer';

// export interface State {
// }

// export const reducers: ActionReducerMap<State> = {
//   [TASKS]: taskReducer,
// };


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
