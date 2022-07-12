import {
  GET_LIST_LOGO_HE_THONG_RAP,
  GET_SYSTEMS_CINEMA,
} from "../types/CinemaManagementType";

const stateDefault = {
  systemsCinema: [],
  listLogoHeThongRap: [],
};

const CinemaManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_SYSTEMS_CINEMA: {
      return { ...state, systemsCinema: [...action.systemsCinema] };
    }
    case GET_LIST_LOGO_HE_THONG_RAP: {
      return { ...state, listLogoHeThongRap: [...action.listLogoHeThongRap] };
    }
    default:
      return { ...state };
  }
};

export default CinemaManagementReducer;
