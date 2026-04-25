import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartType } from '../../model/app.model';

@Component({
  selector: 'app-checkout-component',
  standalone: false,
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.css',
})
export class CheckoutComponent {
  public storedHistory = localStorage.getItem('cartHistory');
  public cartHistory: CartType[] = this.storedHistory ? JSON.parse(this.storedHistory) : [];
  public currentCartId: number = 0;
  public setCartHistory: CartType[] = [];
  public setCurrentCartDetail: CartType | undefined;
  public showHistory: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('cartId');

      if (id) {
        // current cart
        this.currentCartId = Number(id);
        this.findCartItem();
        this.showHistory = false;
      } else {
        // history
        this.showHistory = true;
        this.setCartHistory = this.cartHistory;
      }
    });
  }
  public findCartItem() {
    this.setCurrentCartDetail = this.cartHistory.find(
      (item) => item.cartId === this.currentCartId,
    ) ?? {
      cartId: 0,
      items: [],
      totalAmount: 0,
      createdAt: new Date(),
    };
  }
  public showCartHistory() {
    this.showHistory = !this.showHistory;

    if (this.showHistory) {
      this.setCartHistory = this.cartHistory;
    }
    console.log(this.cartHistory);
    console.log(this.currentCartId);
  }

  public navigateToCart(id: number) {
    this.router.navigate(['/checkout', id]);
  }
}
