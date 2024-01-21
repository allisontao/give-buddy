import axios from "axios";
import { API_URL } from "../constants/url";
import { useNavigate } from 'react-router-dom';

import { useGiveBuddyStore } from '../store/store';

export const getCharities = () => {
  axios
    .get(`${API_URL}/charities/`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const getUserInfo = () => {
  axios
    .get(`${API_URL}/user_info`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}