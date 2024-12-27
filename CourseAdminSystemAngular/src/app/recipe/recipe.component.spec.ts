import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './recipe.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let mockRouter: MockRouter;
  
  // Mock localStorage methods
  let localStorageMock: any;

  beforeEach(async () => {
    // Create a spy for localStorage
    localStorageMock = {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem'),
      removeItem: jasmine.createSpy('removeItem'),
      clear: jasmine.createSpy('clear')
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    
    await TestBed.configureTestingModule({
      imports: [RecipeComponent, HttpClientModule],
      providers: [
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
  });

  it('should display edit and delete buttons if userId matches the recipe author', () => {
    const recipe = {
      recipeId: 1,
      recipeName: 'Test Recipe',
      recipeWord: 'Tasty',
      recipePicture: 'image.jpg',
      recipeStory: 'This is a test story.',
      recipeInstruct: 'Test instructions.',
      recipeIngredients: 'Test ingredients.',
      user: { userId: 123, username: 'testUser', name: 'test', email: 'a@b.de', aboutSection: 'abs' },
    };

    // Mock localStorage.getItem to return the userId
    localStorageMock.getItem.and.returnValue('123');
    
    component.recipe = recipe;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button[mat-raised-button]'));

    const editButton = buttons.find(button =>
      button.nativeElement.textContent.trim() === 'Edit'
    );
    const deleteButton = buttons.find(button =>
      button.nativeElement.textContent.trim() === 'Delete'
    );

    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('should not display edit and delete buttons if userId does not match the recipe author', () => {
    const recipe = {
      recipeId: 1,
      recipeName: 'Test Recipe',
      recipeWord: 'Tasty',
      recipePicture: 'image.jpg',
      recipeStory: 'This is a test story.',
      recipeInstruct: 'Test instructions.',
      recipeIngredients: 'Test ingredients.',
      user: { userId: 456, username: 'testUser', name: 'test', email: 'a@b.de', aboutSection: 'abs' },
    };
  
    // Mock localStorage.getItem to return a different userId
    localStorageMock.getItem.and.returnValue('123');
    
    component.recipe = recipe;
    fixture.detectChanges();
  
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-raised-button]'));
  
    const editButton = buttons.find(button =>
      button.nativeElement.textContent.trim() === 'Edit'
    );
    const deleteButton = buttons.find(button =>
      button.nativeElement.textContent.trim() === 'Delete'
    );
    
    // Expect that no button should be found (undefined for find())
    expect(editButton).toBeUndefined();
    expect(deleteButton).toBeUndefined();
  });

  it('should navigate to edit-recipe page when edit button is clicked', () => {
    const recipe = {
      recipeId: 1,
      recipeName: 'Test Recipe',
      recipeWord: 'Tasty',
      recipePicture: 'image.jpg',
      recipeStory: 'This is a test story.',
      recipeInstruct: 'Test instructions.',
      recipeIngredients: 'Test ingredients.',
      user: { userId: 123, username: 'testUser', name: 'test', email: 'a@b.de', aboutSection: 'abs' },
    };

    // Mock localStorage.getItem to return the userId
    localStorageMock.getItem.and.returnValue('123');
    
    component.recipe = recipe;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button[mat-raised-button]'));
    const editButton = buttons.find(button =>
      button.nativeElement.textContent.trim() === 'Edit'
    );

    editButton!.triggerEventHandler('click', null);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['edit-recipe', 1]);
  });
});

