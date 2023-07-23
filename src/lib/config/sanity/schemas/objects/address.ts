import { defineType, type TypedObject } from 'sanity';

export const Address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  fields: [
    {
      name: 'street',
      title: 'Street',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: [
          { title: 'Alabama', value: 'AL' },
          { title: 'Alaska', value: 'AK' },
          { title: 'Arizona', value: 'AZ' },
          { title: 'Arkansas', value: 'AR' },
          { title: 'California', value: 'CA' },
          { title: 'Colorado', value: 'CO' },
          { title: 'Connecticut', value: 'CT' },
          { title: 'Delaware', value: 'DE' },
          { title: 'District Of Columbia', value: 'DC' },
          { title: 'Florida', value: 'FL' },
          { title: 'Georgia', value: 'GA' },
          { title: 'Hawaii', value: 'HI' },
          { title: 'Idaho', value: 'ID' },
          { title: 'Illinois', value: 'IL' },
          { title: 'Indiana', value: 'IN' },
          { title: 'Iowa', value: 'IA' },
          { title: 'Kansas', value: 'KS' },
          { title: 'Kentucky', value: 'KY' },
          { title: 'Louisiana', value: 'LA' },
          { title: 'Maine', value: 'ME' },
          { title: 'Maryland', value: 'MD' },
          { title: 'Massachusetts', value: 'MA' },
          { title: 'Michigan', value: 'MI' },
          { title: 'Minnesota', value: 'MN' },
          { title: 'Mississippi', value: 'MS' },
          { title: 'Missouri', value: 'MO' },
          { title: 'Montana', value: 'MT' },
          { title: 'Nebraska', value: 'NE' },
          { title: 'Nevada', value: 'NV' },
          { title: 'New Hampshire', value: 'NH' },
          { title: 'New Jersey', value: 'NJ' },
          { title: 'New Mexico', value: 'NM' },
          { title: 'New York', value: 'NY' },
          { title: 'North Carolina', value: 'NC' },
          { title: 'North Dakota', value: 'ND' },
          { title: 'Ohio', value: 'OH' },
          { title: 'Oklahoma', value: 'OK' },
          { title: 'Oregon', value: 'OR' },
          { title: 'Pennsylvania', value: 'PA' },
          { title: 'Rhode Island', value: 'RI' },
          { title: 'South Carolina', value: 'SC' },
          { title: 'South Dakota', value: 'SD' },
          { title: 'Tennessee', value: 'TN' },
          { title: 'Texas', value: 'TX' },
          { title: 'Utah', value: 'UT' },
          { title: 'Vermont', value: 'VT' },
          { title: 'Virginia', value: 'VA' },
          { title: 'Washington', value: 'WA' },
          { title: 'West Virginia', value: 'WV' },
          { title: 'Wisconsin', value: 'WI' },
          { title: 'Wyoming', value: 'WY' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'zip',
      title: 'Zip',
      type: 'string',
      validation: (Rule) => Rule.required()
    }
  ]
});

export type Address = TypedObject & {
  _type: (typeof Address)['name'];
  street: string;
  city: string;
  state:
    | 'AL'
    | 'AK'
    | 'AZ'
    | 'AR'
    | 'CA'
    | 'CO'
    | 'CT'
    | 'DE'
    | 'DC'
    | 'FL'
    | 'GA'
    | 'HI'
    | 'ID'
    | 'IL'
    | 'IN'
    | 'IA'
    | 'KS'
    | 'KY'
    | 'LA'
    | 'ME'
    | 'MD'
    | 'MA'
    | 'MI'
    | 'MN'
    | 'MS'
    | 'MO'
    | 'MT'
    | 'NE'
    | 'NV'
    | 'NH'
    | 'NJ'
    | 'NM'
    | 'NY'
    | 'NC'
    | 'ND'
    | 'OH'
    | 'OK'
    | 'OR'
    | 'PA'
    | 'RI'
    | 'SC'
    | 'SD'
    | 'TN'
    | 'TX'
    | 'UT'
    | 'VT'
    | 'VA'
    | 'WA'
    | 'WV'
    | 'WI'
    | 'WY';
  zip: string;
};
