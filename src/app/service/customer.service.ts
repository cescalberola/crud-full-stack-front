import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';
import { toHttpParams } from '../utils/http-utils/http-utils.component';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) { }

  getCustomerList(
    page: number,
    size: number,
    name?: string
  ): Observable<PaginatedResponse<Customer>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (name && name.trim()) {
      params = params.set('name', name.trim());
    }

    return this.http.get<PaginatedResponse<Customer>>(this.api, { params });
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
