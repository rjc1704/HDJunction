import dummy from '../postDummy.json';
import { createSlice } from '@reduxjs/toolkit';

interface IPost {
  id: number;
  header: string;
  body: string;
  xValue: number;
  yValue: number;
  isModi?: boolean;
}

interface IBoard {
  id: number;
  title: string;
  postList: IPost[];
}

interface IState {
  boardList: IBoard[];
  selectedId: number;
  selectedPostId: number;
}

interface IPayload {
  payload: {
    id: number;
  };
}

interface IPosts {
  payload: {
    xValue: number;
    yValue: number;
    isModi?: boolean;
  };
}

interface ITitle {
  payload: {
    title: string;
  };
}

interface IHeader {
  payload: {
    id: number;
    header: string;
  };
}

interface IBody {
  payload: {
    id: number;
    body: string;
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
        id: state.boardList[state.selectedId].postList.length,
        header: 'New Post Header',
        body: '',
        xValue: action.payload.xValue,
        yValue: action.payload.yValue,
        isModi: action.payload.isModi,
      });
    },
    changeTitle(state, action: ITitle) {
      state.boardList[state.selectedId].title = action.payload.title;
    },
    changeHeaderTitle(state, action: IHeader) {
      state.boardList[state.selectedId].postList[action.payload.id].header = action.payload.header;
    },
    changeBodyText(state, action: IBody) {
      state.boardList[state.selectedId].postList[action.payload.id].body = action.payload.body;
    },
  },
});

export const { addBoard, selectBoard, addPost, changeTitle, changeHeaderTitle, changeBodyText } = boardReducer.actions;
export default boardReducer.reducer;
