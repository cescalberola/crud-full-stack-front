import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(
    private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.listCustomers();

  };

  listCustomers(){
    this._customerService.getCustomerList().subscribe(
      data => {
        this.customers = data;
        console.log(this.customers);
      }
    );
  }
}
