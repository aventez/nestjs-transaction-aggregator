import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MonzoApiService } from './monzo-api.service';

const mockConfigService = {
  get: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(),
};

describe('MonzoApiService', () => {
  let monzoApiService: MonzoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonzoApiService,
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

    monzoApiService = module.get<MonzoApiService>(MonzoApiService);
  });

  it('should be defined', () => {
    expect(monzoApiService).toBeDefined();
  });

  it('should fetch transactions and parse them correctly', async () => {
    mockConfigService.get.mockReturnValue('http://example.com/api');

    monzoApiService['sendRequest'] = jest.fn().mockResolvedValue([
      {
        id: '1',
        created: new Date(),
        description: 'Test Transaction',
        amount: 1000,
        currency: 'GBP',
        metadata: {
          reference: 'Test Reference',
        },
      },
    ]);

    const transactions = await monzoApiService.fetchTransactions();

    // Check that the sendRequest method was called with the correct URL
    expect(monzoApiService['sendRequest']).toHaveBeenCalledWith(
      'http://example.com/api',
    );

    // Check that the transactions were parsed correctly
    expect(transactions).toEqual([
      {
        id: '1',
        created: expect.any(Date),
        description: 'Test Transaction',
        amount: {
          value: '10.00',
          currency: 'GBP',
        },
        type: 'CREDIT',
        reference: 'Test Reference',
        metadata: {
          source: 'Monzo',
        },
      },
    ]);
  });
});
