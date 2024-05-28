import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-[80%] mx-auto flex justify-between items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link to="/">
          <button className="px-4 py-2 text-green-300 text-lg border border-green-300 rounded uppercase">
            Garage
          </button>
        </Link>
        <Link to="/winners">
          <button className="px-4 py-2 text-purple-500 text-lg border border-purple-500 rounded uppercase">
            Winners
          </button>
        </Link>
      </div>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default Header
