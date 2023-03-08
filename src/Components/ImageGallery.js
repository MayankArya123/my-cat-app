import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  fetchPosts,
  IncrementClick,
  getCat,
} from "../Reducer/reducer";

const ImageGallery = () => {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.cats);

  //   useEffect(() => {
  //     console.log("got count", count);
  //   }, []);

  return (
    <div className="image-gallery">
      <h4 className="h2">Cats Image Gallery</h4>
      <div className="row">
        {cats &&
          cats.map((item) => {
            return (
              <div className="my-img-div col-lg-4 col-10 col-sm-4">
                <div className="details-block">
                  <h6>{item.name}</h6>
                  <h6> number of clicked : {item.clicks} </h6>
                </div>

                <div
                  className="cat-pic"
                  onClick={() => {
                    dispatch(IncrementClick(item.id));
                    setTimeout(() => {
                      dispatch(fetchPosts());
                      //  dispatch(getCat(id))
                    }, 2000);
                    setTimeout(() => {
                      //  dispatch(fetchPosts())
                      dispatch(getCat(item.id));
                    }, 3000);
                    setTimeout(() => {
                      window.scrollTo(0, 0);
                    }, 1000);
                  }}
                >
                  <img src={item.pic} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageGallery;
