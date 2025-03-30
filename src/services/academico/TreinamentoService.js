class TreinamentoService {
    getAll(){
        const treinamento = localStorage.getItem('treinamento')
        return treinamento ? JSON.parse(treinamento) : []
    }

    get(id){
        const treinamento = this.getAll()
        return treinamento[id]
    }

    create(dados){
        const treinamento = this.getAll()
        treinamento.push(dados)
        localStorage.setItem('treinamento', JSON.stringify(treinamento))
    }

    update(id, dados){
        const treinamento = this.getAll()
        treinamento.splice(id, 1, dados)
        localStorage.setItem('treinamento', JSON.stringify(treinamento))
    }

    delete(id){
        const treinamento = this.getAll()
        treinamento.splice(id, 1)
        localStorage.setItem('treinamento', JSON.stringify(treinamento))
    }
}
const treinamentoService = new TreinamentoService();
export default treinamentoService;