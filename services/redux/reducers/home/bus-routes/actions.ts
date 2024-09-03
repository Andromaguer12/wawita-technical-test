/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AboutMeCard,
  AboutMeCardImage
} from '../../../../../typesDefs/constants/app/about-us/about-us.types';

type initialStateType = {
  loading: boolean;
  data: AboutMeCard[];
  pageInfo: any;
  error: string;
  getSpecificBusRoute: {
    loadingSpecificBusRoute: boolean;
    busrouteData?: AboutMeCard;
    errorSpecificBusRoute: string;
  };
  getBusRoutePhotos: {
    loadingPhotos: boolean;
    busroutePhotos?: AboutMeCardImage[];
    errorBusRoutePhotos: string;
  };
  getSimilarBusRoutes: {
    loadingSimilar: boolean;
    busrouteSimilar: AboutMeCard[];
    pageInfo: any;
    errorBusRouteSimilar: string;
  };
  best: {
    loading: boolean;
    data: AboutMeCard[];
    error: any | null;
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
  },
  getBusRoutePhotos: {
    loadingPhotos: false,
    busroutePhotos: undefined,
    errorBusRoutePhotos: ''
  },
  getSimilarBusRoutes: {
    loadingSimilar: false,
    busrouteSimilar: [],
    pageInfo: null,
    errorBusRouteSimilar: ''
  },
  best: {
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
    const query = await params.context.getAllBusRoutes(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

export const getBestBusRoutes = createAsyncThunk(
  'home/getBestBusRoutes',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getBestBusRoutes(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

export const getSimilarBusRoutes = createAsyncThunk(
  'home/getSimilarBusRoutes',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getSimilarBusRoutes(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

export const getAllBusRoutesPhotos = createAsyncThunk(
  'home/getAllBusRoutesPhotos',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getAllBusRoutesPhotos();
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
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
    return response;
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
      const { busroutes, ...rest } = action.payload;

      state.loading = false;
      state.data = busroutes;
      state.pageInfo = rest;
      state.error = '';
    });
    builder.addCase(getAllBusRoutes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getBestBusRoutes.pending, (state) => {
      state.best.loading = true;
    });
    builder.addCase(getBestBusRoutes.fulfilled, (state, action) => {
      state.best.loading = false;
      state.best.data = action.payload;
      state.best.error = '';
    });
    builder.addCase(getBestBusRoutes.rejected, (state, action) => {
      state.best.loading = false;
      state.best.error = action.payload as string;
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

    builder.addCase(getAllBusRoutesPhotos.pending, (state) => {
      state.getBusRoutePhotos.loadingPhotos = true;
    });
    builder.addCase(getAllBusRoutesPhotos.fulfilled, (state, action) => {
      state.getBusRoutePhotos.loadingPhotos = false;
      state.getBusRoutePhotos.busroutePhotos = action.payload;
      state.getBusRoutePhotos.errorBusRoutePhotos = '';
    });
    builder.addCase(getAllBusRoutesPhotos.rejected, (state, action) => {
      state.getBusRoutePhotos.loadingPhotos = false;
      state.getBusRoutePhotos.errorBusRoutePhotos = action.payload as string;
    });

    builder.addCase(getSimilarBusRoutes.pending, (state) => {
      state.getSimilarBusRoutes.loadingSimilar = true;
    });
    builder.addCase(getSimilarBusRoutes.fulfilled, (state, action) => {
      const { busroutes, ...rest } = action.payload;

      state.getSimilarBusRoutes.loadingSimilar = false;
      state.getSimilarBusRoutes.busrouteSimilar = busroutes;
      state.getSimilarBusRoutes.pageInfo = rest;
      state.getSimilarBusRoutes.errorBusRouteSimilar = '';
    });
    builder.addCase(getSimilarBusRoutes.rejected, (state, action) => {
      state.getSimilarBusRoutes.loadingSimilar = false;
      state.getSimilarBusRoutes.errorBusRouteSimilar = action.payload as string;
    });
  }
});

export const { clearBusRoutes } = busroutesSlice.actions;

export default busroutesSlice.reducer;
