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

  cars: Car[] = [];
  imagemodel=new Imagemodel();
  
  constructor(private  _service : RegistrationService, private _route : Router) { }

  ngOnInit(): void {
    this.CarList();
  }


  CarList()
{
 
    this._service.CarListFromRemote().subscribe(data => {
      this.cars = data && data.length ? data : this.demoCars();
    }, () => this.cars = this.demoCars());

}

private demoCars(): Car[] {
  return [
    { carId: 1, carName: 'Porsche Taycan Turbo GT', carType: 'Electric performance', modelNo: '2026 GT', price: 231995, color: 'Purple', offer: 0, dicountOnRegistration: 0, image_id: 0 },
    { carId: 2, carName: 'BMW Neue Klasse', carType: 'Electric sedan', modelNo: 'iX3', price: 68000, color: 'Silver', offer: 0, dicountOnRegistration: 0, image_id: 0 },
    { carId: 3, carName: 'Audi A6 e-tron', carType: 'Electric grand tourer', modelNo: 'Sportback', price: 72000, color: 'Black', offer: 0, dicountOnRegistration: 0, image_id: 0 },
    { carId: 4, carName: 'Mercedes CLA', carType: 'Electric luxury', modelNo: 'EQ Technology', price: 59000, color: 'White', offer: 0, dicountOnRegistration: 0, image_id: 0 },
    { carId: 5, carName: 'Polestar 5', carType: 'Electric performance', modelNo: 'Launch edition', price: 89900, color: 'Grey', offer: 0, dicountOnRegistration: 0, image_id: 0 },
    { carId: 6, carName: 'Range Rover Electric', carType: 'Electric SUV', modelNo: 'First edition', price: 120000, color: 'Green', offer: 0, dicountOnRegistration: 0, image_id: 0 }
  ] as any;
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
