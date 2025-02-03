import { Link } from "react-router-dom";
function Header() {
    return (
        <header className=" py-3">
            <Link to="/">
                <div className="container-fluid">
                    <h1><strong>Bool Road</strong></h1>

                </div>
            </Link>

        </header>
    );
}

export default Header;
