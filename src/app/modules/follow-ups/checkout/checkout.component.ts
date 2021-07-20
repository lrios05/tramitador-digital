import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NoteService } from '../note/note.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  noteId: any;
  noteDetails: any;

  constructor(private activeRoute: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      param => {
        this.noteId = param.get('id');
      }
    );
  }

  private getNoteDetails(noteId: number): void {
    this.noteService.findNote(noteId).subscribe(
      (data: any) => {
        this.noteDetails = data.payload;
      }
    );
  }

}
