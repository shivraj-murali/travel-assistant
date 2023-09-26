import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const PlacesDetails = () => {
  const API_KEY = "50e0262f71844ccc91d0487b7b4a6c87";
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState(""); //Input Field
  const [placeId, setPlaceId] = useState(); //Placeid
  const [placeNames, setPlaceNames] = useState([]); //PLace details array

  // Function to get placeid
  const fetchPlaceDetails = async () => {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=${API_KEY}`
    );
    const id = res.data.features[0].properties.place_id;
    return id;
  };

  //Get PLace details
  async function getPlaceDetails() {
    setLoading(false);
    const data = await fetchPlaceDetails();
    console.log("enter");

    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=religion.place_of_worship&filter=place:${data}&limit=20&apiKey=${API_KEY}`
    );
    let res = await response.json();
    setPlaceNames(res.features);
    console.log(placeNames);
    setLoading(true);
  }

  return (
    <div>
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="enter place here"
      />
      <button onClick={getPlaceDetails}>Click</button>
      <br />
      {loading && <PlaceCards placeName={placeNames[2]} />}
    </div>
  );
};

function PlaceCards({ placeName }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="no-underline">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center ">
          {placeName.properties.address_line1}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
        <span className="inline font-semibold">About - </span>
        {placeName.properties.datasource.raw.description}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
        <span className="inline font-semibold">Address - </span>
        {placeName.properties.formatted}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
        <span className="inline font-semibold">Timing - </span>
        {placeName.properties.datasource.raw.opening_hours}
      </p>
      <a
        href={placeName.properties.datasource.raw.website}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline"
        target="new"
      >
        Learn more
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}

export default PlacesDetails;
