import { ClientProxy } from '@nestjs/microservices';
import { TestingModule, Test } from '@nestjs/testing';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUserDto,
  GetUserByDto,
} from 'lib/common/src';
import { UserClientProxy } from '../../src/client-proxies';
import { userServiceName } from '../../src/constants/services';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

describe('UserClientProxy', () => {
  let userClientProxy: UserClientProxy;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserClientProxy,
        {
          provide: userServiceName,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    userClientProxy = module.get<UserClientProxy>(UserClientProxy);
    clientProxy = module.get<ClientProxy>(userServiceName);
  });

  describe('createUser', () => {
    it('should send create_user event with provided data', async () => {
      const createUserDto: CreateUserDto = {
        query: { phoneNumber: faker.phone.number() },
        data: {
          phoneNumber: faker.phone.number(),
          walletAddress: faker.finance.ethereumAddress(),
        },
      };
      const expectedUser = { id: '1' };

      jest.spyOn(clientProxy, 'send').mockReturnValue(of(expectedUser));

      const result = await userClientProxy.createUser(createUserDto);

      expect(clientProxy.send).toHaveBeenCalledWith(
        'create_user',
        createUserDto,
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should send update_user event with provided data', async () => {
      const updateUserDto: UpdateUserDto = {
        avatarURL: faker.image.avatar(),
      };
      const expectedUser: any = { id: '1', name: 'Jane Doe' };

      jest.spyOn(clientProxy, 'send').mockReturnValue(of(expectedUser));

      const result = await userClientProxy.updateUser(updateUserDto);

      expect(clientProxy.send).toHaveBeenCalledWith(
        'update_user',
        updateUserDto,
      );
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findUser', () => {
    it('should send get_user event with provided data', async () => {
      const getUserDto: GetUserDto = { id: '1' };
      const expectedUser: any = { avatarURL: 'John Doe' };

      jest.spyOn(clientProxy, 'send').mockReturnValue(of(expectedUser));

      const result = await userClientProxy.findUser(getUserDto);

      expect(clientProxy.send).toHaveBeenCalledWith('get_user', getUserDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findUserBy', () => {
    it('should send get_user_by event with provided data', async () => {
      const getUserByDto: GetUserByDto = { phoneNumber: faker.phone.number() };
      const expectedUser: any = { id: '1', name: 'John Doe' };

      jest.spyOn(clientProxy, 'send').mockReturnValue(of(expectedUser));

      const result = await userClientProxy.findUserBy(getUserByDto);

      expect(clientProxy.send).toHaveBeenCalledWith(
        'get_user_by',
        getUserByDto,
      );
      expect(result).toEqual(expectedUser);
    });
  });
});
