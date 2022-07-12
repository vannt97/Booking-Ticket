import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import { getListMovie } from "../../redux/actions/MovieManagementAction";
import RSlick from "./RSlick/RSlick";
import { getSystemCinema } from "../../redux/actions/CinemaManagementAction";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
export default function Home() {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.MovieManagementReducer);
  const { systemsCinema } = useSelector(
    (state) => state.CinemaManagementReducer
  );
  useEffect(() => {
    dispatch(getListMovie());
    dispatch(getSystemCinema());
  }, []);
  return (
    <>
      <HomeCarousel />
      <div className="container mx-auto">
        {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto"></div>
      </section> */}
        <RSlick listMovie={listMovie} />
      </div>
      <div
        className="bg-gray-200 bg-opacity-25 py-10"
        style={{ minHeight: 650 }}
      >
        <div className="container mx-auto">
          <HomeMenu systemsCinema={systemsCinema} />
        </div>
      </div>
    </>
  );
}
