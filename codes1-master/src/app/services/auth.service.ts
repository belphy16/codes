import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

 constructor(private http: Http) { }
 
    login(username: string, password: string) {

        const headers = new Headers ();
        headers.append('Content-Type', 'application/json');

        return this.http.post('https://zqu6w6oi7h.execute-api.ap-southeast-1.amazonaws.com/nonprod/login', JSON.stringify({ userID: username, password: password }), { headers: headers })
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', username);
                    localStorage.setItem('userName', user.userName);
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('age', user.age);
                    localStorage.setItem('gender', user.gender.toLowerCase());
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('status', user.status);
                }
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('age');
        localStorage.removeItem('gender');
        localStorage.removeItem('token');
        localStorage.removeItem('status');
    }

}