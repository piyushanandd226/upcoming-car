import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import{HttpClient,HttpEventType, HttpHeaders} from '@angular/common/http'
import{ Imagemodel } from './imagemodel';
import { stringify } from '@angular/compiler/src/util';
import { Car } from './car';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  imageName: any;
  
  user
  
  private baseURL="http://localhost:8091/cars";
  constructor(private _http : HttpClient) { }

 /* login(user :User) :Observable<any>{
    
    

      return this._http.get("http://localhost:8091/admin/get",{headers,responseType: 'text' as 'json'})
    }*/

  public login(user:User) {
    
    return this._http.post<string>("http://localhost:8091/authenticate", user, {  responseType: 'text' as 'json' }).pipe(
      map(
        userData => {
         //sessionStorage.setItem('username',user.username);
         let tokenStr=userData;
         let restr=tokenStr.replace('"token"','');
         let nextstsr=restr.replace('{:"' ,'');
         let nextstrplus=nextstsr.replace('"}','');
         sessionStorage.setItem('token1', nextstrplus);
        // console.log('Bearer '+sessionStorage.getItem('token1'));
         let tokenstr=sessionStorage.getItem('token1');
         let maintocken=''+'Bearer '+tokenstr+'';
         console.log(maintocken);

         return userData;
        }
      )
    );

 }

  /*login(user :User) {
    return this._http.post<any>('http://localhost:8080/authenticate',user,{  responseType: 'text' as 'json' }).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',user.username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }*/

  
  loginUserFromRemote(user :User):Observable<any>
  {
    return this._http.post<any>('http://localhost:8091/login', user);
  }

  registerUserFromRemote(user :User):Observable<any>
  {
   let tokenstr=sessionStorage.getItem('token1');
   let maintocken=''+'Bearer '+tokenstr+'';

    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username1 + ':' + password1) });
   // const headers = new HttpHeaders({ Authorization: 'Basic cGl5dXNoYW5hbmRAZ21haWwuY29tOnBpeXVzaDEyMw=='});
    const headers = new HttpHeaders({ Authorization: maintocken});
    return this._http.post<any>('http://localhost:8091/addUser', user,{headers});
  }


  
  imageUploadfromRemote(imagemodel: any): Observable<any>{

    let tokenstr=sessionStorage.getItem('token1');
   let maintocken=''+'Bearer '+tokenstr+'';
    
   // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username1 + ':' + password1) });
    //const headers = new HttpHeaders({ Authorization: 'Basic cGl5dXNoYW5hbmRAZ21haWwuY29tOnBpeXVzaDEyMw=='});
    const headers = new HttpHeaders({ Authorization: maintocken});
    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', imagemodel.selectedFile, imagemodel.selectedFile.name);

    return this._http.post<any>('http://localhost:8091/upload',uploadImageData,{headers});

   }

   getImageFromRemote(imagemodel :Imagemodel): Observable<Imagemodel>{

    let tokenstr=sessionStorage.getItem('token1');
   let maintocken=''+'Bearer '+tokenstr+'';
    //console.log(maintocken);

   
   const headers = new HttpHeaders({ Authorization: maintocken});
    
    return this._http.get<Imagemodel>(`${this.baseURL}/imageName` ,{headers});
   }

   

    addCarFromRemote(car:Car) :Observable<any>{
      
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
     // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      //const headers = new HttpHeaders({ Authorization: 'Basic cGl5dXNoYW5hbmRAZ21haWwuY29tOnBpeXVzaDEyMw=='});
      const headers = new HttpHeaders({ Authorization: maintocken});

     return this._http.post("http://localhost:8091/createCar",car,{headers ,responseType: 'text'} )
      //return this._http.post("http://localhost:8091/createCarWithImage",car,{headers})
    }


    CarListFromRemote():Observable<Car[]>
    {
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
    
      const headers = new HttpHeaders({ Authorization: maintocken});

     return this._http.get<Car[]>("http://localhost:8091/listofcar",{headers})
     
    }


    deleteCar(carId:any):Observable<Car> {
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
      const headers = new HttpHeaders({ Authorization: maintocken});
      console.log(maintocken);  
      return this._http.delete<Car>(`http://localhost:8091/carsdelete/` +carId ,{headers});
     // return this._http.delete<Car>(`${this.baseURL}/${carId}` ,{headers});
    }
  
    updateCar(carId: number,updatedCar: Car):Observable<Car> {
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
      const headers = new HttpHeaders({ Authorization: maintocken});
      console.log(maintocken);  

      return this._http.put<Car>('http://localhost:8091/carsupdate/' +carId , updatedCar,{headers});
      //return this._http.put<Car>(`${this.baseURL}/${carId}`, updatedCar,{headers});
    }
    
    getCarById(carId:any):Observable<Car> {
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
      const headers = new HttpHeaders({ Authorization: maintocken});
      console.log(maintocken);  
      return this._http.get<Car>('http://localhost:8091/carsfind/'+carId ,{headers});
    //  return this._http.get<Car>(`${this.baseURL}/${carId}`,{headers});
    }

    SendNotificationtoUser():Observable<any>
    {
      let tokenstr=sessionStorage.getItem('token1');
      let maintocken=''+'Bearer '+tokenstr+'';
      const headers = new HttpHeaders({ Authorization: maintocken});
      return this._http.get<any>('http://localhost:8091/api/outbound' ,{headers});

    }
    
  }
  

