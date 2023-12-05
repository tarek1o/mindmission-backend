export interface IUpdateBaseRepository<T> {
  update(args: any): Promise<T>;
}