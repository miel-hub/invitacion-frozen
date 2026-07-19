import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  invitacionAbierta = false;

  // Usamos la ruta directa para que GitHub Pages la encuentre sin problemas
  audio = new Audio('cancion.mp3');

  dias: string = '00';
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';
  intervalo: any;

  @ViewChild('formularioAsistencia') formRef!: ElementRef;

  ngOnInit() {
    this.iniciarContador();
    this.audio.loop = true; // Hace que la canción se repita
  }

  ngOnDestroy() {
    if (this.intervalo) clearInterval(this.intervalo);
    this.audio.pause();
  }

  abrirInvitacion() {
    // Aquí va tu lógica actual para abrir la tapa (por ejemplo: this.invitacionAbierta = true;)
    this.invitacionAbierta = true;
  
    // Forzamos a que la música empiece a sonar inmediatamente al hacer clic
    setTimeout(() => {
      const audio = document.getElementById('miMusica') as HTMLAudioElement;
      if (audio) {
        audio.play().catch(err => console.log("Permiso de audio requerido:", err));
      }
    }, 100);
  }
  // ¡Una sola función unificada y sin errores!
  reproducirMusica() {
    const audio = document.getElementById('miMusica') as HTMLAudioElement;
    
    if (audio) {
      if (audio.paused) {
        // Si está en pausa, que suene
        audio.play().catch(err => console.log("El navegador bloqueó el audio:", err));
      } else {
        // Si ya está sonando y presionan el botón, que se pause
        audio.pause();
      }
    }
  }
// --- AGREGA ESTA NUEVA FUNCIÓN AQUÍ ---
abrirUbicacion() {
    // Enlace directo y exacto a EL PALENQUE
    const linkMapa = 'https://www.google.com/maps/place/Centro+de+Recepciones+-+Restaurante+%22EL+PALENQUE%22/@-13.7164663,-76.1409328,17z/data=!4m6!3m5!1s0x911067006c28a017:0x858b6adb41c12422!8m2!3d-13.7164663!4d-76.1409328';
    window.open(linkMapa, '_blank');
  }
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
