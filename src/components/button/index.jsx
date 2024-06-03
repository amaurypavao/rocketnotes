import  { Container } from './styles'

export function Button({title, loading, ...rest}){
    return(
        <Container 
            type='button'
            { ...rest }
            disabled = { loading }
        >
            { loading ? 'carregando...' : title } 
        </Container>
    )
}