import { legacy_createStore as createStore, combineReducers } from 'redux';
import boardReducer from './board/boardReducer';

const rootReducer = combineReducers({
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store