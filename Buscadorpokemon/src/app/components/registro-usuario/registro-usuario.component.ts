import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Usuario {
  id: number;
  nombreCompleto: string;
  documento: {
    tipo: string;
    numero: string;
  };
  nacimiento: string;
  celular: string;
  correo: string;
  pais: string;
  ciudad: string;
  tratamientoDatos: boolean;
}

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  usuario = {
    nombreCompleto = signal(''),
    documento: {
      tipo = signal(''),
      numero = signal(''),
    },
    nacimiento = signal(''),
    celular = signal(''),
    correo = signal(''),
    pais = signal(''),
    ciudad = signal(''),
    tratamientoDatos: false
  };

  ultimoUsuario: Usuario | null = null;

  guardarUsuario() {
    if (!this.usuario.tratamientoDatos) {
      alert('Debes aceptar el tratamiento de datos personales');
      return;
    }

    const usuarioCreado: Usuario = {
      id: Date.now(),
      nombreCompleto: this.usuario.nombreCompleto,
      documento: {
        tipo: this.usuario.documento.tipo,
        numero: this.usuario.documento.numero
      },
      nacimiento: this.usuario.nacimiento,
      celular: this.usuario.celular,
      correo: this.usuario.correo,
      pais: this.usuario.pais,
      ciudad: this.usuario.ciudad,
      tratamientoDatos: this.usuario.tratamientoDatos
    };

    localStorage.setItem(usuarioCreado.id.toString(), JSON.stringify(usuarioCreado));
    this.ultimoUsuario = usuarioCreado;
  }
}