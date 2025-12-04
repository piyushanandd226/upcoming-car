import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private  _service : RegistrationService, private _route : Router) {}
  msg='';
  user=new User();
 
  ngOnInit(): void {
  }
  registerUser()
  {

    this._service.registerUserFromRemote(this.user).subscribe(
      data => {console.log('Response Recived',data)
      if(data!=null)
      this._route.navigate(['/user-profile'])
      else
      error => console.log('Exception ocurred',error)
      this.msg='bad credential please enter valid email id and password';
    }
    ) 
   
  }
}