import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user';
import { UserComponent } from '../user/user.component';
import { UserService } from '../services/user.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../model/recipe';
import { CreateService } from '../services/create.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserComponent, RouterLink, MatCardModule, MatButtonModule, CommonModule, MatGridListModule, RecipeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{
  //user: User | null = null;
  @Input() user!: User
  constructor(private userService: UserService, 
    private CreateService: CreateService ,
    private router: Router) {}

  ngOnInit(): void {
    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    const userId = Number(localStorage.getItem('userId'));
    if (!isNaN(userId)) {
      console.log('Fetching user with ID:', userId);
      this.userService.getUser(userId).subscribe(
        (userData) => {
          console.log('User data received:', userData);
          this.user = userData;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Invalid userId from localStorage:', userId);
      this.router.navigate(['login']);
    }
    
    if (userId){

    this.CreateService.getCreated(userId).subscribe({
      next: (listOfRecipes: Recipe[]) => {
      // Ensure listOfRecipes is an array before assigning it
      if (Array.isArray(listOfRecipes)) {
        this.recipes = listOfRecipes;
      } else {
        console.error('Expected an array, but received:', listOfRecipes);
        this.recipes = []; // Ensure recipes is always an array
        }
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
        this.recipes = []; // Fallback to an empty array on error
      }
          });
        }
    }
      recipes: Recipe[] = []

  editUser(userId: number) {
    this.router.navigate(["edit-user", userId])
  }

  OverviewUsers(){
    this.router.navigate(['users'])
  }


  LogoutUser(): void {
    localStorage.clear()
    this.router.navigate(['login']);
  }

} 


/*
  ngOnInit(): void {
    if (this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

   
    const userId = Number(localStorage.getItem('userId'));
    if (!isNaN(userId)) {
      this.userService.getUser(+userId).subscribe((userData) => {
        console.log('User data:', userData); 
        this.user = userData;
      });
    } else {
      this.router.navigate(["login"]);
    }
    /*this.userService.getUser(userId).subscribe((userData) => {
        this.user = userData;
    });
    */
    


