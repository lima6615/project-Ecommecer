import "./styles.css";
import * as productService from "../../../services/product-service";
import iditIcon from "../../../assets/editar.svg";
import deleteIcon from "../../../assets/remover.svg";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import ButtonInverse from "../../../components/ButtonInverse";
import { useNavigate } from "react-router-dom";

type QueryParams = {
  page: number;
  name: string;
};
function ProductsListing() {

  const navigate = useNavigate();

  const [dialogInfoData, setDialogInfoData] = useState({
     visiable: false,
     message: ""
  })

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visiable: false,
    id: 0,
    message: "Tem certeza ?"
 })

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  function handleNewProductClick(){
      navigate("/admin/product/create");
  }

  function handleSearch(textSearch: string) {
    setProducts([]);
    setQueryParams({ ...queryParams, page: 0, name: textSearch });
  }

  function handlePage(){
    setQueryParams({...queryParams, page: queryParams.page + 1})
  }

  function handleDialogInfoClose(){
    setDialogInfoData({...dialogInfoData, visiable: false})
  }

  function handleDeleteClick(productId: number){
    setDialogConfirmationData({...dialogConfirmationData, id: productId, visiable: true})
  }

  function handleDialogConfirmationAnswer(answer: boolean, productId: number){

    if(answer){
      productService.deleteById(productId)
      .then(() => {
        setProducts([]);
        setQueryParams({ ...queryParams, page: 0 });
        setDialogInfoData({
          visiable: true,
          message: "Operação com Sucesso!"
        })
      })
      .catch(error => {
        setDialogInfoData({
          visiable: true,
          message: error.response.data.error
        })
      });
    }

    setDialogConfirmationData({...dialogConfirmationData, visiable:false})
  }

  return (
    <>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

        <div className="dsc-btn-page-container dsc-mb20">
          <div onClick={handleNewProductClick}>
              <ButtonInverse name="Novo" />
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
              <tr>
                  <th className="dsc-tb576">ID</th>
                  <th></th>
                  <th className="dsc-tb768">Preço</th>
                  <th className="dsc-txt-left">Nome</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                  <tr key={product.id}>
                    <td className="dsc-tb576">{product.id}</td>
                    <td>
                        <img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name} />
                    </td>
                    <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                    <td className="dsc-txt-left">{product.name}</td>
                    <td>
                        <img  className="dsc-product-listing-btn" src={iditIcon} alt="Editar" />      
                    </td>
                    <td>
                        <img onClick={() => handleDeleteClick(product.id)} className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" />
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>

        <div onClick={handlePage}>
          {
              !isLastPage && 
              <Pagination name="Carregar mais" />
          }
        </div>
      </section>

      {
        dialogInfoData.visiable &&
        <DialogInfo 
          message={dialogInfoData.message} 
          onDialogClose={handleDialogInfoClose}
        />
      } 

      {
        dialogConfirmationData.visiable &&
        <DialogConfirmation
          id={dialogConfirmationData.id}
          message={dialogConfirmationData.message} 
          onDialogAnswer={handleDialogConfirmationAnswer}
        />
      } 
    </>
  );
}

export default ProductsListing;
