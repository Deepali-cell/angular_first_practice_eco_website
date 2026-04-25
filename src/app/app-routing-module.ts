import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ProductsComponent } from './products-component/products-component';
import { AboutComponent } from './about-component/about-component';
import { CheckoutComponent } from './checkout-component/checkout-component';
import { TodoComponent } from './todo-component/todo-component';
import { PracticeComponent } from './practice-component/practice-component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/:cartId', component: CheckoutComponent },
  { path: 'practice', component: PracticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
