/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BusRoute } from '../../../../../types/routes';
import { Bus } from '../../../../../types/buses';

type initialStateType = {
  loading: boolean;
  data: BusRoute[];
  error: string;
  getSpecificBusRoute: {
    loadingSpecificBusRoute: boolean;
    busrouteData?: BusRoute;
    errorSpecificBusRoute: string;
  };
  getBuses: {
    loading: boolean;
    data: Bus[];
    error: string;
  };
};

const initialState: initialStateType = {
  loading: false,
  data: [],
  error: '',
  getSpecificBusRoute: {
    loadingSpecificBusRoute: false,
    busrouteData: undefined,
    errorSpecificBusRoute: ''
  },
  getBuses: {
    loading: false,
    data: [],
    error: ''
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

export const getAllBuses = createAsyncThunk(
  'home/getAllBuses',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getAllBuses(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }

    return response.data.buses;
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

    builder.addCase(getAllBuses.pending, (state) => {
      state.getBuses.loading = true;
    });
    builder.addCase(getAllBuses.fulfilled, (state, action) => {
      state.getBuses.loading = false;
      state.getBuses.data = action.payload;
      state.getBuses.error = '';
    });
    builder.addCase(getAllBuses.rejected, (state, action) => {
      state.getBuses.loading = false;
      state.getBuses.error = action.payload as string;
    });
  }
});

export const { clearBusRoutes } = busroutesSlice.actions;

export default busroutesSlice.reducer;
