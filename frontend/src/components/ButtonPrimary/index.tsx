import "./styles.css";

type Props = {
  name: string;
};

function ButtonPrimary({ name }: Props) {
  return (
    <div className="dsc-btn dsc-btn-blue">{name}</div>
  ) 
}

export default ButtonPrimary;
