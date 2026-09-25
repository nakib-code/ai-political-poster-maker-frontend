"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/auth.service";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
};