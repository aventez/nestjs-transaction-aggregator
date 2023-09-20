import { IsEnum, IsOptional } from 'class-validator';

export enum BankName {
  REVOLUT = 'revolut',
  MONZO = 'monzo',
  STERLINGBANK = 'sterlingBank',
}

export class GetTransactionsListDto {
  @IsOptional()
  @IsEnum(BankName)
  source?: string;
}
