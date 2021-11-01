import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false
    filteredProducts: IProduct[] = [];
    private _listFilter = '';
    errorMessage = '';
    sub!: Subscription;

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
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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