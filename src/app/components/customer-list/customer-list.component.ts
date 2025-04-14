import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ALERT_MESSAGES,
  ALERT_TYPES,
  AlertType,
  BUTTON_LABELS,
  CONFIRM_MESSAGES
} from '../../shared/app.constants';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FormsModule, RouterLink, ConfirmModalComponent, AlertComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  filterName: string = '';
  showModal: boolean = false;
  customerIdToDelete: number | null = null;
  alertMessage: string = '';
  alertType: AlertType | '' = '';

  readonly confirmText = BUTTON_LABELS.CONFIRM;
  readonly cancelText = BUTTON_LABELS.CANCEL;
  readonly deleteMsg = CONFIRM_MESSAGES.DELETE_CUSTOMER;

  constructor(
    private customerService: CustomerService) { }
    private searchSubject = new Subject<string>();

    ngOnInit(): void {
      this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((name) => {
        this.customerService.getCustomerList(name).subscribe({
          next: (data) => this.customers = data,
          error: (err) => console.error('Error al buscar clientes:', err)
        });
      });

      this.customerService.getCustomerList().subscribe({
        next: (data) => this.customers = data,
        error: (err) => console.error('Error al cargar clientes:', err)
      });
    }


  onFilterChange(): void {
    this.searchSubject.next(this.filterName.trim());
  }

  trackById(index: number, customer: Customer): number {
    return customer.id!;
  }

  listCustomers(): void {
    const nameParam = this.filterName.trim();
    this.customerService.getCustomerList(nameParam).subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  onRequestDelete(id: number): void {
    this.customerIdToDelete = id;
    this.showModal = true;
  }

  confirmDelete(): void {
    if (this.customerIdToDelete !== null) {
      this.customerService.deleteCustomer(this.customerIdToDelete).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.id !== this.customerIdToDelete);
          this.showAlert(ALERT_MESSAGES.DELETE_SUCCESS, ALERT_TYPES.SUCCESS);
          this.resetModal();
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
          this.showAlert(ALERT_MESSAGES.DELETE_ERROR, ALERT_TYPES.ERROR);
          this.resetModal();
        }
      });
    }
  }

  cancelDelete(): void {
    this.resetModal();
  }

  private resetModal(): void {
    this.customerIdToDelete = null;
    this.showModal = false;
  }

  private showAlert(message: string, type: AlertType): void {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }
}
