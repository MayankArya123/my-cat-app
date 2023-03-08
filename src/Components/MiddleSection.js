import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, getCat } from "../Reducer/reducer";
import { IncrementClick, Loading } from "../Reducer/reducer";

const MiddleSection = () => {
  const cat = useSelector((state) => state.activeCat);
  const dispatch = useDispatch();
  console.log(cat);

  const inc = (id) => {
    dispatch(Loading(true));
    const res = dispatch(IncrementClick(cat.id));

    setTimeout(() => {
      dispatch(fetchPosts());
      //  dispatch(getCat(id))
    }, 2000);
    setTimeout(() => {
      //  dispatch(fetchPosts())
      dispatch(getCat(id));
    }, 3000);
  };

  const getAgeText = (clicks) => {


    if(clicks <= 5){
      return 'Infant'
    }
    if(clicks > 5 && clicks <= 12  ){
      return 'child'
    }
    if(clicks > 12 && clicks <= 25  ){
      return 'Young'
    }
    if(clicks > 25 && clicks <= 40  ){
      return 'Middle-Age'
    }
    if(clicks > 40 && clicks <= 60  ){
      return 'Old'
    }
    if( clicks > 60  ){
      return 'Very Old'
    }

 
  };

  return (
    <div className="middle-section">
      {cat && (
        <div class="card">
          <div className="card-info">
            <h5 className="cat-name"> {cat.name} </h5>
            <p className="p"> number of clicked : {cat.clicks} </p>
          </div>
          <img
            src={cat.pic}
            onClick={() => {
              inc(cat.id);

              // setTimeout(() => {
              //   // dispatch(fetchPosts())
              //   dispatch(getCat(cat.id));
              // }, 2000);
            }}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title"> {cat.nicknames} </h5>
            <p class="card-text"> { getAgeText(cat.clicks) }   </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleSection;
