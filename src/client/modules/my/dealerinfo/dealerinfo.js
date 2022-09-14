import { LightningElement, track } from 'lwc';

export default class Dealerinfo extends LightningElement {
    @track isShowModal =false;
    @track nweDealerObj = {
        DealerName:'',
        ShopName :'',
        DealerAddress :'',
        DealerEmail :'',
        DealerPhoneNumber :''
    }
    @track dealerDatas;
    connectedCallback(){
        fetch('/dealer')
        .then((response) => response.json())
        .then((data) => {
            this.dealerDatas = data
        });
        
    }

    handleOpenModal(){
        this.isShowModal = ! this.isShowModal
    }

    handleSaveData(){
        console.log('nweDealerObj ', this.nweDealerObj);
        fetch('/signup',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(this.nweDealerObj)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let tempData = this.dealerDatas;
            tempData.push(data);
            this.dealerDatas = tempData;
            this.isShowModal = false;
        }).catch(err=>{
            console.log('eer ', err)
        });
    }

    handleInput(event){
        this.nweDealerObj[event.target.dataset.id]=event.target.value
    }

}