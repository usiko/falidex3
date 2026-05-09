import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-secret-login',
  templateUrl: './secret-login.component.html',
  styleUrls: ['./secret-login.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule]
})
export class SecretLoginComponent  implements OnInit {
  password: string = '';
  private eventService = inject(EventService);

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  login() {
    if(this.password===environment.envDevPwd)
    {
        this.eventService.publish('devMode',true)
    }
    // Logique de login ici
    this.modalCtrl.dismiss();
  }

}
