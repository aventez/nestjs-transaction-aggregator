import { IsEnum, IsOptional } from "class-validator";

export enum BankName {
  REVOLUT = "revolut",
  MONZO = "monzo",
  STERLINGBANK = "sterlingBank",
}

export class GetTransactionsListQuery {
  @IsOptional()
  @IsEnum(BankName)
  source?: BankName;
}
