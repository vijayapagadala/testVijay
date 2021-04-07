import {NgModule} from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,       
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressBarModule,       
  ],
  exports: [
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,       
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressBarModule,
  ]
})
export class MaterialModule {}