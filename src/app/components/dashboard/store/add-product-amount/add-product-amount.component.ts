import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/Interfaces/Products';
import { initUpdateItemQuantityInCart, } from 'src/app/state/actions/shopping.actions';

@Component({
  selector: 'app-add-product-amount',
  templateUrl: './add-product-amount.component.html',
  styleUrls: ['./add-product-amount.component.css'],
})
export class AddProductAmountComponent implements OnInit {
  public amount: number = 0;
  private _item: IProduct;
  @Input() set item(value: IProduct) {
    this._item = value;
    this.amount = this._item.quantity;
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store.select()
  }

  public increment(): void {
    this.amount += 1;
    this.dispatchUpdateAction(this._item);
  }

  public decrement() {
    if (this.amount > 0) {
      this.amount -= 1;
      this.dispatchUpdateAction(this._item);
    }
  }

  private dispatchUpdateAction(product: IProduct): void {
    this.store.dispatch(
      initUpdateItemQuantityInCart({
        itemUpdate: {
          productRefId: product._id,
          quantity: this.amount,
          idCart: '62bc60407a0a29c9f3c77b31',
        },
      })
    );
  }
}
