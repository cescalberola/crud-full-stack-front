import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';
import { toHttpParams } from '../utils/http-utils/http-utils.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getCustomerList(name?: string): Observable<Customer[]> {
    const query = { name };
    return this.http.get<Customer[]>(this.api, toHttpParams(query));
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
