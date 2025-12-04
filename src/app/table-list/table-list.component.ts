import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { Imagemodel } from '../imagemodel';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  cars: Car[];
  imagemodel=new Imagemodel();
  
  constructor(private  _service : RegistrationService, private _route : Router) { }

  ngOnInit(): void {
    this.CarList();
  }


  CarList()
{
 
  this._service.CarListFromRemote().subscribe(data => {
    this.cars = data;
  });

}

carDetails(carId: number){
  this._route.navigate(['typography', carId]);
}

updateCar(carId: number){
  this._route.navigate(['upgrade', carId]);
}

deleteCar(carId: number){
  this._service.deleteCar(carId).subscribe( data => {
    console.log(data);
    this.CarList();;
  })
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