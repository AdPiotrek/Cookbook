import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';


@Injectable()
export class RestService {

  restUrl;

  constructor(private http: HttpClient) {
    this.restUrl = 'http://cookbook';

  }

  prepareTypedEmail(email){
    return this.http.put(this.restUrl + '/user/email',email)
  }

    registerUser(user){
      return this.http.put(this.restUrl + '/user', user);
  }

  addNewRecipe(recipe){
      return this.http.put(this.restUrl + '/recipes', recipe);
  }

  addIngredients(ingredients){
      return this.http.put(this.restUrl + '/recipes/ingredient', ingredients);
  }

  addRecipeIngredientsRecord(obj){
    return this.http.put(this.restUrl + '/recipes/recipes_ingredient', obj);
  }

  getUserRecipes(id){
    return this.http.get(this.restUrl + '/recipes/' + id)
  }

  getIngridientsQuantity(id){
    return this.http.get(this.restUrl + '/fullRecipe/' + id);
  }

  getIngredientsName(id){
    return this.http.get(this.restUrl + '/recipes/ingredient/' + id);
  }

  isGoodLogin(user) {
    return this.http.put(this.restUrl + '/checkUser',user);
  }

  logIn(user){
    return this.http.put(this.restUrl + '/loggedUser', user);
  }

}
