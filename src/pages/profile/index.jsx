import { useState } from 'react'
import { Container, Form, Avatar } from './styles.js'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from 'react-icons/fi'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg'

export function Profile(){
  const { user, updateProfile } = useAuth() 

  const [name, SetName] = useState(user.name)
  const [email, SetEmail] = useState(user.email)
  const [passwordOld, SetPasswordOld] = useState()
  const [passwordNew, SetPasswordNew] = useState()

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder
  const [avatar, SetAvatar] = useState(avatarURL)
  const [avatarFile, setAvatarFile] = useState(null)
  
  const navigate = useNavigate()
  function handleBack(){
    navigate(-1)
  }

  async function handleUpdate(){
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated)

    await updateProfile({ userUpdated, avatarFile })
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    SetAvatar(imagePreview)
  }

  return(
    <Container>
      <header>
        <button type='button' onClick={handleBack} >
          <FiArrowLeft size={24}/>
        </button>
      </header>
      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor='avatar'>
            <FiCamera />
            <input 
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser} 
          value={name}
          onChange={e => SetName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail} 
          value={email}
          onChange={e => SetEmail(e.target.value)}
        />
        <Input
          placeholder="Senha Atual"
          type="password"
          icon={FiLock}
          onChange={e => SetPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova Senha"
          type="password"
          icon={FiLock} 
          onChange={e => SetPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    
    </Container>
  )
}