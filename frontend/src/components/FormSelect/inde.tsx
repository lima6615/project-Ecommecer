import Select from "react-select";

/* eslint-disable @typescript-eslint/no-explicit-any */
function FormSelect(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { validation, className,
    invalid = "false",
    dirty = "false",
    onTurnDirty,
    ...selectProsp
  } = props;

  function handleBlur() {
    onTurnDirty(props.name);
  }

  return (
    <div
        data-dirty={dirty}
        data-invalid={invalid}
        className="dsc-form-control dsc-form-select-container"    
    >
        <Select
            {...selectProsp}
            onBlur={handleBlur}
        />
    </div>
  );
}

export default FormSelect;
