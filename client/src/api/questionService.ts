import client from './client';
import {
  QuestionCreateDTO,
  QuestionResponseDTO,
  QuestionUpdateDTO,
} from '../models/dto-models';

const QUESTION_URL = '/questions';

export const getQuestions = async (): Promise<QuestionResponseDTO[]> => {
  const { data } = await client.get<QuestionResponseDTO[]>(QUESTION_URL);
  return data;
};

export const getQuestionById = async (
  id: number
): Promise<QuestionResponseDTO> => {
  const { data } = await client.get<QuestionResponseDTO>(`${QUESTION_URL}/${id}`);
  return data;
};

export const createQuestion = async (
  payload: QuestionCreateDTO
): Promise<QuestionResponseDTO> => {
  const { data } = await client.post<QuestionResponseDTO>(QUESTION_URL, payload);
  return data;
};

export const createManyQuestions = async (
  payload: QuestionCreateDTO[]
): Promise<QuestionResponseDTO[]> => {
  const { data } = await client.post<QuestionResponseDTO[]>(
    `${QUESTION_URL}/many`,
    payload
  );
  return data;
};

export const updateQuestion = async (
  id: number,
  payload: QuestionUpdateDTO
): Promise<QuestionResponseDTO> => {
  const { data } = await client.put<QuestionResponseDTO>(
    `${QUESTION_URL}/${id}`,
    payload
  );
  return data;
};

export const deleteQuestion = async (id: number): Promise<void> => {
  await client.delete(`${QUESTION_URL}/${id}`);
};