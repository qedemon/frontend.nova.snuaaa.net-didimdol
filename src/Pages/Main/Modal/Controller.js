class ModalController{
    constructor(){

    }
    setSetChildren(setChildren){
        this.setChildren=setChildren;
    }
    setSetOpen(setOpen){
        this.setOpen=setOpen;
    }
    open(){
        this.setOpen && this.setOpen(true);
    }
    close(){
        this.setOpen && this.setOpen(false);
    }
}

export default ModalController;