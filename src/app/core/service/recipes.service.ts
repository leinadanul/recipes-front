import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Recipes } from "../models/recipe.model";
import { URL_RESOURCE } from "../resource/url.resource";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(URL_RESOURCE.getRecipes);
  }

  addRecipe(recipe: Recipes): Observable<void> {
    return this.http.post<void>(URL_RESOURCE.postRecipe, recipe);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{url: string}>(URL_RESOURCE.uploadImage, formData).pipe(
      map(response => response.url)
    );
  }

  deleteRecipe(recipeId: string): Observable<void>{
    const Url = `${URL_RESOURCE.deleteRecipe}/${recipeId}`;
    return this.http.delete<void>(Url);
  }

  createRecipeWithImage(recipe: Recipes, file: File | null): Observable<void> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap((url: string) => {
          recipe.imageUrl = url;
          return this.addRecipe(recipe);
        })
      );
    } else {
      return this.addRecipe(recipe);
    }
  }
  updateRecipe(recipeId: string, recipe: Recipes): Observable<void> {
    const Url = `${URL_RESOURCE.updateRecipe}/${recipeId}`;
    return this.http.put<void>(Url, recipe);
  }

  updateRecipeWithImage(recipeId: string, recipe: Recipes, file: File | null): Observable<void> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap((url: string) => {
          recipe.imageUrl = url;
          return this.updateRecipe(recipeId, recipe);
        })
      );
    } else {
      return this.updateRecipe(recipeId, recipe);
    }
  }
}
