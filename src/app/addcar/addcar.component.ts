import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { Imagemodel } from '../imagemodel';
import { Car} from '../car';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-error';


@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {
  
  imagemodel=new Imagemodel();
  car=new Car();

  user=new User();
  msg='';
  public selectedFile;
  imgURL: any;
  constructor(private  _service : RegistrationService, private _route : Router,private _http : HttpClient) { }

  ngOnInit(): void {
  }
  /*public onFileChanged(event:any) {
  
    this.imagemodel.selectedFile = event.target.files[0];
    }*/

  
  onUpload(){
  this._service.imageUploadfromRemote(this.imagemodel).subscribe(
    data => {console.log('Response Recived',data)
    if (data.status === 200) {
      this.msg = 'Image uploaded successfully';
      
  } else {
      
        this.msg = 'Image not uploaded successfully';
      }
   
  }
  );
}
addCar()
{
  this._service.addCarFromRemote(this.car).subscribe(
    
    data => {console.log('Response Recived',data)
    if(data!=null)
    this._route.navigate(['/table-list'])
    else
    error => console.log('Exception ocurred',error)
    this.msg='bad Request';
  }

  )

}
public onFileChanged(event:any) {
  console.log(event);
  this.selectedFile = event.target.files[0];

  // Below part is used to display the selected image
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event2) => {
    this.imgURL = reader.result;
  };

}
/*saveCar()
{
  if (this.car.carId== null) {

    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    let tokenstr=sessionStorage.getItem('token1');
     let maintocken=''+'Bearer '+tokenstr+'';
     console.log(maintocken)
     const headers = new HttpHeaders({ Authorization: maintocken});

    this._http.post('http://localhost:8091/uploadsm', uploadData, {headers, observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this._service.addCarFromRemote(this.car).subscribe(
            (car) => {
              console.log('Succes'+car);
            }
          );
          console.log('Image uploaded successfully');
        } 
        else {
          console.log('Image not uploaded successfully');
        }
      }
    );
  }

}*/


}
