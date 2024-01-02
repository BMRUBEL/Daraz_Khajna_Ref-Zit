class CalculationService {
  static calculateLocalCurrency(itm: any, formState: any) {

    // vat amount
    itm.vat_amount =
      CalculationService.vatAmountCalculate(
        itm.item_value_local_curr,
        itm.vat_percent
      )

      // issue amount
    itm.issue_amount =
    CalculationService.issueAmountCalculate(
      itm.item_value_local_curr,
      itm.vat_percent
    )

  }


  static vatAmountCalculate(vatPercent: any): number {
    if (parseFloat(vatPercent).toFixed(1) !== '0.0') {
      return (parseFloat(vatPercent) / 100);
    }
    return 0;
  }
  static issueAmountCalculate(vatPercent: any): number {
    if (parseFloat(vatPercent).toFixed(1) !== '0.0') {
      return (parseFloat(vatPercent) / 100);
    }
    return 0;
  }


  static totalAmountLocalCurrency(formState: any): number {
    return formState.item_row.reduce((sum: any, product: any) => {
      let lineTotal: number = parseFloat(product.total_amount_local_curr);
      if (!isNaN(lineTotal)) {
        return sum + lineTotal;
      }
      return sum;
    }, 0);
  }

  // total line total amount 
  static totalLineAmount(row: any): number {
    return (
      parseFloat(row.itemReceiveRate) +
      parseFloat(row.vatAmount)
    )
  }


  // total vat amount 
  static totalAmountVat(formState: any): number {
    return formState.reduce((sum: any, product: any) => {
      let lineTotal: number = parseFloat(product.vatAmount);
      if (!isNaN(lineTotal)) {
        return sum + lineTotal;
      }
      return sum;
    }, 0);
  }

   // total Issue amount 
   static totalIssueAmount(formState: any): number {
    return formState.reduce((sum: any, product: any) => {
      let lineTotal: number = parseFloat(product.totalAmountLocalCurr);
      if (!isNaN(lineTotal)) {
        return sum + lineTotal;
      }
      return sum;
    }, 0);
  }


  // total 

}
export default CalculationService;
