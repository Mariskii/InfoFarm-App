import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../interfaces/RegisterUser.interface';
import { environment } from '../../../environments/environment.development';
import { LoginUser } from '../interfaces/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(createUserRequest:RegisterUser, image?: File) {

    const formData: FormData = new FormData();
    formData.append('authCreateUser', new Blob([JSON.stringify(createUserRequest)], { type: 'application/json' }));
    if (image) {
      formData.append('file', image);
    }

    return this.httpClient.post(`${environment.API_URL}/sign-up`,formData)
  }

  login(user: LoginUser) {
    return this.httpClient.post<LoginUser>(`${environment.API_URL}/auth/log-in`,user);
  }
}
