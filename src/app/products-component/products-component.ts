import { ChangeDetectorRef, Component } from '@angular/core';
import { CartItemType, CartType, ProductType } from '../../model/app.model';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products-component',
  standalone: false,
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent {
  public products: ProductType[] = [];
  public cart: CartType = { cartId: 0, items: [], totalAmount: 0, createdAt: new Date() };
  public cartHistory: CartType[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.productService.fetchProductList().subscribe((data: any) => {
      this.products = data.map((p: any) => ({
        ...p,
        id: Number(p.id),
      }));
      this.cdr.detectChanges(); 
    });
  }
  public onAddToCart = (selectedIdx: number) => {
    const product = this.products[selectedIdx];
    if (!product) return;

    let existingItem = this.cart.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      const newCartItem: CartItemType = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        totalPrice: product.price,
      };

      this.cart.items.push(newCartItem);
    }

    this.updateTotal();
  };
  public updateTotal() {
    this.cart.totalAmount = this.cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
  }
  public getItem = (selectedItemId: number) => {
    return this.cart.items.find((item) => item.id === selectedItemId);
  };
  public increaseQuantity = (selectedItemId: number) => {
    const product = this.getItem(selectedItemId);
    if (!product) return;

    product.quantity++;
    product.totalPrice = product.quantity * product.price;

    this.updateTotal();
  };
  public decreaseQuantity = (selectedItemId: number) => {
    const product = this.getItem(selectedItemId);
    if (!product) return;

    product.quantity--;

    if (product.quantity <= 0) {
      this.removeFromCart(selectedItemId);
    } else {
      product.totalPrice = product.quantity * product.price;
    }

    this.updateTotal();
  };
  public removeFromCart = (selectedItemId: number) => {
    this.cart.items = this.cart.items.filter((item) => item.id !== selectedItemId);
    this.updateTotal();
  };
  public checkout = () => {
    const storedHistory = localStorage.getItem('cartHistory');
    this.cartHistory = storedHistory ? JSON.parse(storedHistory) : [];

    // last cart id
    let lastCartId = this.cartHistory.length
      ? Math.max(...this.cartHistory.map((c) => c.cartId))
      : 0;

    const newCartId = lastCartId + 1;

    // new cart create
    const checkedOutCart: CartType = {
      cartId: newCartId,
      items: [...this.cart.items],
      totalAmount: this.cart.totalAmount,
      createdAt: new Date(),
    };

    // check duplicate id
    const exists = this.cartHistory.some((c) => c.cartId === newCartId);

    if (!exists) {
      this.cartHistory.push(checkedOutCart);
    }

    // save to localStorage
    localStorage.setItem('cartHistory', JSON.stringify(this.cartHistory));

    // navigate
    this.router.navigate(['/checkout', newCartId]);

    // new cart reset
    this.cart = {
      cartId: newCartId + 1,
      items: [],
      totalAmount: 0,
      createdAt: new Date(),
    };
  };
}
