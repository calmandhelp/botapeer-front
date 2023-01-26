import { API_BASE_URL } from "constants/apiConstants";
import { Place } from "model/place";
import { request } from "./apiBaseUtils";

export function fetchPlaceBase(): Promise<PlaceResponse> {
  return request({
      url: API_BASE_URL + "/api/places",
      method: 'GET',
  });
}

export type PlaceResponse = Place