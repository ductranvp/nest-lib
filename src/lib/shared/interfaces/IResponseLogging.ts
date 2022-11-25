export interface IResponseLogging {
  statusCode: string | number;
  method: string;
  url: string;
  data: any;
  time: string | number;
}
