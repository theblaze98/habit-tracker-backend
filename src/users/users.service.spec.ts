import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { createUserDto, updateUserDto } from './dto'
import { v4 as uuidv4 } from 'uuid'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}))

describe('UsersService', () => {
  let service: UsersService
  let repository: jest.Mocked<UsersRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get(UsersRepository)
  })

  it('should create a user with generated UUID', async () => {
    const dto: createUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: '123456',
    }

    const result = { id: 'mock-uuid', ...dto }

    repository.create.mockResolvedValue(result)

    await expect(service.create(dto)).resolves.toEqual(result)
    expect(repository.create).toHaveBeenCalledWith({ id: 'mock-uuid', ...dto })
  })

  it('should find a user by id or email', async () => {
    const query = { email: 'test@example.com' }
    const expectedUser = {
      id: '123',
      email: 'test@example.com',
      username: 'test',
      password: '123456',
    }

    repository.findOne.mockResolvedValue(expectedUser)

    await expect(service.findOne(query)).resolves.toEqual(expectedUser)
    expect(repository.findOne).toHaveBeenCalledWith(query)
  })

  it('should update a user by id', async () => {
    const id = '123'
    const dto: updateUserDto = { username: 'updatedUser' }
    const updatedUser = {
      id,
      email: 'test@example.com',
      password: '123456',
      username: 'updatedUser',
    }

    repository.update.mockResolvedValue(updatedUser)

    await expect(service.update(id, dto)).resolves.toEqual(updatedUser)
    expect(repository.update).toHaveBeenCalledWith(id, dto)
  })

  it('should delete a user by id', async () => {
    const id = '123'
    const deletedUser = {
      id,
      email: 'test@example.com',
      username: 'deletedUser',
      password: '123456',
    }

    repository.delete.mockResolvedValue(true)

    await expect(service.delete(id)).resolves.toBe(true)
    expect(repository.delete).toHaveBeenCalledWith(id)
  })
})
