import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent implements OnInit, OnDestroy {
  HausA: any[] = [];
  ad!: number;
  private sub: any;
  cards= [{text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7}];
  ID: any;


  constructor(private route: ActivatedRoute,public userService: UserService) {
  }

  public addToFavorites(ID :any){this.userService.updateInteressenten(ID).subscribe((response) => {});
  var el = document.getElementById("Button"+ID); if(el!=null)el.style.backgroundColor = "Blue"; }


  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
       this.ad = +params['id']; // (+) converts string 'id' to a number
       var el = document.getElementById("Test");
       if(el!=null)el.textContent = String(this.ad);

    });
    this.userService.getHausA().subscribe((response) => {
      this.HausA = response});
      
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
