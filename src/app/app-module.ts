import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { HeaderComponent } from './header-component/header-component';
import { HomeComponent } from './home-component/home-component';
import { AboutComponent } from './about-component/about-component';
import { ProductsComponent } from './products-component/products-component';
import { CheckoutComponent } from './checkout-component/checkout-component';
import { TodoComponent } from './todo-component/todo-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PracticeComponent } from './practice-component/practice-component';
import { PracticeChildComponent } from './practice-child-component/practice-child-component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    CheckoutComponent,
    TodoComponent,
    PracticeComponent,
    PracticeChildComponent,
  ],
  imports: [BrowserModule, MatSnackBarModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
