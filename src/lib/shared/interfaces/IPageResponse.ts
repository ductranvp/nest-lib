export interface IPageResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
}
