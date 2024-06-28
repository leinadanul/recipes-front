export interface Recipes{

  name: string;
  description: string;
  ingredients : [];
  preparationTime : string;
  imageUrl: string;
  instructions: string;
  recipeType : recipeType
}

export enum recipeType{
  Normal ="NORMAL",
  Vegan ="VEGAN",
  Light = "LIGHT"
}
