import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';  


export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: "edit-user/:userId", component: EditUserComponent },
    { path: 'edit-recipe/:recipeId', component: EditRecipeComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'create-recipe', component: CreateRecipeComponent},
    { path: "favorites/:userId", component: FavoriteListComponent}
];
