import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg'

export function Header(){
    const { signOut, user } = useAuth()
    const navigate = useNavigate()
    
    function handleSignout(){
        navigate('/')
        signOut()
    }

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder

    return(
        <Container>
            <Profile to='/profile'>
                <img src={avatarURL} alt={user.name} />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={handleSignout}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}