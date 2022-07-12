import { GET_LIST_BANNER } from "../types/CarouselType";

const stateDefault = {
  listBanner: [],
};

const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_BANNER: {
      return { ...state, listBanner: [...action.listBanner] };
    }
    default:
      return { ...state };
  }
};

export default CarouselReducer;
