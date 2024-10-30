import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'recipes', component: RecipeListComponent },
];
