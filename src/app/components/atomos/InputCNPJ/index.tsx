import { TextInput } from '@mantine/core'

import { UseFormReturnType } from '@mantine/form'
import { ProdutorType } from '../../../../../types/interfaces/produtores'
import {
  CnpjMaskedTextField,
  removeAllEspetialCaracters,
} from '../../../../../utils/validates'

interface InputCnpjProps {
  form: UseFormReturnType<ProdutorType>
  focus?: boolean
}

function InputCnpj({ form, focus }: InputCnpjProps) {
  return (
    <TextInput
      data-autofocus={focus}
      {...form.getInputProps('documento')}
      value={CnpjMaskedTextField(form.getInputProps('documento')?.value)}
      onChange={(event) =>
        form.setFieldValue(
          'documento',
          removeAllEspetialCaracters(event.target.value)
        )
      }
      label={'CNPJ'}
      maxLength={18}
      error={form.getInputProps('documento')?.error}
      placeholder={'00.000.000/0000-00'}
    />
  )
}

export default InputCnpj
