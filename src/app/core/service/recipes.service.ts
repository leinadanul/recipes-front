import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipes } from "../models/recipe.model";
import { URL_RESOURCE } from "../resource/url.resource";


@Injectable({
  providedIn: 'root'
})
export class RecipesService{

  constructor(private http: HttpClient){}
  getAllRecipes(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(URL_RESOURCE.getRecipes)
  }


}
