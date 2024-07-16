import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class AppSideLoginComponent  {
  user: User[] = []
  userForm: FormGroup;
  titulo = 'Login';

  

  constructor(
    private router: Router,
    private _userService: UserService,
    private toastr: ToastrService

  ) {
    this.userForm = new FormGroup({
      usuario: new FormControl("", [Validators.required]),
      contraseña: new FormControl("", [Validators.required])
    });
  }


  showSuccess(){
    this.toastr.success('Se inició Sesión Correctamente', 'No error', {
    timeOut: 3000,
    }
)}
  showError(){
    this.toastr.error('Error', 'No se pudo iniciar Sesion', {
    timeOut: 3000,
    closeButton: true,
    
    }
)}

  login() {
    if (this.userForm.valid) {
      const user: User = {
        usuario: this.userForm.get('usuario')?.value,
        contraseña: this.userForm.get('contraseña')?.value,
        confirmarContraseña: '',
        email: '',
        rol: '',
        imagenPerfil: ''
      };

      this._userService.login(user).subscribe(
        (response) => {
          this.showSuccess();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.showError();
          console.error(error);
        }
      );
    }
  }
}
