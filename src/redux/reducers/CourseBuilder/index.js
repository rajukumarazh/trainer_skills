import { CREATE_SECTION } from "redux/action/CourseBuilder";

const initialState={
    noofbooks:0

}


export const coursebuilder = (state=initialState,action) => {
    switch(action.type){
     case CREATE_SECTION:
      return { ...state, noofbooks: state.noofbooks+1 }
      default:
        return state;
    }
}