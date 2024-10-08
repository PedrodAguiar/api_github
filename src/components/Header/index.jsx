import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../axios/config';

const Header = ()=>{


  const  { id }  = useParams(); 
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIssue = async () => {
      try {
        console.log(id)
        const resposta = await api.get(`/repos/rocketseat-education/reactjs-github-blog-challenge/issues/${id}`);
        console.log(resposta)
        setIssue(resposta.data);
      } catch (error) {
        console.error('Erro ao buscar a issue:', error);
      } finally {
        setLoading(false);
      }
    };

    getIssue();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!issue) return <p>Issue não encontrada.</p>;
    return(
        <header>
            <div className="issue__title">
                <h1>{issue.title}</h1>
                <Link to='/' className='btn'>Voltar pra Home</Link>
            </div>
        </header>
    )
}

export default Header