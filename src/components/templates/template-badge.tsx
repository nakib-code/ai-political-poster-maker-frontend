import type { OccasionType } from "@/types/template";

interface TemplateBadgeProps {
  occasionType: OccasionType;
}

const occasionLabels: Record<OccasionType, string> = {
  VICTORY_DAY: "Victory Day",
  CONDOLENCE: "Condolence",
  CAMPAIGN: "Campaign",
  GREETING: "Greeting",
  FESTIVAL: "Festival",
};

export default function TemplateBadge({
  occasionType,
}: TemplateBadgeProps) {
  return (
    <span className="badge badge-primary">
      {occasionLabels[occasionType]}
    </span>
  );
}