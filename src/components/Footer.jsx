import { CoffeeIconFooter, FooterIcon, HeartIconFooter } from "../icons"
import './Footer.css'
HeartIconFooter


const Footer = () => {
  return (
    <footer className='app-footer'>Made with&nbsp;{<HeartIconFooter />}&nbsp;and{<CoffeeIconFooter />}by&nbsp;<a href="https://github.com/ImKarl141" target='_blank' title="Visit my GitHub">Carlos</a></footer>
  )
}
export default Footer