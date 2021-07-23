import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observation } from 'src/app/core/interfaces/observation';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {

  constructor(
              public dialogRef: MatDialogRef<ObservationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Observation) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
