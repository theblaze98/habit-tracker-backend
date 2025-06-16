import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { UsersRepository } from './users.repository'
import { createUserDto, updateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(data: createUserDto) {
    const id = uuid()
    return this.usersRepository.create({
      id,
      ...data,
    })
  }

  findOne(query: { email?: string; id?: string }) {
    return this.usersRepository.findOne(query)
  }

  update(id: string, data: updateUserDto) {
    return this.usersRepository.update(id, data)
  }

  delete(id: string) {
    return this.usersRepository.delete(id)
  }
}
