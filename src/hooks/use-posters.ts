"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPoster,
  deletePoster,
  getPoster,
  getPosters,
  regeneratePoster,
} from "@/services/poster.service";

import type { CreatePosterPayload } from "@/types/poster";

export const usePosters = () => {
  return useQuery({
    queryKey: ["posters"],
    queryFn: getPosters,
    retry: 1,
  });
};

export const usePoster = (id: string) => {
  return useQuery({
    queryKey: ["posters", id],
    queryFn: () => getPoster(id),
    enabled: Boolean(id),
    retry: 1,
  });
};

export const useCreatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePosterPayload) =>
      createPoster(payload),

    onSuccess: (poster) => {
      queryClient.invalidateQueries({
        queryKey: ["posters"],
      });

      queryClient.setQueryData(
        ["posters", poster._id],
        poster
      );
    },
  });
};

export const useRegeneratePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      regeneratePoster(id),

    onSuccess: (poster) => {
      queryClient.setQueryData(
        ["posters", poster._id],
        poster
      );

      queryClient.invalidateQueries({
        queryKey: ["posters"],
      });
    },
  });
};

export const useDeletePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePoster(id),

    onSuccess: (_, posterId) => {
      queryClient.removeQueries({
        queryKey: ["posters", posterId],
      });

      queryClient.invalidateQueries({
        queryKey: ["posters"],
      });
    },
  });
};