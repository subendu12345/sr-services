import { LightningElement, track } from 'lwc';

export default class Orders extends LightningElement {
    @track isShowModal =false;
    @track isShowPaidDate = false;
    @track orderDatas;
    @track dealerDatas;
    @track dealerObj={}
    @track nweOrderObj = {
        DealerName:'',
        DealerShopName:'',
        IsDelivered :false,
        OrderDate:'',
        ItemsName :'',
        TotalAmount :0,
        TotalPaid :0,
        PaidDate :'',
        DeliveredDate:'',
        DealerId:''
    }

    connectedCallback(){
        this.getDealerData()
        fetch('/get-orders')
        .then((response) => response.json())
        .then((data) => {
            let tempData=[]
            for (const o of data) {
                o['Status'] = o.IsDelivered ? 'Delivered Done' : 'Not Delivered' ;
                o['DueAmount'] = (parseInt(o.TotalAmount) - parseInt(o.TotalPaid));
                o['DealerName'] = this.dealerObj[o.DealerId].DealerName;
                o['ShopName'] = this.dealerObj[o.DealerId].ShopName;
                tempData.push(o);
            }
            this.orderDatas = tempData;
        });
    }

    getDealerData(){
        fetch('/dealer')
        .then((response) => response.json())
        .then((data) => {
            this.dealerDatas = data
            for (const del of data) {
                this.dealerObj[del._id] = del
            }
        });
    }

    handleOpenModal(){
        this.isShowModal = ! this.isShowModal
    }  

    handleDelerSelect(event){
        this.nweOrderObj.DealerId = event.target.value
    }

    handleInput(event){
        if(event.target.dataset.id === 'IsDelivered'){
            this.nweOrderObj[event.target.dataset.id]= !this.nweOrderObj.IsDelivered;
        }else{
            this.nweOrderObj[event.target.dataset.id]=event.target.value
        }
        
    }

    handleSaveData(){
        fetch('/save-order',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(this.nweOrderObj)
        })
        .then((response) => response.json())
        .then((data) => {
            let tempData = this.orderDatas;
            data['Status'] = data.IsDelivered ? 'Delivered Done' : 'Not Delivered' ;
            data['DueAmount'] = (parseInt(data.TotalAmount) - parseInt(data.TotalPaid));
            data['DealerName'] = this.dealerObj[data.DealerId].DealerName;
            data['ShopName'] = this.dealerObj[data.DealerId].ShopName;
            tempData.push(data);
            this.orderDatas = tempData;
            this.isShowModal = false;
        }).catch(err=>{
            console.log('eer ', err)
        });
    }
}