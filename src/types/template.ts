export type OccasionType =
  | "VICTORY_DAY"
  | "CONDOLENCE"
  | "CAMPAIGN"
  | "GREETING"
  | "FESTIVAL";

export interface TemplateLayoutConfig {
  width: number;
  height: number;
  photoSlots: number;
  textSlots: string[];
  colors: string[];
}

export interface Template {
  _id: string;
  title: string;
  occasionType: OccasionType;
  thumbnailUrl: string;
  backgroundUrl: string;
  layoutConfig: TemplateLayoutConfig;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateListResponse {
  success: boolean;
  message: string;
  data: Template[];
}

export interface TemplateSingleResponse {
  success: boolean;
  message: string;
  data: Template;
}