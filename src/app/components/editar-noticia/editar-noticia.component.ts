import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {

  content !: string;
  form !: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<EditarNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) data: string) {
      this.content = data;
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      contenido: [this.content]
    });
  }

  save(): void {
    this.dialogRef.close(this.form.controls['contenido'].value);
  }

  exit(): void{
    this.dialogRef.close();
  }

}
