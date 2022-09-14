import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isShowDealerTag = false;
    @track isShowHome = false;
    @track isShowOrdersTag = false;
    @track isShowLoginRegTag = false;
    @track isShowSignupTag = false;
    @track isLoggedinuser = false;
    @track logindataInfo={
        UserName:'',
        Password:''
    }
    @track nweUserObj = {
        FullName:'',
        UserName :'',
        Email :'',
        Password :''
    }

    handleInput(event){
        this.nweUserObj[event.target.dataset.id]=event.target.value
    }
    handleInputForLogin(event){
        this.logindataInfo[event.target.dataset.id]=event.target.value
    }
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

    connectedCallback(){
        if(localStorage.getItem('username') && localStorage.getItem('userId')){
            this.isLoggedinuser = true
        }
    }

    handleOpenOrders(){
        this.isShowOrdersTag = true;
        this.isShowHome = false;
        this.isShowDealerTag = false;
    }
    handleLogin(){
        this.isShowLoginRegTag = true
        this.isShowOrdersTag = false;
        this.isShowHome = false;
        this.isShowDealerTag = false;
    }

    handleOpenModal(){
        this.isShowLoginRegTag = ! this.isShowLoginRegTag;
    }  

    handleLoginUser(){
        fetch(`/get-user?username=${this.logindataInfo.UserName}&password=${this.logindataInfo.Password}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(!data.length){
                alert('Username and password wrong')
            }else{
                localStorage.setItem('username',data[0].UserName)
                localStorage.setItem('userId',data[0]._id)
                setInterval(() => {
                    localStorage.clear();
                }, 90000);
                this.isLoggedinuser = true;
                this.isShowLoginRegTag = false
                alert('Successfully logged in.')
            }

        }).catch(err=>{
            alert('Username and password wrong')
            console.log('eer ', err)
        });
    }

    handleOpenSighupModal(){
        this.isShowSignupTag = !this.isShowSignupTag;
        this.isShowLoginRegTag = false;
    }

    handleSignupUser(){
        fetch('/create-user',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(this.nweUserObj)
        })
        .then((response) => response.json())
        .then((data) => {
            this.isShowLoginRegTag = true;
            this.isShowSignupTag = false;
            console.log(data)
        }).catch(err=>{
            console.log('eer ', err)
        });
    }
}
