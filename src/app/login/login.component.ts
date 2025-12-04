import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { RegistrationService } from '../registration.service'
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  msg='';
 user=new User();
 

  constructor(private  _service : RegistrationService, private _route : Router,) { }

  ngOnInit(): void {
    
  }

  doLogin() {
    let resp = this._service.login(this.user)
    resp.subscribe(token => { /*console.log("Token: "+token)*/
      this.user.successMessage = token;
     this._route.navigate(["/home"])
    });

}

  
   goRegistration()
   {
    this._route.navigate(['/registration'])
   }

  addUser(form :any)
  {
    console.log(form.value);

  }

  loginUser()
  {
  
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {console.log('Response Recived',data)
      if(data!=null)
      this._route.navigate(['/home'])
      else
      error => console.log('Exception ocurred',error)
      this.msg='bad credential please enter valid email id and password';
    }
    ) 
   }
 
}