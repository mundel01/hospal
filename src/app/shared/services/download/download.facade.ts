import { NotificationType } from '../../../../types/notification.enum';
import { Observable, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../notification/notification.service';
import { DownloadService } from '@app/shared/services/download/download.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TableConfig } from '@custom-types/table';
import { API_URL, FILE_TYPE, MAX_DOWNLOAD_LIMIT } from '@config/constant';
import { env } from 'src/environments/environment';
import { GENERIC_ERROR_MESSAGE, SUCCESSFULLY_UPLOADED } from '@config/messages';
import { convertFileToBinary } from '@utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class DownloadFacade {
  private UploadSubject: Subject<any> = new Subject();
  public onUpload: Observable<any> = this.UploadSubject.asObservable();

  constructor(
    private readonly downloadService: DownloadService,
    private readonly httpClient: HttpClient,
    private readonly notificationService: NotificationService
  ) {}

  downloadCSV(
    tableConfig: TableConfig,
    params: any,
    url: string
  ): Subscription {
    params = {
      ...params,
      limit: MAX_DOWNLOAD_LIMIT,
    };

    return this.get(params, `${env.api}/${url}`).subscribe({
      next: (result: any) => {
        result = result.data;
        this.downloadService.downloadCSV(
          result.rows,
          tableConfig.columns,
          tableConfig.name
        );
      },
      error: (error: any) => {
        this.notificationService.openSnackBar({
          type: NotificationType.ERROR,
          message: error,
        });
      },
    });
  }

  getTemplateFileName(name: string) {
    name = name.toLowerCase();
    return `${name}_template.xlsx`;
  }

  downloadTemplate(type: string): Subscription {
    return this.post_text(`${env.api}/${API_URL.BULK_UPLOAD_TEMPLATE}`, {
      type,
      createdBy: 'string',
    }).subscribe({
      next: (data: any) => {
        this.downloadService.DownloadFile(
          data,
          this.getTemplateFileName(type),
          FILE_TYPE.xlsx
        );
      },
      error: (error: any) => {
        this.notificationService.openSnackBar({
          type: NotificationType.ERROR,
          message: GENERIC_ERROR_MESSAGE,
        });
      },
    });
  }

  bulkUploadHandler(file: File, type: string): Subscription {
    const formData: FormData = convertFileToBinary(file);
    formData.append('type', type);
    formData.append('createdBy', 'createdBy');

    const url: string = `${env.api}/bulk-upload/excel `;

    return this.post(url, formData).subscribe({
      next: (result: any) => {
        this.UploadSubject.next(result);
        this.notificationService.openSnackBar({
          type: NotificationType.SUCCESS,
          message: SUCCESSFULLY_UPLOADED,
        });
      },
      error: (error: any) => {
        this.UploadSubject.next(error);

        this.notificationService.openSnackBar({
          type: NotificationType.ERROR,
          message: error,
        });
      },
    });
  }

  private post_text(url: string, body: any): Observable<any> {
    return this.httpClient.post(url, body, {
      responseType: 'arraybuffer',
    });
  }

  private post(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, data);
  }

  private get(params: any, url: string): Observable<any> {
    return this.httpClient.get(url, {
      params,
    });
  }
}
