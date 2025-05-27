import client from './client';
import {
  ThemeCreateDTO,
  ThemeResponseDTO,
  ThemeUpdateDTO,
  ThemeAvailabilityDTO,
} from '../models/dto-models';

const THEME_URL = '/themes';

export const getThemes = async (): Promise<ThemeResponseDTO[]> => {
  const { data } = await client.get<ThemeResponseDTO[]>(THEME_URL);
  return data;
};

export const getThemeById = async (id: number): Promise<ThemeResponseDTO> => {
  const { data } = await client.get<ThemeResponseDTO>(`${THEME_URL}/${id}`);
  return data;
};

export const createTheme = async (
  payload: ThemeCreateDTO
): Promise<ThemeResponseDTO> => {
  const { data } = await client.post<ThemeResponseDTO>(THEME_URL, payload);
  return data;
};

export const updateTheme = async (
  id: number,
  payload: ThemeUpdateDTO
): Promise<ThemeResponseDTO> => {
  const { data } = await client.put<ThemeResponseDTO>(`${THEME_URL}/${id}`, payload);
  return data;
};

export const deleteTheme = async (id: number): Promise<void> => {
  await client.delete(`${THEME_URL}/${id}`);
};

export const updateThemeAvailability = async (
  id: number,
  payload: ThemeAvailabilityDTO
): Promise<ThemeResponseDTO> => {
  const { data } = await client.patch<ThemeResponseDTO>(
    `${THEME_URL}/${id}/availability`,
    payload
  );
  return data;
};