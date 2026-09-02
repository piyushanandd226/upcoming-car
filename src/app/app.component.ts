import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upcoming-car';
  isLoggedIn = false;
  msg = '';
  user = { username: '', password: '' };
  newCar = { brand: '', model: '', year: null, price: null, description: '' };
  cars: Array<{ brand: string; model: string; year: number; price: number; description: string }> = [];
  notifications: Array<{ title: string; body: string; timestamp: Date }> = [];
  currentUser = { username: '', email: '', firstName: '', lastName: '', phone: '' };
  editProfileMode = false;
  newUser = { username: '', email: '', password: '', firstName: '', lastName: '', phone: '', role: 'user' };
  usersList: Array<{ username: string; email: string; firstName: string; lastName: string; phone: string; role: string }> = [];

  doLogin() {
    if (!this.user.username || !this.user.password) {
      this.msg = 'Enter a username and password to continue.';
      return;
    }

    this.currentUser.username = this.user.username;
    this.isLoggedIn = true;
    this.msg = '';
  }

  logout() {
    this.isLoggedIn = false;
  }

  onAddCarSubmit() {
    this.cars.push({ ...this.newCar, year: Number(this.newCar.year), price: Number(this.newCar.price) });
    this.newCar = { brand: '', model: '', year: null, price: null, description: '' };
  }

  connectWebSocket() {
    this.notifications.push({ title: 'Notifications connected', body: 'You will receive updates here.', timestamp: new Date() });
  }

  disconnectWebSocket() {
    this.notifications.push({ title: 'Notifications disconnected', body: 'Updates have been paused.', timestamp: new Date() });
  }

  toggleEditProfile() {
    this.editProfileMode = !this.editProfileMode;
  }

  updateProfile() {
    this.editProfileMode = false;
  }

  addNewUser() {
    this.usersList.push({ ...this.newUser });
    this.newUser = { username: '', email: '', password: '', firstName: '', lastName: '', phone: '', role: 'user' };
  }

  editUser(index: number) {
    const selectedUser = this.usersList[index];
    if (selectedUser) {
      this.newUser = { ...selectedUser, password: '' };
    }
  }

  deleteUser(index: number) {
    this.usersList.splice(index, 1);
  }
}
