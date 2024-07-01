import { Variant } from "@prisma/client";

export interface HostelBody {
  name: string;
  genderType: string;
  distance: number;
  location: string | undefined;
  year: string;
  rooms: [];
  variant : Variant
}
