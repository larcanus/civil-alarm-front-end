import { FiltersModel } from "./filters.model";

export interface User {
  email: string;
  token: string;
  name: string;
  filters: FiltersModel;
  password:string;
}
