import { API_BASE_URL, ACCESS_TOKEN } from 'constants/apiConstants';
import { PlantRecord } from 'model/plantRcord';
import { request } from 'util/redux/apiBaseUtils';

export function createPlantRecordBase(data: PlantRecordRequest): Promise<PlantRecordResponse> {
  return request({
      url: API_BASE_URL + "/api/plant_records",
      method: 'POST',
      body: JSON.stringify(data)
  });
}

export function fetchPlantRecordByUserIdBase(userId: number): Promise<PlantRecordResponse[]> {
  return request({
      url: API_BASE_URL + "/api/plant_records/users/" + userId,
      method: 'GET',
  });
}

export type PlantRecordResponse = PlantRecord

export type PlantRecordRequest = {
  title: string,
  placeId: number
}