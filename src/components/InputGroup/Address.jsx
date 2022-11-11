import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { wireEventValue } from "utils/func";
import { getCountries, getDataFromPincode } from "utils/resources";

const mandatoryFields = ["country", "country_iso_code", "pincode"];
const optionalFields = [
  "id",
  "house_number",
  "location",
  "district",
  "city_town",
  "state",
];

export default function AddressField(props) {
  const { label, value, onChange: _onChange, className, keys } = props;
  let [fields, setFields] = useState(mandatoryFields);
  const onChange = (val) => _onChange(_.pick(val, fields));
  useEffect(() => {
    // trimming fields
    let finalFields = _.clone(mandatoryFields);

    if (keys?.action && keys?.keys && Array.isArray(keys?.keys)) {
      if (keys.action === "include")
        finalFields = finalFields.concat(
          optionalFields.filter((f) => keys.keys.includes(f))
        );
      else if (keys.action === "exclude")
        finalFields = finalFields.concat(
          optionalFields.filter((f) => !keys.keys.includes(f))
        );
    } else {
      finalFields = finalFields.concat(optionalFields);
    }

    fields = finalFields;
    setFields(finalFields);
  }, [JSON.stringify(keys)]);

  // Remove extra fields
  useEffect(() => onChange(value), [fields]);

  const updateDetail = (detail) => (val) =>
    onChange({ ...(value || {}), [detail]: val });

  const [countries, setCountries] = useState();
  const handleCountryChange = (countryIso, countryList = countries) => {
    const country = countryList.find((c) => c.iso === countryIso);
    onChange({
      ...(value || {}),
      country: country.name,
      country_iso_code: countryIso,
    });
  };
  useEffect(() => {
    // Bootstrap
    const countries = getCountries();
    setCountries(countries);

    // fetching country by name, if any
    const existingCountry = countries.find((c) => c.name === value?.country);
    // Setting India as the default country
    const india = countries.find((c) => c.name.toLowerCase() === "india");
    if (india && !value?.country_iso_code && !existingCountry)
      handleCountryChange(india.iso, countries);
    else if (existingCountry)
      handleCountryChange(existingCountry.iso, countries);
  }, []);

  const [pincodeRes, setPincodeRes] = useState();
  const [isPincodeOpen, setIsPincodeOpen] = useState();
  const handlePincodeChange = (pincode) => {
    getDataFromPincode({ country: value.country_iso_code, pincode })
      .then(setPincodeRes)
      .catch(() => setPincodeRes(null));
    updateDetail("pincode")(pincode);
  };
  const applyPincodeRes = () => onChange({ ...value, ...pincodeRes });

  return (
    <>
      <label className="mx-4 block text-sm font-medium text-gray-700">{label}</label>
      <div className={`mx-4 ${className}`}>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            className="mt-1 block w-full py-2 px-7 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={wireEventValue(handleCountryChange)}
            value={value?.country_iso_code}
          >
            {countries &&
              countries.map((country) => (
                <option value={country.iso}>{country.name}</option>
              ))}
          </select>
        </div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 group-hover:pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="Pincode"
            value={value?.pincode}
            onChange={wireEventValue(handlePincodeChange)}
            onFocus={() => setIsPincodeOpen(true)}
            onBlur={() => setIsPincodeOpen(false)}
            autoComplete="off"
          />
          {isPincodeOpen && pincodeRes && (
            <div
              className="absolute top-full w-full left-0 bg-white shadow-md rounded-md hover:bg-gray-200 p-2 cursor-pointer"
              onPointerDown={applyPincodeRes}
            >
              {pincodeRes.city_town}, {pincodeRes.district}, {pincodeRes.state}
            </div>
          )}
        </div>
        {/* {fields.includes("house_number") && (
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="House no."
          onChange={wireEventValue(updateDetail("house_number"))}
          value={value?.house_number}
        />
      )}
      {fields.includes("location") && (
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="Location"
          onChange={wireEventValue(updateDetail("location"))}
          value={value?.location}
        />
      )}
      {fields.includes("city_town") && (
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="City/Town"
          onChange={wireEventValue(updateDetail("city_town"))}
          value={value?.city_town}
        />
      )} */}
        <div className="mt-1 relative rounded-md shadow-sm">
          {fields.includes("district") && (
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="District"
              onChange={wireEventValue(updateDetail("district"))}
              value={value?.district}
            />
          )}
        </div>
        <div className="mt-1 relative rounded-md shadow-sm">
          {fields.includes("state") && (
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="State"
              onChange={wireEventValue(updateDetail("state"))}
              value={value?.state}
            />
          )}
        </div>
      </div>
    </>
  );
}
