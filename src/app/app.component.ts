import { Component, OnInit } from '@angular/core';
import { Noticia } from './common/INoticia';
import { NoticiasService } from './services/noticias.service';
import {MatDialog} from '@angular/material/dialog';
import { EditarNoticiaComponent } from './components/editar-noticia/editar-noticia.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  noticias !: Noticia[];

  constructor(private noticiaService: NoticiasService, private dialog: MatDialog, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(): void{
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data['noticias'];
    });
    this.toastr.info('Noticias cargadas correctamente', 'Información');
  }

  remove(id: number): void {
    this.noticias = this.noticias.filter(n => n.id !== id);
    this.noticiaService.delete(id);
    this.toastr.success('Noticia eliminada correctamente', 'Información');
  }

  edit(id: number): void {
    let noticia = this.noticias.filter(n => n.id === id)[0];
    this.noticiaService.update(id, noticia);
    const dialogRef = this.dialog.open(EditarNoticiaComponent, {
      disableClose: true,
      data: noticia.content,
      width: '400px',
      height: '400px'
    });
    dialogRef.afterClosed().subscribe(response => {
     if (response !== undefined) {
        this.noticias.map(n => {
          if (n.id === id) n.content = response;
        });
        this.toastr.success('Noticia editada correctamente', 'Información');
     }
    });
  }
}
