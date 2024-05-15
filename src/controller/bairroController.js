let bairros = ['Ipanema', 'Leblon', 'Copacabana']

const getBairros = (req, res) => {
    res.status(200).json(bairros)
}

const adicionarBairro = (req, res) => {
    const bairro = req.body

    bairros.push(bairro.bairro)
    res.status(200).json(bairros)
}

const excluirBairro = (req, res) => {
    const bairro = req.params.id
    const index = bairros.findIndex(b => b.toLowerCase() === bairro)

    if (index === -1) {
        return res.status(404).json({ message: 'Bairro não encontrado' })
    }

    bairros.splice(index, 1)
    res.status(200).json({ message: 'Bairro excluído' })
}

export default { getBairros, adicionarBairro, excluirBairro }