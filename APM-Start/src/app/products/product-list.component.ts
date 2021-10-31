import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false
    filteredProducts: IProduct[] = [];
    private _listFilter = '';

    constructor(private productService: ProductService) {
    }

    products: IProduct[] = [];
    
    get listFilter(): string {
        return this._listFilter;
    }
    
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.filterProducts(value)
    }

    ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }
    
    filterProducts(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().includes(filterBy));
      }

    toggleImage() {
        this.showImage = !this.showImage;
    }

    onRatingClicked($event: string): void {
        console.log($event)
    }
}