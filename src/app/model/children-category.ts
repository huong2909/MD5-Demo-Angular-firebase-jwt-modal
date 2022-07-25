import {ParentCategory} from "./parent-category";

export interface ChildrenCategory {
  id?: number;
  name?: string;
  parentCategory?: ParentCategory
}
