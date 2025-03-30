
class ManutencaoService {
    getAll(){
        const manutencao = localStorage.getItem('manutencao')
        return manutencao ? JSON.parse(manutencao) : []
    }

    get(id){
        const manutencao = this.getAll()
        return manutencao[id]
    }

    create(dados){
        const manutencao = this.getAll()
        manutencao.push(dados)
        localStorage.setItem('manutencao', JSON.stringify(manutencao))
    }

    update(id, dados){
        const manutencao = this.getAll()
        manutencao.splice(id, 1, dados)
        localStorage.setItem('manutencao', JSON.stringify(manutencao))
    }

    delete(id){
        const manutencao = this.getAll()
        manutencao.splice(id, 1)
        localStorage.setItem('manutencao', JSON.stringify(manutencao))
    }
}

const MnutencaoService = new ManutencaoService();
export default MnutencaoService;