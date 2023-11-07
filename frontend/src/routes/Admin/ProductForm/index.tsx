/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/inde";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-service";
import * as categoryService from "../../../services/category-service";
import FormTextArea from "../../../components/FormTextArea/inde";
import { CategoryDTO } from "../../../models/category";
import FormSelect from "../../../components/FormSelect/inde";
import { selectStyles } from "../../../utils/select";

function ProductForm() {

  const params = useParams();
  
  const navigate = useNavigate();

  const isEditing = params.id !== 'create';

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "nome",
      validation: function(value: string){
        return /^.{3,80}$/.test(value);
      },
      message: "Favor informar um nome de 3 a 80 caracteres"
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
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function(value: string){
        return /^.{10,}$/.test(value);
      },
      message: "Favor informar uma descrição no mínimo 10 caracteres"
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function(value: CategoryDTO[]){
        return value.length > 0;
      },
      message: "Informe pelo menos uma categoria"
    }
  });

  useEffect(() => {
    categoryService.findAllRequest()
      .then(response => {
        setCategories(response.data);
      })
  }, []);

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

  function handleSubmit(event: any){
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);
    if(forms.hasAnyInvalid(formDataValidated)){
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formData);
    if(isEditing){
      requestBody.id = params.id;
    }

    const request = isEditing 
        ? productService.updateRequest(requestBody)
        : productService.insertRequest(requestBody);

    request
      .then(() => {
        navigate('/admin/products');
      });
  }

  return (
    <section id="product-form-section" className="dsc-container">
      <div className="dsc-product-form-container">
        <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
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
            <div>
              <FormSelect
                  {...formData.categories}
                  styles={selectStyles}
                  options={categories} 
                  isMulti 
                  onChange={(obj: any) => {
                    const newData = forms.updateAndValidate(formData, "categories", obj);
                    setFormData(newData);
                  }}
                  onTurnDirty={handleTurnDirty}
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
              />
              <div className="dsc-form-error">{formData.categories.message}</div>
            </div>
            <div>
              <FormTextArea
                  {...formData.description}
                  autoComplete="false"
                  className="dsc-textarea dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.description.message}</div>
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
