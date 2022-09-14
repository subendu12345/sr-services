import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isShowDealerTag = false;
    @track isShowHome = false;
    @track isShowOrdersTag = false;

    handleOpenDealerInfo(){
        this.isShowDealerTag = !this.isShowDealerTag;
        this.isShowOrdersTag = false;
        this.isShowHome = false;
    }
    handleOpenHome(){
        this.isShowDealerTag = false;
        this.isShowOrdersTag = false;
        this.isShowHome = true;
        
    }

    handleOpenOrders(){
        this.isShowOrdersTag = true;
        this.isShowHome = false;
        this.isShowDealerTag = false;
    }
}
