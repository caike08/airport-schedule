import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight: any;
  @Input() logo: any;

  constructor() { }

  ngOnInit() {}

  getBadgeColor(status: string): string {
    switch (status) {
      case 'Arrived':
        return 'success';

      case 'Cancelled':
        return 'danger';

      case 'Delayed departure':
        return 'warning';

      case 'New departure time':
          return 'secondary';

      default:
        return 'primary';
    }
  }


}
