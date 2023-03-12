window.onload = () => {
    const paymentButton = document.querySelector(".payment-button");
    paymentButton.onclick = () => {
        const inputs = document.querySelectorAll(".product-input");
        ImportApi.getInstance().importPayParams.name = inputs[0].value;
        ImportApi.getInstance().importPayParams.amount = inputs[1].value;
        ImportApi.getInstance().requestPay();
    }
}

class ImportApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImportApi();
        }
        return this.#instance;
    }

    IMP = null;

    importInfo = {
        impUid: "imp32372583",
        restApiKey: "8033145384711382",
        restApiSecret: "i732dvnCNOUYKfr7DppXdfqNcsMP3351sJ8KeUknjjkUvuAEMj1AMAlN26hqeB6kTuHVBgv0PGkONxx4"
    }

    importPayParams = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid : 'merchant_'+new Date().getTime(),
        name : '상품명',
        amount : 14000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456'        
    }

    constructor() {
        this.IMP = window.IMP;
        this.IMP.init(this.importInfo.impUid);
    }

    requestPay() {
        this.IMP.request_pay(this.importPayParams, this.responsePay);
    }

    responsePay(resp) {
        if(resp.success) {
            alert("결제 성공");
        } else {
            alert("결제 실패");
        }
    }
}