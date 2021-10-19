import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-view',
  templateUrl: './eliminar-view.component.html',
  styleUrls: ['./eliminar-view.component.scss']
})
export class EliminarViewComponent implements OnInit {

  constructor( private router: Router, private _ngZone: NgZone) { }

  ngOnInit(): void {
   this._ngZone.run(()=>{  this.router.navigateByUrl('productos'); });
  }

}
