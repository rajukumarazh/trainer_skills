import { resolvers } from "../api/pincode-resolvers";
import countries from "./resources/countries.json";

// Address
export const getCountries = () =>
  countries.map((c) => ({
    id: c["alpha-3"],
    name: c["name"],
    iso: c["alpha-3"],
  }));

export const getDataFromPincode = async ({ country, pincode }) => {
  return resolvers[country] && (await resolvers[country](pincode));
};
