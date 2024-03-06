import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-create-haus',
  templateUrl: './create-haus.component.html',
  styleUrls: ['./create-haus.component.css']
})
export class CreateHausComponent {

  haus = {
    createdBy: "",
    entry: {
      type: "",
      address: "",
      postal: "",
      city: "",
      size: 0,
      comment: "",
      shortHand: ""
    }
  };

  constructor(private router: Router, private userService: UserService) {}

  createHaus() {
    this.userService.createHaus(this.haus).subscribe((response) => {
      console.log(response);
      alert("Haus wurde erstellt");
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
      alert("Fehler beim Erstellen des Hauses");
    });
  }
}
