import React, { FC, useState } from "react";
import { countryType } from "../../../types/Country";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { selectCountry } from "../../../Store/Slices/CountriesSlice";


type Props = {
  index: number,
  country: countryType
}

export const Country: React.FC<Props> = ({ index, country }) => {
  const dispatch = useDispatch()

  const selectedCountry = useSelector((state: RootState) => state.countriesReducer.selectedCountry)


  const colors = ['table-primary', 'table-secondary', 'table-success', 'table-danger', 'table-warning', 'table-info'];


  const onSelectedCountry = (index: number) => {
    dispatch(selectCountry(index === selectedCountry ? null : index))
  };

  return (
    <tr key={index}
      className={cn('', { [colors[index % colors.length]]: selectedCountry === index })}
      onClick={() => onSelectedCountry(index)}
    >
      <td>{country.name}</td>
      <td>{country.native}</td>
      <td>{country.capital}</td>
      <td>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.code}>{lang.name}</li>
          ))}
        </ul>
      </td>
    </tr>
  )
}