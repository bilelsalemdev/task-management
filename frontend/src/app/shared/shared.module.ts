import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

// Re-export the modules to avoid importing them multiple times
const materialModules = [
  // Angular Material Modules
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSidenavModule,
];

const sharedComponents = [
  HeaderComponent,
  FooterComponent,
  ConfirmationDialogComponent,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ...materialModules,
  ],
  exports: [
    ...sharedComponents,
    ...materialModules,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
