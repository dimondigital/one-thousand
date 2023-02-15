

export namespace ExchangerateHost {

  export type ApiReqExchangeRate = {
    from: string,
    to: string,
    amount: string
  }

  export type ApiResExchangeRate  = ApiRes & {

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

export type ApiResSymbols = ApiRes & {
  symbols: {[key: string]: string}
}

export type ApiRes = {
  success: boolean
}

}
