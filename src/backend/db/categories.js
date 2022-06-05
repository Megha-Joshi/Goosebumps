import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Haunted",
  },
  {
    _id: uuid(),
    categoryName: "Mysterious",
  },
  {
    _id: uuid(),
    categoryName: "Abandoned",
  },
];
