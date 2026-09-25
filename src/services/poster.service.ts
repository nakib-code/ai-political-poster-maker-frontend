import api from "@/lib/api";
import type {
  CreatePosterPayload,
  Poster,
  PosterListResponse,
  PosterSingleResponse,
} from "@/types/poster";

export const getPosters = async (): Promise<Poster[]> => {
  const response =
    await api.get<PosterListResponse>("/posters");

  return response.data.data;
};

export const getPoster = async (
  id: string
): Promise<Poster> => {
  const response =
    await api.get<PosterSingleResponse>(
      `/posters/${id}`
    );

  return response.data.data;
};

export const createPoster = async (
  payload: CreatePosterPayload
): Promise<Poster> => {
  const response =
    await api.post<PosterSingleResponse>(
      "/posters",
      payload
    );

  return response.data.data;
};

export const regeneratePoster = async (
  id: string
): Promise<Poster> => {
  const response =
    await api.post<PosterSingleResponse>(
      `/posters/${id}/regenerate`
    );

  return response.data.data;
};