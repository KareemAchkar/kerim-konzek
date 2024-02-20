import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './CountryList.scss';
import { Country } from './Country/Country';
import { countryType } from '../../types/Country';
import { useDispatch, useSelector } from 'react-redux';
import { filterBySearch, selectCountry } from '../../Store/Slices/CountriesSlice';
import { RootState } from '../../Store/Store';
import { debounce } from 'lodash';


export const CountryList = () => {
  const dispatch = useDispatch()
  const filteredCountries = useSelector((state: RootState) => state.countriesReducer.filteredCountries || [])
  const [querySearch, setQuerySearch] = useState('');

  const debounceDispatch = useCallback(
    debounce((value: string) => dispatch(filterBySearch(value)), 500),
    [dispatch]
  );

  const onQuerySearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuerySearch(e.target.value)
    debounceDispatch(e.target.value);
  };

  const selectItem = useCallback(() => {
    if (querySearch && filteredCountries.length > 10) {
      dispatch(selectCountry(9)); 
    } else if (filteredCountries.length > 0) {
      dispatch(selectCountry(filteredCountries.length - 1)); 
    } else {
      dispatch(selectCountry(null));
    }
  }, [filteredCountries]);

  useEffect(() => {
    selectItem();
  }, [filteredCountries, selectItem]);

  return (
    <div>
      <h1>Countries</h1>

      <div className="input-group mb-3">
        <input
          autoSave='off'
          type="text"
          onChange={onQuerySearch}
          value={querySearch}
          placeholder='Search Country'
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Native Name</th>
            <th>Capital</th>
            <th>Languages</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country: countryType, index: number) => (
            <Country
              key={index}
              country={country}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryList;