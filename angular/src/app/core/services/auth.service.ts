import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';
import { User } from '../class/user/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }


    login(user: User) {
        return this.http.post<User>(`${environment.api}/login`, user).delay(1000)
            .pipe(map((response) => {
                console.log(response)
                // set token property
                const decodedToken = jwt_decode(response['access_token']);
                let user = { id: response['user']['id'], name: response['user']['name'], email: response['user']['email'], token: response['access_token'] };

                // store email and jwt token in local storage to keep user logged in between page refreshes
                this.localStorage.setItem('currentUser', JSON.stringify({
                    token: user.token,
                    isAdmin: true,
                    email: user.email,
                    id: user.id,
                    alias: 'john.doe@gmail.com'.split('@')[0],
                    expiration: moment().add(1, 'days').toDate(),
                    fullName: user.name
                })); 
                console.log(JSON.parse(localStorage.getItem('currentUser')));
            }));
    }



    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }


    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));
        return {
            token: 'aisdnaksjdn,axmnczm',
            isAdmin: true,
            email: 'john.doe@gmail.com',
            id: '12312323232',
            alias: 'john.doe@gmail.com'.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: 'John Doe'
        };
    }


    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }


    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }


    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }

}
