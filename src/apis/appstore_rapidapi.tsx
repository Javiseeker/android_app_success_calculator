import axios from "axios";

const KEY: string = "4f109f490cmsh770a0ae30df62a6p163b6fjsn5ebca278863b";

export default axios.create({
  baseURL: "https://gplaystore.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": KEY,
    "x-rapidapi-host": "gplaystore.p.rapidapi.com",
    Accept:'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  params: {
    lang: "en",
  },
});
