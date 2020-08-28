import { Currency } from 'MyModels';

export function getCurrencyFromApiResponse(res: any): Currency {
  return {
    name: res.name,
    value: res.price_usd,
  };
}
/*
Get detailed list of assets.
HTTP Request

GET /v1/assets
Output variables
Variable 	Description
asset_id 	Our asset identifier. Superset of the ISO 4217 currency codes standard.
name 	Display name of the asset.
type_is_crypto 	Boolean value transported as integer; 1 for cryptocurrency assets, 0 otherwise.
data_quote_start 	The date and time of first quote.
data_quote_end 	The date and time for last quote.
data_orderbook_start 	The date and time for first order book.
data_orderbook_end 	The date and time for last order book.
data_trade_start 	The date and time for first trade.
data_trade_end 	The date and time for last trade.
data_quote_count 	The count of quotes.
data_trade_count 	The count of trades.
data_symbols_count 	The count of symbols for given asset.
volume_1hrs_usd 	The usd volume sum within 1 hour for all the symbols.
volume_1day_usd 	The usd volume sum within 1 day for all the symbols.
volume_1mth_usd 	The usd volume sum within 1 month for all the symbols.
price_usd 	The actual usd price.
*/
