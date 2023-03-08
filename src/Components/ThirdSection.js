import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, fetchPosts, getCat } from "../Reducer/reducer";
import { firebase, storage } from "../Firebase";
import { addCat, updateCat } from "../Reducer/reducer";
import { uuid } from "uuidv4";
import { name, pic, nickNames, count } from "../Reducer/reducer";

const ThirdSection = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, seteditOpen] = useState(false);
  const activeCat = useSelector((state) => state.activeCat);
  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState("");
  const [newCatNickNames, setNewCatNickNames] = useState("");

  console.log("c", activeCat);
  useEffect(() => {
    if (activeCat) {
      console.log("ll");
    }
  }, []);

  const dispatch = useDispatch();

  const setImage = (e) => {
    console.log("image", e.target.files[0]);
    if (!e.target.files[0]) {
      return alert("enter the image");
    } else {
      imageUpload(e.target.files[0]);
    }
  };
  const imageUpload = (file) => {
    // Create a storage reference from our storage service
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("catsImages").put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setNewCatImage(downloadURL);
          dispatch(pic(downloadURL));
        });
      }
    );
  };

  const submitDetails = (e) => {
    e.preventDefault();
    console.log("kk");

    if (!newCatName) {
      return alert("please enter the name");
    }
    if (!newCatImage) {
      return alert("please select the image ");
    }
    if (!newCatNickNames) {
      return alert("please enter the nicknames");
    }

    const newCat = {
      name: newCatName,
      clicks: 0,
      nicknames: newCatNickNames,
      pic: newCatImage,
      id: "id" + new Date().getTime(),
    };

    dispatch(addCat(newCat));

    setTimeout(() => {
      dispatch(getCat(newCat.id));
    }, 1000);

    setOpen(false);
  };

  const updateDetails = (e) => {
    e.preventDefault();
    console.log("kk");

    if (!activeCat.name) {
      return alert("please enter the name");
    }
    if (!activeCat.pic) {
      return alert("please select the image ");
    }
    if (!activeCat.clicks) {
      return alert("please enter the number of clicks ");
    }
    if (!activeCat.nicknames) {
      return alert("please enter the nicknames");
    }

    console.log(typeof activeCat.clicks);

    const newCat = {
      name: activeCat.name,
      clicks: parseInt(activeCat.clicks),
      nicknames: activeCat.nicknames,
      pic: activeCat.pic,
      id: activeCat.id,
    };

    dispatch(updateCat(newCat));
    setTimeout(() => {
      dispatch(fetchPosts());
      seteditOpen(false);
      //  dispatch(getCat(id))
    }, 2000);
    setTimeout(() => {
      //  dispatch(fetchPosts())
      dispatch(getCat(activeCat.id));

    }, 3000);
  
  };

  useEffect(() => {
    //   dispatch(fetchPosts())
  }, []);

  return (
    <div className="third-section">
      <button
        class="btn btn-info add-new-btn"
        onClick={() => {
          seteditOpen(false);
          setOpen(true);
          setNewCatName("");
          setNewCatImage("");
          setNewCatNickNames("");
        }}
      >
        {" "}
        add new cat{" "}
      </button>
      <button
        class="btn btn-info edit-btn"
        onClick={() => {
          seteditOpen(true);
          setOpen(false);
        }}
      >
        {" "}
        edit cat{" "}
      </button>

      {open && (
        <form>
          <div className="add-form-header">
            <h6> Add new cat </h6>
            <button className="close-btn" onClick={() => setOpen(false)}>
              {" "}
              <span aria-hidden="true">&times;</span>{" "}
            </button>
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              cat Name
            </label>
            <input
              type="name"
              class="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => setNewCatName(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              cat Image
            </label>
            <div class="mb-3">
              <label for="formFile" class="form-label">
                Default file input example
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setImage(e)}
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              nicknames
            </label>
            <input
              name="nicknames"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="enter nicknames in comma"
              onChange={(e) => setNewCatNickNames(e.target.value)}
            />
          </div>
          <button type="submit" onClick={submitDetails} class="btn btn-primary">
            Submit
          </button>
        </form>
      )}

      {editOpen && activeCat && (
        <form>
          <div className="edit-form-header">
            <button
              className="close-btn edit-cls-btn "
              type="button"

              aria-label="Close"
              onClick={() => seteditOpen(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              cat Name
            </label>
            <input
              type="name"
              value={activeCat?.name}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => dispatch(name(e.target.value))}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              cat Image
            </label>
            <div class="mb-3">
              <label for="formFile" class="form-label">
                selectedImage : {activeCat.pic?  'default selected previously' : ''}
              </label>

              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setImage(e)}
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="mb-3">
              <label for="formFile" class="form-label">
                count clicks
              </label>

              <input
                class="form-control"
                type="number"
                value={activeCat?.clicks}
                onChange={(e) => dispatch(count(e.target.value))}
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              nicknames
            </label>
            <input
              name="nicknames"
              class="form-control"
              id="exampleInputPassword1"
              value={activeCat?.nicknames}
              placeholder="enter nicknames in comma"
              onChange={(e) => dispatch(nickNames(e.target.value))}
            />
          </div>
          <button type="submit" onClick={updateDetails} class="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ThirdSection;
