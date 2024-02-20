import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryType } from "../../types/Country";
import { GET_CHARACTERS } from "../../graphql/queries/countries";
import { client } from "../../apollo";

type initialStateType = {
  countries: countryType[],
  selectedCountry: null | number
  filteredCountries: countryType[]
}

const initialState: initialStateType = {
  countries: [],
  selectedCountry: null,
  filteredCountries: []
}

export const getCountriesByQl = createAsyncThunk(
  'getCountries',
  async () => {
    try {
      const { data } = await client.query({
        query: GET_CHARACTERS
      });

      const countries = data.countries;

      return countries;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    getCountries: (state, action: PayloadAction<countryType[]>) => {
      state.countries = action.payload
    },
    filterBySearch: (state, action: PayloadAction<string>) => {
      state.filteredCountries = state.countries.filter((country: countryType) => country.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()))
    },
    selectCountry: (state, action: PayloadAction<number | null>) => {
      state.selectedCountry = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountriesByQl.fulfilled, (state, action: PayloadAction<countryType[]>) => {
        state.countries = action.payload;
        state.filteredCountries = action.payload
      });
  }
});

export const { getCountries, filterBySearch, selectCountry, } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
