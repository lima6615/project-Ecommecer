/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectStyles = {
    control: (baseStyles: any) =>({
        ...baseStyles,
        border: "none",
        boxShadow: "none",
        "&:hover": {
            border: "none",
        },
    }),
    placeholder: (baseStyles: any) =>({
        ...baseStyles,
        color: "var(--dsc-color-font-placeholder)"
    })
};