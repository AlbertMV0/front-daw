import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  title = 'Como usar el Componente Google Maps de Angular 9';

  // Configuración de Google Maps

  lat = 22.2736308;
  long = 70.7512555;
}
