import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const id = Number(route.paramMap.get('id'));
      if (isNaN(id) || id < 1) {
        // In real application instead of showing an allert, we should, for example, navigate to an error page
        alert('Invalid product Id');
        this.router.navigate(['/products']);
        return false;
      }
      return true;
  }
  
}
