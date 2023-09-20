import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RevolutApiService } from './revolut-api.service';

const mockConfigService = {
  get: jest.fn(),
};

const mockHttpService = {
  get: jest.fn(),
};

describe('RevolutApiService', () => {
  let revolutApiService: RevolutApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevolutApiService,
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

    revolutApiService = module.get<RevolutApiService>(RevolutApiService);
  });

  it('should be defined', () => {
    expect(revolutApiService).toBeDefined();
  });

  it('should fetch transactions and parse them correctly', async () => {
    mockConfigService.get.mockReturnValue('http://example.com/api');

    revolutApiService['sendRequest'] = jest.fn().mockResolvedValue([
      {
        id: '1',
        created_at: new Date(),
        completed_at: new Date(),
        state: 'completed',
        amount: {
          value: 10.0,
          currency: 'GBP',
        },
        merchant: undefined,
        counterparty: {
          id: '2',
          name: 'cp',
        },
        reference: 'Test Reference',
      },
    ]);

    const transactions = await revolutApiService.fetchTransactions();

    // Check that the sendRequest method was called with the correct URL
    expect(revolutApiService['sendRequest']).toHaveBeenCalledWith(
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
          source: 'Revolut',
        },
      },
    ]);
  });
});
