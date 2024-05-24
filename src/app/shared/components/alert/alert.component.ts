import { Component, OnInit } from '@angular/core'
import { AlertService } from '../../services/alert/alert.service'
import { slideInOut } from '../../../animations/slideinOut'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [slideInOut]
})
export class AlertComponent implements OnInit {
  message: string = ''
  type: string = ''

  constructor (private alertService: AlertService) {}

  /**
   * subscribe to getAlerts observable to listening message and type data for render alert component
   */
  ngOnInit () {
    this.alertService.getAlerts().subscribe(alert => {
      this.message = alert.message
      this.type = alert.type
    })
  }

  /**
   * close alert component using service
   */
  closeAlert(): void {
    this.alertService.clear()
  }
}
