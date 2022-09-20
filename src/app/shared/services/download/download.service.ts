import { Injectable } from '@angular/core';
import { FILE_TYPE } from '@config/constant';
import { TableColumn } from '@custom-types/table';
import { Parser } from 'json2csv';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor() {}

  downloadCSV(data: any[], columnsConfig: TableColumn[], name: string) {
    const columnFields: string[] = [];
    const formattedData: any[] = [];
    const headers: any[] = [];

    columnsConfig.forEach((config: TableColumn) => {
      columnFields.push(config.field);
      headers.push({
        label: config.label,
        value: config.field,
      });
    });

    for (const row of data) {
      const filterRow: any = {};

      for (const key of columnFields) {
        filterRow[key] = _.get(row, key);
      }
      formattedData.push(filterRow);
    }

    const csv = this.getCSV(formattedData, headers);
    const fileName: string = this.addCSVExtension(name);
    this.DownloadFile(csv, fileName, FILE_TYPE['text/plain']);
  }

  private addCSVExtension(name: string) {
    return `${name}.csv`;
  }

  private getCSV(data: any[], headers: any[]) {
    const parser = new Parser({ fields: headers });
    const csv = parser.parse(data);
    return csv;
  }

  DownloadFile = (
    csvdata: any,
    fileName: string = 'data.csv',
    type: string
  ) => {
    var textFile = null;
    var data = new Blob([csvdata], { type });
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.href = textFile;
    document.body.appendChild(link);
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  };
}
