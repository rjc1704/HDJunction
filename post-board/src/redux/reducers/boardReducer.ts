import dummy from '../postDummy.json';
import { createSlice } from '@reduxjs/toolkit';

interface IPost {
  header: string;
  body: string;
  xValue: number;
  yValue: number;
}

interface IBoard {
  id: number;
  title: string;
  postList: IPost[];
}

interface IState {
  boardList: IBoard[];
  selectedId: number;
}

// interface IPayload {
//   payload: {
//     id: number;
//     title: string;
//     postList: IPost[];
//   };
// }

interface IPayload {
  payload: {
    id: number;
  };
}

interface IPosts {
  payload: {
    xValue: number;
    yValue: number;
  };
}

interface ITitle {
  payload: {
    title: string;
  };
}

const boardReducer = createSlice({
  name: 'boardReducer',
  initialState: dummy as IState,
  reducers: {
    addBoard(state) {
      state.boardList.push({
        id: state.boardList[state.boardList.length - 1].id + 1,
        title: 'New Board',
        postList: [],
      });
    },
    selectBoard(state, action: IPayload) {
      state.selectedId = action.payload.id;
    },
    addPost(state, action: IPosts) {
      state.boardList[state.selectedId].postList.push({
        header: 'New Post Header',
        body: '',
        xValue: action.payload.xValue,
        yValue: action.payload.yValue,
      });
    },
    changeTitle(state, action: ITitle) {
      state.boardList[state.selectedId].title = action.payload.title;
    },
  },
});

export const { addBoard, selectBoard, addPost, changeTitle } = boardReducer.actions;
export default boardReducer.reducer;
