export interface PageData<T extends object> {
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
  data: Array<T>;
  links: {
    next?: string;
    prev?: string;
  };
}
