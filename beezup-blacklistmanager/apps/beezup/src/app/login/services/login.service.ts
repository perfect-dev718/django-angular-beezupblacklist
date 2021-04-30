import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {ServerApiService} from "../../../../../../libs/shared/src/lib/services/server-api/server-api.service";


const SECURITY_URL = '/security/';
const REFRESH = 'refresh';
const LOGIN = 'login';
const CHANGEPASS_URL = 'user ';

@Injectable()
export class LoginModel {

  constructor(private http: HttpClient,
              private serverApi: ServerApiService) {
  }

  login(user) {
    return this.http.post(`${SECURITY_URL}${LOGIN}`, user)
      .pipe(map((response) => this.extractData(response)));
  }

  refreshToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('userToken') }`
      })
    };
    return this.http.post(`${SECURITY_URL}${REFRESH}`, null, httpOptions)
      .pipe(map((response) => {
        return this.extractData(response);
      }));
  }

  updateAdminInfo(admin) {
    return this.serverApi.put(`${CHANGEPASS_URL}`, admin);
  }

  private extractData(res) {
    return res.result || res || {};
  }
}

