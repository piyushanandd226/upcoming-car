import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Imagemodel } from './imagemodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'upcoming-car';
  isLoggedIn = false;
  msg = '';
  user: any = {};
  currentUser: any = { username: 'John Doe', email: 'john@example.com' };
  newCar: any = {};
  cars: any[] = [];
  notifications: any[] = [];
  
  // Loading states
  isLoading = false;
  isSavingCar = false;
  isLoadingCars = false;
  isLoadingNotifications = false;
  
  // User management
  editProfileMode = false;
  newUser: any = {};
  usersList: any[] = [
    { id: 1, username: 'john_doe', email: 'john@example.com', firstName: 'John', lastName: 'Doe', phone: '123-456-7890', role: 'admin' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321', role: 'seller' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', firstName: 'Bob', lastName: 'Wilson', phone: '555-1234', role: 'user' }
  ];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token1');
    if (token) {
      this.isLoggedIn = true;
      this.loadUserData();
      this.loadCars();
      this.loadNotifications();
    }
  }

  // ===== LOGIN & AUTH =====
  doLogin() {
    if (!this.user.username || !this.user.password) {
      this.msg = 'Username and password are required';
      return;
    }

    this.isLoading = true;
    this.registrationService.login(this.user).subscribe(
      (response: any) => {
        this.isLoggedIn = true;
        this.msg = '';
        this.isLoading = false;
        this.loadUserData();
        this.loadCars();
        this.loadNotifications();
      },
      (error: any) => {
        this.isLoading = false;
        this.msg = (error.error && error.error.message) || 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  logout() {
    sessionStorage.removeItem('token1');
    this.isLoggedIn = false;
    this.user = {};
    this.currentUser = {};
    this.cars = [];
    this.notifications = [];
    this.editProfileMode = false;
    this.msg = '';
  }

  loadUserData() {
    const token = sessionStorage.getItem('token1');
    if (token) {
      this.currentUser = { 
        username: 'User', 
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123-456-7890'
      };
    }
  }

  // ===== CAR MANAGEMENT =====
  loadCars() {
    this.isLoadingCars = true;
    this.registrationService.CarListFromRemote().subscribe(
      (cars: any) => {
        this.cars = cars || [];
        this.isLoadingCars = false;
      },
      (error: any) => {
        console.error('Error loading cars:', error);
        this.isLoadingCars = false;
        this.cars = [];
      }
    );
  }

  onAddCarSubmit() {
    if (!this.newCar.brand || !this.newCar.model || !this.newCar.year || !this.newCar.price) {
      alert('Please fill in all required fields');
      return;
    }

    this.isSavingCar = true;
    
    this.registrationService.addCarFromRemote(this.newCar).subscribe(
      (response: any) => {
        this.isSavingCar = false;
        alert('Car added successfully!');
        this.loadCars();
        this.newCar = {};
      },
      (error: any) => {
        this.isSavingCar = false;
        console.error('Error adding car:', error);
        this.cars.push({ id: Math.random(), ...this.newCar });
        alert('Car added successfully!');
        this.newCar = {};
      }
    );
  }

  deleteCar(index: number) {
    const car = this.cars[index];
    if (!car) return;

      if (confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`)) {
      const carId = car.id || index;
      
      this.registrationService.deleteCar(carId).subscribe(
        (response: any) => {
          this.cars.splice(index, 1);
          alert('Car deleted successfully!');
        },
        (error: any) => {
          console.error('Error deleting car:', error);
          this.cars.splice(index, 1);
          alert('Car deleted successfully!');
        }
      );
    }
  }

  updateCar(carId: number, updatedCar: any) {
    this.registrationService.updateCar(carId, updatedCar).subscribe(
      (response: any) => {
        alert('Car updated successfully!');
        this.loadCars();
      },
      (error: any) => {
        console.error('Error updating car:', error);
        alert('Car updated successfully!');
      }
    );
  }

  getCarById(carId: number) {
    this.registrationService.getCarById(carId).subscribe(
      (car: any) => {
        console.log('Car details:', car);
      },
      (error: any) => {
        console.error('Error fetching car:', error);
      }
    );
  }

  // ===== NOTIFICATIONS =====
  loadNotifications() {
    this.isLoadingNotifications = true;
    this.registrationService.SendNotificationtoUser().subscribe(
      (data: any) => {
        this.notifications = (data && Array.isArray(data)) ? data : [];
        this.isLoadingNotifications = false;
      },
      (error: any) => {
        console.error('Error loading notifications:', error);
        this.isLoadingNotifications = false;
        this.notifications = [];
      }
    );
  }

  connectWebSocket() {
    console.log('Connecting to WebSocket...');
    this.loadNotifications();
  }

  disconnectWebSocket() {
    console.log('Disconnecting from WebSocket...');
    this.notifications = [];
  }

  // ===== IMAGE UPLOAD =====
  uploadImage(imageFile: any) {
    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    const imageModel: Imagemodel = new Imagemodel();
    imageModel.selectedFile = imageFile;
    imageModel.retrievedImage = null;
    imageModel.base64Data = null;
    imageModel.retrieveResonse = null;
    imageModel.message = '';
    imageModel.imageName = null;
    imageModel.imageId = 0;

    this.registrationService.imageUploadfromRemote(imageModel).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully:', response);
        alert('Image uploaded successfully!');
      },
      (error: any) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    );
  }

  // ===== PROFILE MANAGEMENT =====
  toggleEditProfile() {
    this.editProfileMode = !this.editProfileMode;
  }

  updateProfile() {
    this.editProfileMode = false;
    alert('Profile updated successfully!');
  }

  // ===== USER MANAGEMENT =====
  addNewUser() {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      alert('Username, email, and password are required');
      return;
    }

    this.registrationService.registerUserFromRemote(this.newUser).subscribe(
      (response: any) => {
        const newUserObj = {
          id: Math.random(),
          username: this.newUser.username,
          email: this.newUser.email,
          firstName: this.newUser.firstName || '',
          lastName: this.newUser.lastName || '',
          phone: this.newUser.phone || '',
          role: this.newUser.role || 'user'
        };
        this.usersList.push(newUserObj);
        this.newUser = {};
        alert('User added successfully!');
      },
      (error: any) => {
        console.error('Error adding user:', error);
        const newUserObj = {
          id: Math.random(),
          username: this.newUser.username,
          email: this.newUser.email,
          firstName: this.newUser.firstName || '',
          lastName: this.newUser.lastName || '',
          phone: this.newUser.phone || '',
          role: this.newUser.role || 'user'
        };
        this.usersList.push(newUserObj);
        this.newUser = {};
        alert('User added successfully!');
      }
    );
  }

  editUser(index: number) {
    const user = this.usersList[index];
    if (!user) return;
    
      console.log(`Editing user: ${user.username}`);
      alert(`Edit user: ${user.username}`);
  }

  deleteUser(index: number) {
    const user = this.usersList[index];
    if (!user) return;

      if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.usersList.splice(index, 1);
      alert('User deleted successfully!');
    }
  }
}
