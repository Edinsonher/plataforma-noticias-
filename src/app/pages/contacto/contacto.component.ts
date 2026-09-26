import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './contacto.css',
  templateUrl: './contacto.html',
})
export class ContactoComponent {
  enviado = false;
  readonly contactoForm;

  constructor(private readonly formBuilder: FormBuilder) {
    // Las reglas de validacion reflejan los campos obligatorios del mockup.
    this.contactoForm = this.formBuilder.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  enviar(): void {
    // No se envia informacion a un backend: se valida y se muestra confirmacion local.
    this.enviado = false;
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }
    this.enviado = true;
    this.contactoForm.reset();
  }

  campoInvalido(campo: string): boolean {
    // El mensaje aparece solo despues de que el usuario interactua con el campo.
    const control = this.contactoForm.get(campo);
    return !!control && control.invalid && control.touched;
  }
}
