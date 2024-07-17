export default interface PaginatedDataFetched<T> {
  data: T;
  pages: number;
}
