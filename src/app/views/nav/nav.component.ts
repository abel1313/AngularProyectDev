import { Component, OnInit } from '@angular/core';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  
  constructor( private service: ServicesGenericosService ) { }

  ngOnInit(): void {

    
  }

  mostrarClientes(): void
  {
      this.service.mostrarProductos$.emit(false);
  }
  mostrarUsuarios(): void
  {
      this.service.mostrarProductos$.emit(false);
  }

}
