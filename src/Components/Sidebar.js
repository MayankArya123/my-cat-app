import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCat } from "../Reducer/reducer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const {cats,activeCat,loading} = useSelector((state) => state);

  console.log(cats)

  return (
    <div>
      <h4 className="h2"  >  Cats Clicker App </h4>
      <div className="cats-items">
        {cats &&
          cats.map((item) => {
            return (
              <div className={activeCat?.id === item.id ? 'info active' : 'info'} onClick={()=>dispatch(getCat(item.id))} >
                <h6>{item.name}</h6>
                <h6> { activeCat?.id === item.id ? loading ? 'wait' : item.clicks : item.clicks} </h6>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
