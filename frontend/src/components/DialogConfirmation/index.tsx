/* eslint-disable @typescript-eslint/ban-types */
import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";


type Props = {
    id: number;
    message: string;
    onDialogAnswer: Function;
}
function DialogConfirmation({id, message, onDialogAnswer} : Props){
    return(
        <div className="dsc-dialog-backgroud" onClick={() => onDialogAnswer(false, id)}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container">
                    <div onClick={() => onDialogAnswer(false, id)}>
                        <ButtonInverse name="Não" />    
                    </div>
                   <div onClick={() => onDialogAnswer(true, id)}>
                        <ButtonPrimary name="Sim" />
                   </div>
                </div>
            </div>
        </div>
    );
}

export default DialogConfirmation;