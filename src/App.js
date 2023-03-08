import "./App.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MiddleSection from "./Components/MiddleSection";
import ThirdSection from "./Components/ThirdSection";
import Sidebar from "./Components/Sidebar";
import ImageGallery from "./Components/ImageGallery";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./Reducer/reducer";
import { getCat } from "./Reducer/reducer";

function App() {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reload);
  const {cats,activeCat} = useSelector((state) => state);

  // //preloaded cat




  useEffect(() => {

    dispatch(fetchPosts());
  }, [reload]);

  return (
    <div className="App">
      <div className="row upper-section">
        <div className="col-lg-3 col-12 col-sm-6">
          <Sidebar />
        </div>
        <div className="col-lg-5 col-12 col-sm-6">
          <MiddleSection cat={cats} activeCat={activeCat} />
        </div>
        <div className="col-lg-4 col-12">
          <ThirdSection />
        </div>
      </div>
      <ImageGallery />
    </div>
  );
}

export default App;
