import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  filterName: string = '';

  constructor(
    private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.listCustomers();

  };

  trackById(index: number, customer: Customer): number {
    return customer.id!;
  }

  listCustomers(): void {
    this._customerService.getCustomerList().subscribe(
      data => {
        this.customers = data;
      }
    );
  }

  filteredCustomers(): Customer[] {
    return this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
  deleteCustomer(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este cliente?');
    if (confirmDelete) {
      this._customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
        }
      });
    }
  }

}
