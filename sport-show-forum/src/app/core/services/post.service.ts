import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public firestore: Firestore, public router: Router, public route: ActivatedRoute) { }

  

}
