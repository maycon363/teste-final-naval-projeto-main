class ConstrucaoService {
    getAll(){
        const construcao = localStorage.getItem('construcao')
        return construcao ? JSON.parse(construcao) : []
    }

    get(id){
        const construcao = this.getAll()
        return construcao[id]
    }

    create(dados){
        const construcao = this.getAll()
        construcao.push(dados)
        localStorage.setItem('construcao', JSON.stringify(construcao))
    }

    update(id, dados){
        const construcao = this.getAll()
        construcao.splice(id, 1, dados)
        localStorage.setItem('construcao', JSON.stringify(construcao))
    }

    delete(id){
        const construcao = this.getAll()
        construcao.splice(id, 1)
        localStorage.setItem('construcao', JSON.stringify(construcao))
    }
}

const cnstrucaoService = new ConstrucaoService();
export default cnstrucaoService;