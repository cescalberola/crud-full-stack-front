import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
      next: () => this.navigateToList('Cliente creado'),
      error: (err) => console.error('Error al crear cliente:', err)
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
      next: () => this.navigateToList('Cliente actualizado'),
      error: (err) => console.error('Error al actualizar cliente:', err)
    });
  }

  private navigateToList(message: string): void {
    alert(message);
    this.router.navigate(['/lista']);
  }
}
