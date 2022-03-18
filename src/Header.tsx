import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav className="header__nav" >
                <ul>
                    <li>
                        <Link to={'/home'}> Home</Link>
                    </li>

                </ul>
            </nav>
        </header>
    )
}