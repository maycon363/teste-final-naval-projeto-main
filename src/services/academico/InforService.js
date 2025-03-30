class InforService {
    getAll(){
        const infor = localStorage.getItem('infor')
        return infor ? JSON.parse(infor) : []
    }

    get(id){
        const infor = this.getAll()
        return infor[id]
    }

    create(dados){
        const infor = this.getAll()
        infor.push(dados)
        localStorage.setItem('infor', JSON.stringify(infor))
    }

    update(id, dados){
        const infor = this.getAll()
        infor.splice(id, 1, dados)
        localStorage.setItem('infor', JSON.stringify(infor))
    }

    delete(id){
        const infor = this.getAll()
        infor.splice(id, 1)
        localStorage.setItem('infor', JSON.stringify(infor))
    }
}
const iorService = new InforService();
export default iorService;