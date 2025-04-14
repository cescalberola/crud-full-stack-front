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

  listCustomers(): void {
    this._customerService.getCustomerList().subscribe(
      data => {
        this.customers = data;
        console.log(this.customers);
      }
    );
  }

  filteredCustomers(): Customer[] {
    return this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
}
