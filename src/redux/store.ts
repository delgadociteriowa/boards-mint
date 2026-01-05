import { legacy_createStore as createStore } from 'redux';
import boardReducer from './board/boardReducer';

const store = createStore(boardReducer);

export default store