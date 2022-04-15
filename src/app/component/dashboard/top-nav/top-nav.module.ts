import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesComponent } from './categories/categories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsComponent } from './products/products.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SelectProductComponent } from './select-product/select-product.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TopNavComponent,
    SearchProductComponent,
    CategoriesComponent,
    ProductsComponent,
    SelectProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCardModule,
  ],
  exports: [TopNavComponent],
})
export class TopNavModule {}
