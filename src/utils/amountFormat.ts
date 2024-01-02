export function amount(amt:any){
    if(!isNaN(amt)){
        return parseFloat(amt).toFixed(2);
    }else{
        return 0;
    }
   
}