export enum DownloadOutputEvent {
  DOWNLOAD_CSV = 'DOWNLOAD_CSV',
  DOWNLOAD_TEMPLATE = 'DOWNLOAD_TEMPLATE',
  BULK_UPLOAD = 'BULK_UPLOAD',
}

export type DownloadEventActionType = {
  action:
    | DownloadOutputEvent.BULK_UPLOAD
    | DownloadOutputEvent.DOWNLOAD_CSV
    | DownloadOutputEvent.DOWNLOAD_TEMPLATE;

  payload: any;
};
