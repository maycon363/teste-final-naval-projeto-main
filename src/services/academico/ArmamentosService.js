class ArmamentosService {
    getAll(){
        const armamentos = localStorage.getItem('armamentos')
        return armamentos ? JSON.parse(armamentos) : []
    }

    get(id){
        const armamentos = this.getAll()
        return armamentos[id]
    }

    create(dados){
        const armamentos = this.getAll()
        armamentos.push(dados)
        localStorage.setItem('armamentos', JSON.stringify(armamentos))
    }

    update(id, dados){
        const armamentos = this.getAll()
        armamentos.splice(id, 1, dados)
        localStorage.setItem('armamentos', JSON.stringify(armamentos))
    }

    delete(id){
        const armamentos = this.getAll()
        armamentos.splice(id, 1)
        localStorage.setItem('armamentos', JSON.stringify(armamentos))
    }
}

const armamentosService = new ArmamentosService();
export default armamentosService;
