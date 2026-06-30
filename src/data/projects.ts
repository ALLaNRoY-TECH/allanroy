import { securescan } from "@/content/projects/securescan";
import { subsense } from "@/content/projects/subsense";
import { ventpod } from "@/content/projects/ventpod";
import { hostelCms } from "@/content/projects/hostel-cms";
import { CaseStudy, ProjectId } from "@/types/case-study";

export const getCaseStudy = (id: ProjectId): CaseStudy | undefined => {
  switch (id) {
    case "securescan":
      return securescan;
    case "subsense":
      return subsense;
    case "ventpod":
      return ventpod;
    case "hostel-cms":
      return hostelCms;
    default:
      return undefined;
  }
};
