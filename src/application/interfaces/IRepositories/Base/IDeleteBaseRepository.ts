export interface IDeleteBaseRepository<T> {
  delete(id: number): Promise<T>;
}