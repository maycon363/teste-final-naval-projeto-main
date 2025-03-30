class ComandatesService {
    getAll(){
        const comandantes = localStorage.getItem('comandantes')
        return comandantes ? JSON.parse(comandantes) : []
    }

    get(id){
        const comandantes = this.getAll()
        return comandantes[id]
    }

    create(dados){
        const comandantes = this.getAll()
        comandantes.push(dados)
        localStorage.setItem('comandantes', JSON.stringify(comandantes))
    }

    update(id, dados){
        const comandantes = this.getAll()
        comandantes.splice(id, 1, dados)
        localStorage.setItem('comandantes', JSON.stringify(comandantes))
    }

    delete(id){
        const comandantes = this.getAll()
        comandantes.splice(id, 1)
        localStorage.setItem('comandantes', JSON.stringify(comandantes))
    }
}

const comandantesService = new ComandatesService();
export default comandantesService;
