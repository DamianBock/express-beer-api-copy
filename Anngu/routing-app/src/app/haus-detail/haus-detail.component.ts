import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-second',
  templateUrl: './haus-detail.component.html',
  styleUrls: ['./haus-detail.component.css']
})
export class Haus_Detail {
constructor(private route: ActivatedRoute,public userService: UserService){}

Haus= {Titel:"",Typ:"",Adresse:"",Beschreibung:""};
  ngOnInit(){
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.userService.getHaus(params['id']).subscribe((response) => {this.Haus = response});
      console.log(this.Haus);
    });
  }
}