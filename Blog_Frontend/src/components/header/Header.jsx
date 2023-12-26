import "./header.css"
import img from './img.png';

export default function Header() {
  return (
    <div className='header'>
      <div className="headerTitles">
        <span className="headerTitleSm">Laravel</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg"
        src={img} alt="" />
    </div>

  )
}
