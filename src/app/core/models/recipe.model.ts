export interface Recipes{

  id: string;
  name: string;
  description: string;
  ingredients : [];
  preparationTime : number;
  imageUrl: string;
  instructions: string;
  recipeType : recipeType
}

export enum recipeType{
  Normal ="NORMAL",
  Vegan ="VEGAN",
  Light = "LIGHT"
}
