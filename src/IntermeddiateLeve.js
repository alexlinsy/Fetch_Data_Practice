import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const IntermeddiateLeve = () => {
  const [locations, setLocations] = useState([]);
  function getData() {
    fetch("https://randomuser.me/api?results=20")
      .then((res) => res.json())
      .then((res) => {
        const flattenLocations = [];
        res.results.forEach((user) => {
          const { location } = user;
          flattenLocations.push(FlattenData(location));
        });
        return flattenLocations;
      })
      .then((flattenLocations) => setLocations(flattenLocations))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  function getFlattenHeader() {
    const headers = [];
    if (typeof locations[0] === "object") {
      Object.keys(locations[0]).forEach((header) => {
        headers.push(header);
      });
    }
    return headers;
  }

  function FlattenData(location) {
    let flattenLocations = {};
    const { street, city, state, country, postcode } = location;

    flattenLocations = {
      ...flattenLocations,
      streetNumber: street.number,
      streetName: street.name,
      city: city,
      state: state,
      country: country,
      postcode: postcode
    };

    return flattenLocations;
  }

  function handleSort(header) {
    const sortedLocations = [...locations];

    sortedLocations.sort(function compare(a, b) {
      if (a[header] < b[header]) {
        return -1;
      }
      if (a[header] > b[header]) {
        return 1;
      }
      return 0;
    });
    setLocations(sortedLocations);
  }

  console.log(locations);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {getFlattenHeader().map((header) => (
              <th key={uuidv4()} onClick={() => handleSort(header)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => {
            return (
              <tr key={uuidv4()}>
                {Object.keys(location).map((item) => (
                  <td key={uuidv4()}>{location[item]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IntermeddiateLeve;
