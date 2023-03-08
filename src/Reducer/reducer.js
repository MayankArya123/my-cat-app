import { createSlice,current } from "@reduxjs/toolkit";
import { db, firebase } from "../Firebase";
import { nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cats",
  initialState: {
    cats: [],
    activeCat: null,
    reload: false,
    loading:false
  },
  reducers: {
    getCat: (state, action) => {
      console.log("hh", action.payload);
// console.log(current(state.cats))
      const FilteredCat = current(state.cats).filter(
        (item) => item.id === action.payload
      );
      console.log(FilteredCat);
      state.activeCat = FilteredCat[0];
    },
    Loading:(state,action)=>{
         state.loading = true
    },
    // increment: (state) => {
    //   console.log("ll");
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   //   state.value += 1
    // },
    name: (state,action) => {
      console.log(action.payload,state.activeCat)
      state.activeCat.name=action.payload
    },
    pic: (state, action) => {
      console.log(action.payload,state.activeCat)
      state.activeCat.pic = action.payload;
    },
    nickNames: (state, action) => {
      state.activeCat.nicknames = action.payload;
    },
    count: (state, action) => {
      state.activeCat.clicks =   action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        console.log("p");
        // state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        console.log("kk", action.payload);
        state.cats = action.payload;
        state.loading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("p");
        // state.status = "failed";
        // state.error = action.error.message;
      })
      // .addCase(IncrementClick.fulfilled, (state, action) => {
      //   // We can directly add the new post object to our posts array
      //   console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkk',action)
      //   // state.reload = !state.reload;
    
      // })
      .addCase(addCat.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.reload = !state.reload;
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.reload = !state.reload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, getData, getCat,name,pic,count,nickNames,Loading } =
  counterSlice.actions;

export const fetchPosts = createAsyncThunk("cats/fetchPosts", async () => {

  console.log('now fecthing new')
  const r = db
    .collection("cats")
    .get()
    .then((querySnapshot) => {
      const objects = [];
      querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        objects.push(doc.data());
      });

      console.log(objects);
      return objects;
    });

  return r;
});

export const IncrementClick = createAsyncThunk(
  "cats/IncrementClick",
  async (action) => {
    console.log(action);

    
    const r =  db.collection("cats")
      .where("id", "==", action)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          doc.ref.update({
            clicks: firebase.firestore.FieldValue.increment(1),
          }).then(()=>{
            console.log('updated')

            return true
          });

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

      return r
  }
);

export const addCat = createAsyncThunk("cats/addCat", async (action) => {
  // Add a new document in collection "cities"
  db.collection("cats")
    .doc()
    .set(action)
    .then((res) => {
      console.log("Document successfully written!",res);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

export const updateCat = createAsyncThunk("cats/updateCat", async (action) => {
  // Add a new document in collection "cities"

  console.log('mayank',action)

  db.collection("cats")
  .where("id", "==", action.id)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      doc.ref.update(action).then((res)=>{
        console.log('doc updated')
      });
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
});

export default counterSlice.reducer;
