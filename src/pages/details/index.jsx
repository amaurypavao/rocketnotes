import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Links, Content } from './styles.js'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { ButtonText } from '../../components/buttonText'
import { Section } from '../../components/section'
import { Tag } from '../../components/tag'


export function Details(){
  
  const [data, setData] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm('Deseja mesmo remover?')
    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNote()
  },[])

  return(
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title='Excluir nota' onClick={handleRemove} />

            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title='links úteis'>
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target='_blank'>{link.url}</a>
                      </li>
                    ))
                  }
                  
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title='Marcadores'>
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} 
                      title={tag.name} />
                  ))
                }
              </Section>
            }
            <Button title="voltar" onClick={handleBack}/>
          </Content>
        </main>
      }
    </Container>
  )
}