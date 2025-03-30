class MissaoService {
    getAll(){
        const missao = localStorage.getItem('missao')
        return missao ? JSON.parse(missao) : []
    }

    get(id){
        const missao = this.getAll()
        return missao[id]
    }

    create(dados){
        const missao = this.getAll()
        missao.push(dados)
        localStorage.setItem('missao', JSON.stringify(missao))
    }

    update(id, dados){
        const missao = this.getAll()
        missao.splice(id, 1, dados)
        localStorage.setItem('missao', JSON.stringify(missao))
    }

    delete(id){
        const missao = this.getAll()
        missao.splice(id, 1)
        localStorage.setItem('missao', JSON.stringify(missao))
    }
}

const missaoService = new MissaoService();
export default missaoService;