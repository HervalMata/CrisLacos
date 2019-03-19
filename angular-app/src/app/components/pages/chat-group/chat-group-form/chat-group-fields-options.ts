import {FieldsOptions} from "../../../common/fields-options";

const fieldsOptions : FieldsOptions = {
        name: {
            id: 'name',
            label: 'Nome',
            validationMessage: {
                maxLength: 255,
                minLength: 10
            }
        }
};

export default fieldsOptions;