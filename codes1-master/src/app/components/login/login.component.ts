import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  styles: [`
            .modal-header, h4, .close {
              color: #286090;
              text-align: center;
              border-color: #DADADA;
              background-image: linear-gradient(to bottom,#EAEAEA 0,#ECECEC 100%);
              font: 400 100px/1.3 'Oleo Script', Helvetica, sans-serif;
              text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
            }

            .modal-body {
              color: #286090;
              text-align: left;
              border-color: #DADADA;
              background-image: linear-gradient(to bottom,#f5f5f5 0,#ECECEC 100%);
            }

        `],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private username: string = '';
  private password: string = '';

  constructor(private router: Router, private authService: AuthService) { 

  }
 
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data : any) => {
        if(data.status === true) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      });
      
  }

}
