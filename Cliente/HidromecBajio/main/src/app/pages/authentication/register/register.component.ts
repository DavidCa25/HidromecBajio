import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
})
export class AppSideRegisterComponent {
  registerForm: FormGroup;


  constructor(
    private router: Router, 
    private _userService: UserService,
    private toastr: ToastrService

  ) {
    this.registerForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contraseña: new FormControl('', [Validators.required]),
      confirmarContraseña: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      rol: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void{
    
  }

    showSuccess(){
      this.toastr.success('Se inició Sesión Correctamente', 'No error', {
      timeOut: 3000,
      }
  )}
    showError(){
      this.toastr.error('Error', 'No se pudo iniciar Sesion', {
      timeOut: 3000,
      }
  )}
  showInfo(){
      this.toastr.info('El Cliente fue registrado con éxito', 'Cliente Registrado', {
      timeOut: 3000,
      closeButton: true,
    });
   }

  submit() {

    const user: User = {
      usuario: this.registerForm.get('usuario')?.value,
      contraseña: this.registerForm.get('contraseña')?.value,
      confirmarContraseña: this.registerForm.get('confirmarContraseña')?.value,
      email: this.registerForm.get('email')?.value,
      rol: this.registerForm.get('rol')?.value,
      imagenPerfil: ''
    }   

    if(this.registerForm.valid){
      this._userService.registrar(user).subscribe(data =>{
        console.log(data)
          this.toastr.info('El Cliente fue registrado con éxito', 'Cliente Registrado');
       
      },error =>{
        console.log(error);
        this.registerForm.reset();
      });
    } 
  }
}
