import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card'; 
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit, OnDestroy {
  ad!: number;
  private sub: any;
  cards =[
    {
      text:"1"
    },
    {
      text:"2"
    },
    {
      text:"3"
    }
  ]
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.ad = +params['id']; // (+) converts string 'id' to a number
       var el = document.getElementById("addToFav");
       if(el!=null)el.textContent = String(this.ad);
       
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
