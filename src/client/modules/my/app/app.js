import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isShowDealerTag = false;
    @track isShowHome = false;
    handleOpenDealerInfo(){
        this.isShowDealerTag = !this.isShowDealerTag;
    }
    handleOpenHome(){
        this.isShowDealerTag = false;
        this.isShowHome = true;
    }
}
