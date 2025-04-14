import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: Record<string, any>): { params: HttpParams } {
  let params = new HttpParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value);
    }
  });
  return { params };
}
