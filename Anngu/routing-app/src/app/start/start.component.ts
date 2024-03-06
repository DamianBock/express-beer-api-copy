import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: '',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class Start implements OnInit {
  HausA: any[] = [];
  searchAdresse: string = '';

  constructor(
    private route: ActivatedRoute,
    public userService: UserService
  ) {}

  public addToFavorites(ID: any) {
    this.userService.incrementInteressenten(ID).subscribe((response) => {});
    var el = document.getElementById("Button" + ID);
    if (el != null) el.style.backgroundColor = "Blue";
  }

  ngOnInit() {
    this.userService.getHausA().subscribe((response) => {
      this.HausA = response;
    });
  }

  public searchByAdresse() {
    this.userService.getHausAAdresse(this.searchAdresse).subscribe((response) => {
      this.HausA = response;
      if(response.length === 0){
        alert("Es wurde keine Immobilie gefunden.");
      }
    });
  }

  public searchByType(type: string) {
    this.userService.getHausATyp(type).subscribe((response) => {
      this.HausA = response;
      if(response.length === 0){
        alert("Es wurde keine Immobilie gefunden.");
      }
    });
  }

  public reset() {
    this.userService.getHausA().subscribe((response) => {
      this.HausA = response;
    });
  }
}
