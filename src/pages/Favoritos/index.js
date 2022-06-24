import './favoritos.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@filmes');
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id != id);
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('@filmes', JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso!');
    }

    if (filmes.length === 0) {
        return (
            <div className='meus-filmes'>
                <span>Você não possui nenhum filme salvo :(</span>
                <Link to="/">Ver todos os filmes</Link>
            </div>
        )
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;