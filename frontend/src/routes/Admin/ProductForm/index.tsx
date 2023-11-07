/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/inde";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-service";

function ProductForm() {

  const params = useParams();

  const isEditing = params.id !== 'create';

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "nome",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function(value: any){
        return Number(value) > 0;
      },
      message: "Favor informe um valor positivo!"
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem",
    },
  });

  useEffect(() => {
    if(isEditing){
      productService.findById(Number(params.id))
        .then(response => {
          setFormData(forms.updateAll(formData, response.data));
        });
    }
  }, []);

  function handleInputChange(event: any) {
    const dataUpdated = forms.updateAndValidate(formData, event.target.name, event.target.value);
    setFormData(dataUpdated);
  }

  function handleTurnDirty(name: string){
      const newFormData = forms.dartyAndValidate(formData, name);
      setFormData(newFormData)
  }

  return (
    <section id="product-form-section" className="dsc-container">
      <div className="dsc-product-form-container">
        <form className="dsc-card dsc-form">
          <h2>Dados do produto</h2>
          <div className="dsc-product-form-controls-container">
            <div>
              <FormInput
                {...formData.name}
                autoComplete="false"
                className="dsc-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="dsc-form-error">{formData.name.message}</div>
            </div>
            <div>
              <FormInput
                {...formData.price}
                autoComplete="false"
                className="dsc-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="dsc-form-error">{formData.price.message}</div>
            </div>
            <div>
            <FormInput
                {...formData.imgUrl}
                autoComplete="false"
                className="dsc-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="dsc-product-form-buttons">
            <Link to={"/admin/products"}>
              <button type="reset" className="dsc-btn dsc-btn-white">
                Cancelar
              </button>
            </Link>
            <button type="submit" className="dsc-btn dsc-btn-blue">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
