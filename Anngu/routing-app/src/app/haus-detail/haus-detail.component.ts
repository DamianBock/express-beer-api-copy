import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './haus-detail.component.html',
  styleUrls: ['./haus-detail.component.css']
})
export class Haus_Detail {
constructor(private route: ActivatedRoute,public userService: UserService){}
id=0;
Haus = {
  createdBy: "",
  createdOn: "",
  entry: {
    type: "",
    address: "",
    postal: "",
    city: "",
    size: 0,
    comment: "",
    shortHand: "",

  },
  ID: 0,
  interessenten:-1,
  ppath:""
};

ngOnInit(){
    this.route.params.subscribe((params) => {
      this.id= params['id'];
      this.userService.getHaus(params['id']).subscribe((response) => {this.Haus = response;});
    });
  }

  updateBild() {
    const formData = new FormData();
    const fileInput = <HTMLInputElement>document.getElementById('Bild_i');
    if (fileInput.files && fileInput.files[0]) {
      formData.append('picture', fileInput.files[0]);
      this.userService.updateHausBild(this.id, formData).subscribe((response) => {
        console.log(response);
        alert('Bild wurde aktualisiert');
      }, error => {
        console.error(error);
        alert("Fehler beim Aktualisieren des Bildes");
      });
    } else {
      alert('Bitte wählen Sie ein Bild aus');
    }
  }

  updateHaus() {
    this.userService.updateHaus(this.id, this.Haus).subscribe((response) => {
      console.log(response);
      alert("Haus wurde aktualisiert");
    }, error => {
      console.error(error);
      alert("Fehler beim Aktualisieren des Hauses");
    });
  }

  async deleteHaus() {
    try {
      this.userService.deleteHaus(this.id).subscribe((response) => {});
      alert("Haus wurde gelöscht");
    } catch (error) {
      console.error(error);
      alert("Beim Löschen des Hauses ist ein Fehler aufgetreten.");
    }
  }
  }
