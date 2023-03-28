import { DeepKeyOf, DeepKeyValue } from "@demo/utils"
import { useFieldValue } from "@demo/form-utils"

export const obj: Obj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 4,
    f: 'address.city',
    v: '45'
  },
}

type Obj = {
  [DataIndex in DeepKeyOf<Person>]: {
    a: number
    b: number
    c: number
    d: {
      e: number
      f: DataIndex
      v: DeepKeyValue<Person, DataIndex>
    }
  }
}[DeepKeyOf<Person>]

interface Person {
  name: string
  age: number
  address: {
    city: string
    state: string
    country: string
  }
  phone: string
  favoriteColor: string
}

// If explicit <Person> type is removed "pnpm tsc --noEmit" in this app will run forever
const val = useFieldValue<Person>('address.city')
console.log(val)
