import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { AlertComponent } from '../../shared/alert/alert.component';
import {
  ALERT_MESSAGES,
  ALERT_TYPES,
  AlertType
} from '../../shared/app.constants';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, RouterLink, AlertComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: ''
  };

  isEditMode: boolean = false;
  alertMessage: string = '';
  alertType: AlertType | '' = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editCustomer(+id);
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  private createCustomer(): void {
    this.customerService.createCustomer(this.customer).subscribe({
      next: () => this.showAlert(ALERT_MESSAGES.CREATE_SUCCESS, ALERT_TYPES.SUCCESS),
      error: (err) => {
        console.error(err);
        this.showAlert(ALERT_MESSAGES.CREATE_ERROR, ALERT_TYPES.ERROR);
      }
    });
  }

  private editCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: (data) => this.customer = data,
      error: (err) => console.error('Error al obtener cliente:', err)
    });
  }

  private updateCustomer(): void {
    this.customerService.updateCustomer(this.customer).subscribe({
      next: () => this.showAlert(ALERT_MESSAGES.UPDATE_SUCCESS, ALERT_TYPES.SUCCESS),
      error: (err) => {
        console.error(err);
        this.showAlert(ALERT_MESSAGES.UPDATE_ERROR, ALERT_TYPES.ERROR);
      }
    });
  }

  private showAlert(message: string, type: AlertType): void {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
      this.router.navigate(['/lista']);
    }, 2000);
  }
}
