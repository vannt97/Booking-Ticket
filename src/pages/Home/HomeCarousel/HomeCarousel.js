import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListBaner } from "../../../redux/actions/CarouselAction";
import "./HomeCarousel.css";
const contentStyle = {
  height: "650px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundColor: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100% 100% ",
  backgroundRepeat: "no-repeat",
};
export default function HomeCarousel(props) {
  const dispatch = useDispatch();
  const { listBanner } = useSelector((state) => state.CarouselReducer);

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  useEffect(() => {
    dispatch(getListBaner());
  }, []);
  const renderCarousel = () => {
    return listBanner?.map((banner, index) => {
      return (
        <div key={index}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${banner.hinhAnh})`,
            }}
          ></div>
        </div>
      );
    });
  };
  return <Carousel afterChange={onChange}>{renderCarousel()}</Carousel>;
}
