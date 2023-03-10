import React , {useEffect, useState} from 'react';
import { MenuItem , FormControl , Select , Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'; 
import {sortData} from './util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry]= useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect( () =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) =>{
      setCountryInfo(data);
  });
 },[] );

  useEffect(() => {
    // The code inside here run once when the component loads and also when the country variable changes
    //async - > send a request , wait for it , do something with data

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((countr)=> (
          {
            name: countr.country,
            value: countr.countryInfo.iso2
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange =async (event) =>{
    const countryCode =event.target.value;
    const url = 
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };
  return (
    <div className="app">
       <div className='app__left'>
        <div className="app__header">
          <h1>Use Of Variant attribute in select tag in react</h1>






          
          <FormControl className='app_dropdown'>
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {console.log(country)}
              <MenuItem value="worldwide ">worldwide</MenuItem>
              {
              countries.map(countr =>(
              <MenuItem value={countr.value}>{countr.name}</MenuItem>
              )
              )
              }
              </Select>
              </FormControl>  




      </div>
      <div className='app__stats'>
        <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        
      </div>
      <Map/>
    </div>
    <Card className='app__right'>
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}/>
        <h3>Worldwide new cases</h3>
        {/* Graph */}
      </CardContent>
    </Card>
    </div>
  );
}

export default App;
