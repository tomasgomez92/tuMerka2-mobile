import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from '../models/enums/snackBarStatus';
import { DtLogin } from '../models/dataTypes/DtLogin';
import { CompradorService } from '../servicios/comprador/comprador.service'
import { DtUsuario } from '../models/dataTypes/DtUsuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private snackBar: MatSnackBar, private user: CompradorService) { }

  errorMessage: string = '';
  emailValido: boolean = true;
  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email]);
  passwordFormControl = new FormControl('', Validators.required);

  ngOnInit() {
  }

  public login(){
    if(
      this.emailFormControl.value == '' ||
      this.emailFormControl.value == null ||
      this.passwordFormControl.value == ''
    ){
      this.mostrarSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    }else{
      if(this.isEmailOk(this.emailFormControl.value)){
        let data: DtLogin = {
          email: this.emailFormControl.value,
          password: this.passwordFormControl.value
        };
        this.user.login(data).subscribe({
          next:async (response) => {
            this.setLocalStorage(response);
            this.mostrarSnackBar('Iniciaste sesion correctamente', SnackBarStatus.SUCCESS);
          },
          error: (err) => {
            this.mostrarSnackBar(err.error, SnackBarStatus.ERROR);
          }
        })
      }else{
        this.mostrarSnackBar('El email esta mal escrito', SnackBarStatus.ERROR);
      }
    }
  }

  setLocalStorage(data: DtUsuario){
    localStorage.setItem('user', JSON.stringify(data));
  }

  mostrarSnackBar(message: string, status: SnackBarStatus){
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`]
    })
  }

  isEmailOk(email: string): boolean{
    let mailOk = false;
    ('use strict');

    var EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(EMAIL_REGEX)){
      mailOk = true;
    }

    return mailOk;
  }
}
