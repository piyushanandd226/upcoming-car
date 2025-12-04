import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { Imagemodel } from '../imagemodel';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  imagemodel=new Imagemodel();
  msg='';
  constructor(private  _service : RegistrationService, private _route : Router) { }

  ngOnInit(): void {
  }

  public onFileChanged(event:any) {
  
    this.imagemodel.selectedFile = event.target.files[0];
    }

  
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
 getImage()
 {
  
  this._service.getImageFromRemote(this.imagemodel).subscribe(
    data=> {
      
      this.imagemodel.retrieveResonse = data;
  
      this.imagemodel.base64Data = this.imagemodel.retrieveResonse.picByte;
    
      this.imagemodel.retrievedImage = 'data:image/jpeg;base64,' + this.imagemodel.base64Data;
    
      }

   )
 }

 }


