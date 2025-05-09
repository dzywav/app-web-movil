import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var $:any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  //Variables
  public user:any = {};
  public errors:any = {};
  public isLoading:boolean = false;

  //Para contraseña
  public hide_1: boolean = false;
  public inputType_1: string = 'password';

  //Para las edades
  public selectedValue: string = "";
  public edades: any[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private facadeService:FacadeService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();
    this.llenarArrayEdades();

    console.log("Mi usuario es: ", this.user);

  }

  public llenarArrayEdades(){
    for (let i = 18; i <= 80; i++) {
      this.edades.push({value: i});
    }
  }

  public terminosCondiciones(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.user);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Aquí vamos a registrar
    if(this.user.terminos_condiciones){
      this.isLoading = true;
      this.facadeService.registrarUser(this.user).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente")
          //this.loginUser(this.user.email, this.user.password);
        }, (error)=>{
          alert("No se pudo iniciar sesión");
          this.isLoading = false;
        }
      );
    }else{
      alert("Por favor acepta los términos y condiciones");
    }
  }

  public loginUser(username: string, password: string){
    this.facadeService.login(username, password).subscribe(
      (response)=>{
        this.facadeService.saveUserData(response);
        this.router.navigate(["home"]);
        this.isLoading = false;
      }, (error)=>{
        alert("No se pudo iniciar sesión");
        this.isLoading = false;
      }
    );
  }

  public goLogin(){
    this.router.navigate([""]);
  }

  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)){
      return true;
    }else{
      return false;
    }
  }
}