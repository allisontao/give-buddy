import axios from "axios";
import { API_URL } from "../constants/url";

export const fetchCharities = () => {
  axios
    .get(`${API_URL}/charities/`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const postOnboarding = () => {
  axios
    .post(`${API_URL}/onboarding/1`, {
      "ft_ranking":1,
      "rr_ranking":3,
      "ctc_ranking":2,
      "categories":[
        "Social Services"
      ],
      "subcategories":[
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })  
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}