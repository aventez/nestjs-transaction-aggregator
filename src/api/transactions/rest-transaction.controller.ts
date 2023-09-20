import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UnifiedTransaction } from '../../models/transaction/unified-transaction.model';
import { GetTransactionsListDto } from './dto/get-transactions-list.dto';
import { RestTransactionService } from './rest-transaction.service';

@Controller('transactions')
@ApiTags('transactions')
export class RestTransactionController {
  constructor(
    private readonly restTransactionService: RestTransactionService,
  ) {}

  @Get('')
  @ApiQuery({
    name: 'source',
    type: String,
    description: 'Transaction source',
    required: false,
  })
  @ApiOperation({ summary: 'Get transactions list' })
  @ApiOkResponse({
    description: 'Returned transactions list',
  })
  async getTransactionsList(
    @Query() query: GetTransactionsListDto,
  ): Promise<UnifiedTransaction[]> {
    return this.restTransactionService.getTransactionsList(query.source);
  }
}
