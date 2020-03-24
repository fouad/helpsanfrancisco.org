import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const Label = styled.label`
  ${tw`font-semibold text-lg mb-2 block`}
`

const Select = styled.select`
  ${tw`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 cursor-pointer px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline`}
`

export const SelectInput = ({ value, onChange, children }) => (
  <div className="inline-block relative w-full">
    <Select value={value} onChange={onChange}>
      {children}
    </Select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
)

export const SearchTextInput = ({ placeholder, value, onChange, onSortByLocation, confirmedLocationPermission }) => (
  <div className="mt-1 flex">
    <div className="relative rounded-md shadow-sm flex-1 mr-3">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <input
        id="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input block pl-10 sm:text-md sm:leading-5 w-full"
      />
    </div>

    <button
      onClick={onSortByLocation}
      className="outline-none focus:shadow-outline bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-300 rounded-md shadow focus:shadow-outline"
      style={{ outline: 'none'}}
    >
      <svg
        height="24px"
        width="24px"
        viewBox="0 0 24 24"
        x="0px"
        y="0px"
        className={`fill-current ${confirmedLocationPermission ? 'text-blue-500' : 'text-gray-400'}`}
      >
        <path fillRule="evenodd" d="M11 18L13 13 18 11 6 6z" />
      </svg>
    </button>
  </div>
)
