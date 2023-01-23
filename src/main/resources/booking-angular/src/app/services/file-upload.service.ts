import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {
  }

  upload(file: File, path: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('folderPath', path)

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  delete(file: string, directory: string): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('filename', file);
    formData.append('directory', directory)

    const req = new HttpRequest('DELETE', `${this.baseUrl}/delete`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req)
  }
}
