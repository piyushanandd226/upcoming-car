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
  uploadedFileName: string = '';
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
  // If an image is selected, upload it first and then create the car
  if (this.selectedFile) {
    this.imagemodel.selectedFile = this.selectedFile;
    this._service.imageUploadfromRemote(this.imagemodel).subscribe(
      uploadRes => {
        console.log('Image upload response', uploadRes);
        // if backend returned stored image name, set it on car
        if (uploadRes && uploadRes.imageName) {
          this.car.imageName = uploadRes.imageName;
          this.uploadedFileName = uploadRes.imageName;
        } else if (this.selectedFile && this.selectedFile.name) {
          this.car.imageName = this.selectedFile.name;
          this.uploadedFileName = this.selectedFile.name;
        }
        // proceed to add car after successful (or fallback) upload
        this._service.addCarFromRemote(this.car).subscribe(
          data => {
            console.log('Response Recived', data);
            if (data != null) {
              this._route.navigate(['/table-list']);
            }
          },
          error => {
            console.error('Exception occurred while adding car', error);
            this.msg = 'Bad Request';
          }
        );
      },
      err => {
        console.error('Image upload failed, still attempting to add car', err);
        // try to add car even if upload failed
        this._service.addCarFromRemote(this.car).subscribe(
          data => {
            console.log('Response Recived', data);
            if (data != null) {
              this._route.navigate(['/table-list']);
            }
          },
          error => {
            console.error('Exception occurred while adding car', error);
            this.msg = 'Bad Request';
          }
        );
      }
    );
  } else {
    // No image selected — just add car
    this._service.addCarFromRemote(this.car).subscribe(
      data => {
        console.log('Response Recived', data);
        if (data != null) this._route.navigate(['/table-list']);
      },
      error => {
        console.error('Exception occurred', error);
        this.msg = 'Bad Request';
      }
    );
  }

}
public onFileChanged(event:any) {
  console.log(event);
  this.selectedFile = event.target.files[0];
  this.uploadedFileName = this.selectedFile ? this.selectedFile.name : '';

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
