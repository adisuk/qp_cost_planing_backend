export interface PaginationResponder {
  nodes: object[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  fromItem: number;
  toItem: number;
  currentPage: number;
  pageSizes: number;
  totalItemsInPage: number;
  totalPage: number;
  totalItems: number;
}
