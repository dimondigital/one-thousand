export type IApiResExchangeRate  = IApiRes & {

    date: string,
    historical: string,
    info: {
      rate: string,
      timestamp: number
    },
    query: {
      amount: string,
      from: string,
      to: string
    },
    result: string
}

export type IApiResSymbols = IApiRes & {
  symbols: {[key: string]: string}
}

export type IApiRes = {
  success: boolean
}
