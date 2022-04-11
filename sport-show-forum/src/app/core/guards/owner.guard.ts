import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  constructor(
    public auth: AngularFireAuth,
    public postService: PostService,
    public router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params['id'];
      return this.postService.getPostById(id).toPromise().then((res: any) => {
        const post: any = res.data();
        return this.auth.currentUser.then(res => {
          if (post.user == res?.email) {
            return true;
          } else {
            this.router.navigate([`/details/${id}`]);
            return false;
          }
        });
      });
    }
  
}
