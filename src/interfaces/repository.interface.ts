export interface IRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>
  find(query?: Partial<T>): Promise<T[]>
  findOne(query: Partial<T>): Promise<T | null>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<boolean>
}
