/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BusRoute } from '../../../../../types/routes';

type initialStateType = {
  loading: boolean;
  data: BusRoute[];
  pageInfo: any;
  error: string;
  getSpecificBusRoute: {
    loadingSpecificBusRoute: boolean;
    busrouteData?: BusRoute;
    errorSpecificBusRoute: string;
  };
};

const initialState: initialStateType = {
  loading: false,
  data: [],
  pageInfo: null,
  error: '',
  getSpecificBusRoute: {
    loadingSpecificBusRoute: false,
    busrouteData: undefined,
    errorSpecificBusRoute: ''
  }
};

/**
 * extraReducers start
 */

export const getAllBusRoutes = createAsyncThunk(
  'home/getAllBusRoutes',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getRoutes(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }

    return response.data.routes;
  }
);

export const getBusRouteById = createAsyncThunk(
  'busroutePage/getBusRouteById',
  async (params: { context: any; busrouteId: string }, { rejectWithValue }) => {
    const query = await params.context.getBusRouteById(params.busrouteId);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response.data.getRouteById;
  }
);

/**
 * extraReducers end
 */

const busroutesSlice = createSlice({
  name: 'busroutes',
  initialState,
  reducers: {
    clearBusRoutes: (state) => {
      state.loading = initialState.loading;
      state.data = initialState.data;
      state.error = initialState.error;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBusRoutes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBusRoutes.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(getAllBusRoutes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getBusRouteById.pending, (state) => {
      state.getSpecificBusRoute.loadingSpecificBusRoute = true;
    });
    builder.addCase(getBusRouteById.fulfilled, (state, action) => {
      state.getSpecificBusRoute.loadingSpecificBusRoute = false;
      state.getSpecificBusRoute.busrouteData = action.payload;
      state.getSpecificBusRoute.errorSpecificBusRoute = '';
    });
    builder.addCase(getBusRouteById.rejected, (state, action) => {
      state.getSpecificBusRoute.loadingSpecificBusRoute = false;
      state.getSpecificBusRoute.errorSpecificBusRoute =
        action.payload as string;
    });
  }
});

export const { clearBusRoutes } = busroutesSlice.actions;

export default busroutesSlice.reducer;
