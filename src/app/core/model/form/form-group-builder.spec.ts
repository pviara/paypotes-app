import { Form } from '@core/model/form/form';
import { FormGroupBuilder } from '@core/model/form/form-group-builder';

describe('FormGroupBuilder', () => {
    let sut: FormGroupBuilder;
    let dummyForm: Form;

    const dummyLabels = ['firstname', 'lastname', 'age'];

    beforeEach(() => {
        initSut();
    });

    describe('build', () => {
        it('should return as many controls as there are fields in the form', () => {
            const formGroup = sut.build();
            expect(Object.keys(formGroup.getRawValue()).length).toBe(
                dummyLabels.length,
            );
        });
    });

    function initSut(): void {
        initDummyForm();
        sut = new FormGroupBuilder(dummyForm);
    }

    function initDummyForm(): void {
        dummyForm = new Form();
        addDummyFieldsTo(dummyForm);
    }

    function addDummyFieldsTo(dummyForm: Form): void {
        dummyLabels.forEach((label) => dummyForm.addField({ label }));
    }
});
