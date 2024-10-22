import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authentication: {},
  slots: {},
  internet: true,
  temp_regid: "",
  temp_data: {},
  temp_add: {},
  step1Data: {},
  step2Data: {
    state: "Tamil nadu",
    country: "India",
  },
  step3Data: {},
  user_name: "",
  activityPayload: { filterBy: [], orderBy: "ASC" },
  depenUserDetails: {},
  availslot: [],
  type: "",
  select_data: {},
  rs: 0,
  fcm_token: "",
  slotsCount: {},
};

const App = createSlice({
  name: "patienApp",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.authentication = action.payload?.userdata;
    },
    setinternetstatus: (state, action) => {
      state.internet = action.payload?.internet;
    },
    settemp_regid: (state, action) => {
      state.temp_regid = action.payload?.id;
      state.temp_data = action.payload.temp_data;
    },
    setUsername: (state, action) => {
      state.user_name = action.payload;
    },
    settemp_add: (state, action) => {
      state.temp_add = action.payload?.address;
    },
    step1Red: (state, action) => {
      console.log(action, "action disoatc");
      state.step1Data = action?.payload;
    },
    step2Red: (state, action) => {
      console.log(action, "step 2 action");
      state.step2Data = action?.payload;
    },
    step3Red: (state, action) => {
      state.step3Data = action?.payload;
    },
    clear: (state, action) => {
      state.drawyer = false;
      state.fcm_token = "";
      state.step1Data = {};
      state.step2Data = {};
      state.step3Data = {};
    },
    setActivityPayload: (state, { payload }) => {
      console.log(payload, "filters payload");
      state.activityPayload.filterBy.push(payload?.filterBy);
    },
    setSortBy: (state, action) => {
      console.log(action, "kdbc s jnj paload");
      state.activityPayload = {
        ...state.activityPayload,
        orderBy: action.payload,
      };
    },
    removeActivityPayload: (state, action) => {
      state.activityPayload = {
        filterBy: state.activityPayload.filterBy.filter((data) => {
          return data != action?.payload?.filterBy;
        }),
        orderBy: action.payload?.orderBy,
      };
    },
    clearActivityPayload: (state, action) => {
      state.activityPayload.filterBy = [];
    },
    setDepenUserDetails: (state, action) => {
      state.depenUserDetails = action.payload;
    },
    clearAuth: (state, action) => {
      return initialState;
      // console.log(state, "dedwdeed");
      // // state = {}
      // state = initialState
      // state.authentication = {};
    },
    setavailslot: (state, action) => {
      state.availslot = action?.payload?.data;
      state.rs = action?.payload?.rs;
    },
    seteditmgavailslot: (state, action) => {
      console.log(JSON.stringify(action) + " Action Hero...");
      let updated = state.availslot.map((item) => {
        if (item.Id == action?.payload?.id) {
          item.name = action?.payload?.name;
          item.filled = true;
          item.man_reg = action?.payload?.man_reg;
          return item;
        }
        return item;
      });
      state.availslot = updated;
      state.rs = state.rs - 1;
    },

    settype: (state, action) => {
      state.type = action?.payload?.type;
      state.select_data = action?.payload?.data;
    },
    setfcm: (state, action) => {
      state.fcm_token = action.payload?.fcm_token;
    },
    setSlotsCount: (state, action) => {
      state.slotsCount = action?.payload?.slotsCount;
    },
  },
});

export const {
  setAuthentication,
  clear,
  setinternetstatus,
  setSortBy,
  settemp_regid,
  settemp_add,
  step1Red,
  step2Red,
  step3Red,
  clearAuth,
  setUsername,
  setActivityPayload,
  removeActivityPayload,
  clearActivityPayload,
  setDepenUserDetails,
  setavailslot,
  seteditmgavailslot,
  settype,
  setfcm,
  setSlotsCount,
} = App.actions;

export default App.reducer;
