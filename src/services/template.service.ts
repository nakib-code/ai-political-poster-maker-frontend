import api from "@/lib/api";
import type {
  Template,
  TemplateListResponse,
  TemplateSingleResponse,
} from "@/types/template";

export const getTemplates = async (): Promise<Template[]> => {
  const response = await api.get<TemplateListResponse>(
    "/templates"
  );

  return response.data.data;
};

export const getTemplate = async (
  id: string
): Promise<Template> => {
  const response = await api.get<TemplateSingleResponse>(
    `/templates/${id}`
  );

  return response.data.data;
};