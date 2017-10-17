import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../core/session.service";
import {RestService} from "../../core/rest.service";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user;
  recipes : any= [];
  recipe: any ={
    id: '',
    name: '',
    url: '',
    ingredients: [],
    userId: '',
    description: ''
  };
  isAddedButtonEnabled;

  constructor(private sessionService: SessionService,
              private restService: RestService) {
    this.isAddedButtonEnabled = false;
  }

  ngOnInit() {
    this.user = this.sessionService.getCurrentUser();
    this.getRecipes(this.user.id);
  }

  addIngredient() {
    this.recipe.ingredients.push({
      name : '',
      amount: ''
    });
  }

  sendRecipe(){
    console.log(JSON.stringify(this.recipe));
    this.restService.addNewRecipe(JSON.stringify(this.recipe))
        .switchMap((resp: any) => {
          this.recipe.id = resp.id;
          console.log(JSON.stringify(this.recipe.ingredients));
          return this.restService.addIngredients((JSON.stringify(this.recipe.ingredients)));
        })
        .subscribe((respons: any) =>{
          const array = respons.ingredients;
          for(let i= 0 ; i<array.length;i++){
            const obj = {
              "ingredient_id": array[i].id,
              "ingredient_quantity": this.recipe.ingredients[i].amount,
              "recipe_id": this.recipe.id
            }
            return this.restService.addRecipeIngredientsRecord(JSON.stringify(obj)).subscribe(
                () => console.log("Dziala recipeingredientsRecord")
            );
          }
          this.getRecipes(this.user.id)

        },
            ()=>{},
            ()=> location.reload());
    // console.log((JSON.stringify(this.recipe.ingredients)))
  }

  getRecipes(id){
    this.restService.getUserRecipes(id)
        .subscribe(
            (data: any) => {
              let obj = data;
              for(let recipe of obj){
                recipe.description = recipe.opis;
                recipe.name = recipe.nazwa
                recipe.ingredients = [];
                console.log(recipe)
                this.recipes.push(recipe);
              }
              console.log(this.recipes)
              this.getIngredientsQuantity();
            },

        );
  }

  getIngredientsQuantity() {
      for (let recipe of this.recipes) {
          this.restService.getIngridientsQuantity(recipe.id)
              .subscribe(
                  (data: any) => {
                      for (let i = 0; i < data.length; i++) {
                          const obj = {
                              id: data[i].ingredient_id,
                              amount: data[i].ingredient_quantity,
                              name:  ''
                          }
                          recipe.ingredients.push(obj);
                      }
                  },
                  ()=>{},
                  ()=>this.getIngredientsName()
              );
          }
  }
    getIngredientsName(){
      for(let recipe of this.recipes){
          console.log(recipe);
          console.log( recipe.ingredients.length);

          for(let i =0; i<  recipe.ingredients.length; i++) {
              console.log('id ingr');
              console.log(recipe.ingredients[i].id);
              this.restService.getIngredientsName(recipe.ingredients[i].id)
                  .subscribe((data: any) => {
                      console.log(data)
                      recipe.ingredients[i].name = data[0].nazwa;
                      console.log(recipe.ingredients);
                  });
          }
      }
  }
  }



