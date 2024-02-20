import './App.scss';
import { getCountriesByQl } from './Store/Slices/CountriesSlice';
import CountryList from './Components/CountryList/CountryList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './graphql/queries/countries';
import { AppDispatch } from './Store/Store';
import { ClipLoader } from 'react-spinners';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    dispatch(getCountriesByQl());
  }, [dispatch, data]);

  if (loading) return <div className='loader'><ClipLoader color="#000" /></div>;
  if (error) return <p>error</p>;

  return (
    <div>
      <CountryList />
    </div>
  );
}

export default App;
