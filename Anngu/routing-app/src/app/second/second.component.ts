import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent {
constructor(private route: ActivatedRoute,public userService: UserService){}
ID: any;
sub: any;
Haus: any;
HausA: any[] = [];
  ngOnInit(){
    this.sub = this.route.params.subscribe((params) => {
      console.log(params['id']);
    this.userService.getHaus(params['id']).subscribe((response) => {this.Haus = response});
    
    });
  }
}