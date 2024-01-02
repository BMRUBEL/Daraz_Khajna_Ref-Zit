class CalculationService {
    static calculateLocalCurrency(itm: any, formState: any) {
      // av amount
      itm.item_value_local_curr =
        parseFloat(itm.rec_quantity) * parseFloat(itm.itm_receive_rate);
      itm.cd_amount = CalculationService.cdRdAmountCalculate(
        itm.item_value_local_curr,
        itm.cd_percent
      );
  
      // rd amount
      itm.rd_amount = CalculationService.cdRdAmountCalculate(
        itm.item_value_local_curr,
        itm.rd_percent
      );
  
      // sd amount
      itm.sd_amount = CalculationService.sdAmountCalculate(
        itm.item_value_local_curr,
        itm.cd_amount,
        itm.rd_amount,
        itm.sd_percent
      );
  
      // vat amount
      itm.vat_amount =
        parseFloat(itm.fixed_rate) < 1
          ? CalculationService.vatAmountCalculate(
              itm.item_value_local_curr,
              itm.cd_amount,
              itm.rd_amount,
              itm.sd_amount,
              itm.vat_percent
            )
          : CalculationService.fixedRateCalculate(itm);
  
      // at amount
      itm.at_amount = CalculationService.atAmountCalculation(
        itm.item_value_local_curr,
        itm.cd_amount,
        itm.rd_amount,
        itm.sd_amount,
        itm.at_percent
      );
  
      // total row local currency
      // itm.total_amount_local_curr =
      //   itm.item_value_local_curr + itm.sd_amount + itm.vat_amount;
  
      // total receive local currency
      // formState.total_recv_amt_local_curr = CalculationService.totalAmountLocalCurrency(formState);
      // total sd amount
      // formState.total_sd_amount = CalculationService.totalAmountSd(formState);
      // total vat amount
      // formState.total_vat_amount = CalculationService.totalAmountVat(formState);
      // if (formState.excg_rate) {
      //   itm.item_value_current_curr = CalculationService.calculateCurrentCurrency(
      //     itm,
      //     formState
      //   );
      // } else {
      //   alert("Please!Select Currency");
      // }
    }
  
    static calculateCurrentCurrency(itm: any, formState: any) {
      return (
        parseFloat(itm.rec_quantity) *
        parseFloat(itm.itm_receive_rate) *
        parseFloat(formState.excg_rate)
      );
    }
  
    static cdRdAmountCalculate(av: number, per: string) {
      if (parseFloat(per).toFixed(1) !== '0.0') {
        console.log(`cd amount av ${av} per ${per} cd ${(parseFloat(per) / 100) * av}`);
        return (parseFloat(per) * av) / 100;
      }
      return 0;
    }
  
    static sdAmountCalculate(av: number, cd: number, rd: number, sdPer: any): number {
      if (parseFloat(sdPer).toFixed(1) !== '0.0') {
        return (parseFloat(sdPer) / 100) * (av + cd + rd);
      }
      return 0;
    }
  
    static vatAmountCalculate(av: number, cd: number, rd: number, sd: number, vatPercent: any): number {
      if (parseFloat(vatPercent).toFixed(1) !== '0.0') {
        return (parseFloat(vatPercent) / 100) * (av + cd + rd + sd);
      }
      return 0;
    }
  
    // at calculation
    static atAmountCalculation(av: number, cd: number, rd: number, sd: number, atPer: any): number {
      if (parseFloat(atPer).toFixed(1) !== '0.0') {
        return ((av + cd + rd + sd) * atPer) / 100;
      }
      return 0;
    }

    //ait caculation
    static aitAmountCalculate(av: number, per: string) {
      if (parseFloat(per).toFixed(1) !== '0.0') {
        return (parseFloat(per) * av) / 100;
      }
      return 0;
    }
  
   
    // fixed rate calculation
    static fixedRateCalculate(itm: any) {
      return (
        (itm.rec_quantity * itm.relative_factor * itm.fixed_rate) /
        itm.fixed_rate_uom_rel_fact
      );
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
      return (parseFloat(row.recvQuantity) *
      parseFloat(row.itemReceiveRate) +
      parseFloat(row.vatAmount) 
      +parseFloat(row.cdAmount) 
      +parseFloat(row.rdAmount)
      +parseFloat(row.sdAmount)
      +parseFloat(row.atAmount)
      +parseFloat(row.aitAmount)|| 0);
    }

    // total rd amount 
    static totalAmountRd(formState: any): number {
      return formState.reduce((sum: any, product: any) => {
        let lineTotal: number = parseFloat(product.rdAmount);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
        return sum;
      }, 0);
    }

    // total cd amount 
    static totalAmountCd(formState: any): number {
      return formState.reduce((sum: any, product: any) => {
        let lineTotal: number = parseFloat(product.cdAmount);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
        return sum;
      }, 0);
    }


    // total sd amount 
    static totalAmountSd(formState: any): number {
      return formState.reduce((sum: any, product: any) => {
        let lineTotal: number = parseFloat(product.sdAmount);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
        return sum;
      }, 0);
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
  

    // total ait amount 
    static totalAmountAit(formState: any): number {
      return formState.reduce((sum: any, product: any) => {
        let lineTotal: number = parseFloat(product.aitAmount);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
        return sum;
      }, 0);
    }
  
    // total at amount 
    static totalAmountAt(formState: any): number {
      return formState.reduce((sum: any, product: any) => {
        let lineTotal: number = parseFloat(product.atAmount);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
        return sum;
      }, 0);
    }

    // total 
  
}
  export default CalculationService;
  