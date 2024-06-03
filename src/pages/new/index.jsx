import { Container, Form } from './styles'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { Textarea } from '../../components/textarea'
import { NoteItem } from '../../components/noteitem'
import { Section } from '../../components/section'
import { Button } from '../../components/button'
import { ButtonText } from '../../components/buttonText'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../services/api'

export function New(){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }
  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    if(!title){
      return alert('O título é obrigatório.')
    }

    if(newTag){
      return alert('Há tags não adicionadas. Por favor verifique.')
    }

    if(newLink){
      return alert('Há links nnao adicionados. Por favor verifique.')
    }
    
    await api.post('/notes', {
      title,
      description,
      tags,
      links
    })
    alert('Nota criada com sucesso!')
    navigate(-1)
  }

  return(
    <Container>
        <Header />
        <main>
          <Form>
            <header>
              <h1>Criar nota</h1>
              <ButtonText title='Voltar' onClick={handleBack} />
            </header>
            <Input
              placeholder="Título"
              onChange={e => setTitle(e.target.value)} />
            <Textarea 
              placeholder="Observações"
              onChange={e => setDescription(e.target.value)} />

            <Section title='Links úteis'>
              {
                links.map((link, index) => (
                  <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)} />
                ))
              }
              <NoteItem
              isNew
              placeholder='Novo Link'
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink} />
            </Section>

            <Section title='Marcadores'>
              <div className='tags'>
                 {
                tags.map((tag, index) => (
                  <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)} />
                ))
              }
              <NoteItem
              isNew
              placeholder='Nova tag'
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onClick={handleAddTag} />
              </div>
            </Section>
            <Button title='salvar' onClick={handleNewNote}/>
          </Form>
        </main>
    </Container>
  )
}