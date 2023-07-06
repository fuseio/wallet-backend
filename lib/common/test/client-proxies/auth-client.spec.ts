import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { LoginUserDto } from '../../src/dtos';
import { AuthClientProxy } from '../../src/client-proxies';
import { authServiceName } from '../../src/constants/services';

describe('AuthClientProxy', () => {
  let authClientProxy: AuthClientProxy;
  let mockClientProxy: any;
  let firebaseIDToken: string;

  beforeEach(async () => {
    firebaseIDToken = faker.random.alpha();

    mockClientProxy = {
      send: jest.fn(() => of<string>(firebaseIDToken)),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthClientProxy,
        {
          provide: authServiceName,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    authClientProxy = moduleRef.get<AuthClientProxy>(AuthClientProxy);
  });

  describe('login', () => {
    it('should call clientProxy.send with correct arguments', async () => {
      const loginUserDto = new LoginUserDto();
      loginUserDto.firebaseIDToken = faker.random.alpha();
      loginUserDto.walletAddress = faker.finance.ethereumAddress();

      const result = await authClientProxy.login(loginUserDto);

      expect(mockClientProxy.send).toHaveBeenCalledWith('login', loginUserDto);
      expect(result).toBe(firebaseIDToken);
    });
  });
});
