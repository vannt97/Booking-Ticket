import movieManagerService from "../../services/MovieManagerService";
import { STATUS_CODE } from "../../util/SystemSetting/SystemSetting";
import { GET_LIST_BANNER } from "../types/CarouselType";
export const getListBaner = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await movieManagerService.getListBannerService();
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_LIST_BANNER,
          listBanner: data.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
