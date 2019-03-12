import {FieldsOptions} from "../../../common/fields-options";

const fieldsOptions : FieldsOptions = {
        name: {
            id: 'name',
            label: 'Nome',
        },
        email: {
            id: 'email',
            label: 'E-mail',
        },
        price: {
            id: 'password',
            label: 'Senha',
            validationMessage: {
                minLength: 6
            }
        }
};

export default fieldsOptions;