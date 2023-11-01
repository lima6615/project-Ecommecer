import "./styles.css";
import "../HeaderClient/styles.css";
import homeIcon from "../../assets/home.svg";
import productsIcon from "../../assets/products.svg";

function HeaderAdmin() {
  return (
    <header className="dsc-header-admin">
            <nav className="dsc-container">
                <h1>Admin</h1>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container"> 
                        <div className="dsc-menu-item">
                            <img src={homeIcon} alt="Inicio" />
                            <p>Início</p>
                        </div>
                        <div className="dsc-menu-item">
                             <img src={productsIcon} alt="Cadastro de produtos" />
                            <p className="dsc-menu-item-active">Produtos</p>
                        </div>
                    </div>
                    <div className="dsc-logged-user">
                        <p>Maria Silva</p>
                        <a href="#">Entrar</a>
                    </div>
                </div>
            </nav>
        </header>
  );
}

export default HeaderAdmin;
