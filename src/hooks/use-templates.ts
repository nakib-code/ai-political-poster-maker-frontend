"use client";

import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/services/template.service";

export const useTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
};