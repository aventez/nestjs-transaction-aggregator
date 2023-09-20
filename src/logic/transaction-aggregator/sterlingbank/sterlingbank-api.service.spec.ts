import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SterlingBankApiService } from './sterlingbank-api.service';

const mockConfigService = {
  get: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(),
};

describe('SterlingBankApiService', () => {
  let sterlingBankApiService: SterlingBankApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SterlingBankApiService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    sterlingBankApiService = module.get<SterlingBankApiService>(
      SterlingBankApiService,
    );
  });

  it('should be defined', () => {
    expect(sterlingBankApiService).toBeDefined();
  });

  it('should fetch transactions and parse them correctly', async () => {
    mockConfigService.get.mockReturnValue('http://example.com/api');

    sterlingBankApiService['sendRequest'] = jest.fn().mockResolvedValue([
      {
        id: '1',
        currency: 'GBP',
        amount: 10.0,
        direction: 'out',
        narrative: 'Test Description',
        created: new Date(),
        reference: 'Test Reference',
      },
    ]);

    const transactions = await sterlingBankApiService.fetchTransactions();

    // Check that the sendRequest method was called with the correct URL
    expect(sterlingBankApiService['sendRequest']).toHaveBeenCalledWith(
      'http://example.com/api',
    );

    // Check that the transactions were parsed correctly
    expect(transactions).toEqual([
      {
        id: '1',
        created: expect.any(Date),
        amount: {
          value: '10.00',
          currency: 'GBP',
        },
        type: 'CREDIT',
        reference: 'Test Reference',
        metadata: {
          source: 'Sterling Bank',
        },
      },
    ]);
  });
});
