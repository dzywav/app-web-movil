import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const session_cookie_name = 'carrera-web-token';
const user_email_cookie_name = 'carrera-web-email';
const user_id_cookie_name = 'carrera-web-user_id';
const user_complete_name_cookie_name = 'carrera-web-user_complete_name';
const group_name_cookie_name = 'carrera-group_name';
const codigo_cookie_name = 'carrera-web-codigo';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public validarLogin(username: string, password: string){
    var data = {
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorService.required;
    }else if(!this.validatorService.max(data["username"], 40)){
      error["username"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }

    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    return error;
  }

  validatePassword(data:any){
    console.log("validando... ", data);

    let error: any = [];

     // validacion de CLAVE
     if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }
    else if(!this.validatorService.max(data["password"], 20)){
      error["password"] = this.errorService.max(50);
    }

    if(!this.validatorService.required(data["confirm_password"])){
      error["confirm_password"] = this.errorService.required;
    }

    return error;
  }

  // Función para saltarse el Login
  validarToken(){
    var token = this.getSessionToken();
    let data = {"token":token};
    return this.http.patch<any>(`${environment.url_api}/token/`,data);
  }

  // Funciones básicas
  login(username:string, password:string): Observable<any> {
    var data={
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.url_api}/token/`,data);
  }

  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/logout/`, {headers: headers});
  }

  //Recuperar email para la contrasña
  public recoveryEmail(email:string){
    return this.http.get<any>(`${environment.url_api}/recovery/?mail=`+email);
  }

  public recoveryPassword(pwd: string, token: string, s:number, u:number){
    var data = {
      password: pwd,
      token: token,
      s: s,
      id: u
    }
    return this.http.put<any>(`${environment.url_api}/recovery/`,data);
  }

  retrieveSignedUser(){
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/me/`,{headers:headers});
  }

  getCookieValue(key:string){
    return this.cookieService.get(key);
  }

  saveCookieValue(key:string, value:string){
    var secure = environment.url_api.indexOf("https")!=-1;
    this.cookieService.set(key, value, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  getSessionToken(){
    return this.cookieService.get(session_cookie_name);
  }


  saveUserData(user_data:any){
    var secure = environment.url_api.indexOf("https")!=-1;

    this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(user_complete_name_cookie_name, user_data.first_name + " " + user_data.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(group_name_cookie_name, user_data.roles, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  destroyUser(){
    this.cookieService.deleteAll();
  }

  getUserEmail(){
    return this.cookieService.get(user_email_cookie_name);
  }

  getUserCompleteName(){
    return this.cookieService.get(user_complete_name_cookie_name);
  }

  getUserId(){
    return this.cookieService.get(user_id_cookie_name);
  }

  getUserGroup(){
    return this.cookieService.get(group_name_cookie_name);
  }

  //---------------------Registrar users-------------------------
  getDefaultScheduleUser() {
    return {
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'role': 'participante',
      'telefono': '',
      'ciudad': '',
      'edad': '',
      'terminos_condiciones': false
    }
  }

  validateEmail(data:string){
    console.log("validando... ", data);

    let error: any = [];

    // validacion de EMAIL
    if(!this.validatorService.required(data)){
      error["email"] = this.errorService.required;
    }
    else if(!this.validatorService.max(data, 40)){
      error["email"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data)) {
      error['email'] = this.errorService.email;
    }

    return error;
  }

  public validarUsuario(data: any){
    console.log("Validando user... ", data);
    let error: any = [];

    // if(!this.validatorService.required(data["role"])){
    //   error["role"] = this.errorService.required;
    // }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["ciudad"])){
      error["ciudad"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }

    return error;
  }

  //Registrar usuario
  public registrarUser(data: any){
    var headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.url_api}/users/`,data,{headers:headers});
  }

  //Guardar código en las cookies
  public saveCodigoCookies(codigo: string){
    var secure = environment.url_api.indexOf("https")!=-1;

    this.cookieService.set(codigo_cookie_name,codigo, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  destroyCodigo(){
    this.cookieService.delete("carrera-web-codigo");
  }
}