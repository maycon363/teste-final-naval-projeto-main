class ServicoService {
    getAll(){
        const servico = localStorage.getItem('servico')
        return servico ? JSON.parse(servico) : []
    }

    get(id){
        const servico = this.getAll()
        return servico[id]
    }

    create(dados){
        const servico = this.getAll()
        servico.push(dados)
        localStorage.setItem('servico', JSON.stringify(servico))
    }

    update(id, dados){
        const servico = this.getAll()
        servico.splice(id, 1, dados)
        localStorage.setItem('servico', JSON.stringify(servico))
    }

    delete(id){
        const servico = this.getAll()
        servico.splice(id, 1)
        localStorage.setItem('servico', JSON.stringify(servico))
    }
}

const servicoService = new ServicoService();
export default servicoService;