import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.api);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.api, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.api, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
