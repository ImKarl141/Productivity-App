import { CoffeeIconFooter, FooterIcon, HeartIconFooter } from "../icons"
import './Footer.css'
HeartIconFooter


const Footer = () => {
  return (
    <footer className='app-footer'>Made with&nbsp;{<HeartIconFooter />}&nbsp;and{<CoffeeIconFooter />}by&nbsp;<a href="https://www.linkedin.com/in/carlos-duran-avila-45a13a183/" target='_blank'>Carlos</a></footer>
    // <footer>
    //   <HeartIconFooter />
    //   <CoffeeIconFooter />
    //   <button className='footer'>
    //   </button>
    // </footer>
  )
}
export default Footer