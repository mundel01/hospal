import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { convertFileToBinary } from '@utils/helpers';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    // Converting file to binary
    const binaryFile: any = convertFileToBinary(file);

    return this.http.post(`${env.api}/files`, binaryFile);
  }
}
