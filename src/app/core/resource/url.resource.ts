import { environment } from "../../../environments/enviromment.develop";


export const URL_RESOURCE =
{
  getRecipes: `${environment.apiUrl}/api/recipes`,
  postRecipe: `${environment.apiUrl}/api/recipes/addRecipe`,
  uploadImage:`${environment.apiUrl}/api/recipes/upload`

}
