export interface ICreateBaseRepository<T> {
  create(args: any): Promise<T>;
}