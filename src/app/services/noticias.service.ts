import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Noticia } from '../common/INoticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private url = 'https://www3.labanca.com.uy/noticias';

  constructor(private http: HttpClient) {
  }

  getNoticias() {
    return this.http.get<any>(this.url);
  }

  update(id: number, noticia: Noticia){
    return this.http.put(`${this.url}/edit/${id}`, noticia);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
