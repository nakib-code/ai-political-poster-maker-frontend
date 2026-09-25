export type PosterStatus =
  | "GENERATING"
  | "COMPLETED"
  | "FAILED";

export interface Poster {
  _id: string;
  userId: string;
  templateId: string;

  name: string;
  designation?: string;
  organization?: string;

  union?: string;
  thana?: string;
  district?: string;

  occasion: string;
  headline: string;

  photoUrls: string[];

  status: PosterStatus;
  generatedImageUrl?: string;

  generationCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface PosterListResponse {
  success: boolean;
  message: string;
  data: Poster[];
}

export interface PosterSingleResponse {
  success: boolean;
  message: string;
  data: Poster;
}

export interface CreatePosterPayload {
  templateId: string;
  name: string;
  designation?: string;
  organization?: string;
  union?: string;
  thana?: string;
  district?: string;
  occasion: string;
  headline: string;
  photoUrls?: string[];
}