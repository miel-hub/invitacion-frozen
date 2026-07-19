import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  invitacionAbierta = false;
  musicaReproduciendo = false;
  audio = new Audio('/cancion.mp3');

  dias: string = '00';
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';
  intervalo: any;

  @ViewChild('formularioAsistencia') formRef!: ElementRef;

  ngOnInit() {
    this.iniciarContador();
    this.audio.loop = true;
  }

  ngOnDestroy() {
    if (this.intervalo) clearInterval(this.intervalo);
    this.audio.pause();
  }

  abrirInvitacion() {
    this.invitacionAbierta = true;
    this.reproducirMusica();
  }

  reproducirMusica() {
    this.musicaReproduciendo ? this.audio.pause() : this.audio.play();
    this.musicaReproduciendo = !this.musicaReproduciendo;
  }

  // Esta es la única función de envío que necesitamos
  enviarFormulario() {
    const form = this.formRef.nativeElement as HTMLFormElement;

    if (!(form.elements.namedItem('Nombre') as HTMLInputElement).value) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    }).then(() => {
      alert('¡Muchas gracias! Ya recibimos tu confirmación. ¡Estamos muy felices de contar contigo en este día especial!');
      form.reset();
    });
  }

  iniciarContador() {
    const fechaFiesta = new Date('2026/07/27 20:00:00').getTime();
    this.intervalo = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = fechaFiesta - ahora;
      if (diferencia > 0) {
        this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        this.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        this.minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000).toString().padStart(2, '0');
      } else {
        clearInterval(this.intervalo);
      }
    }, 1000);
  }
}
