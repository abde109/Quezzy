import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}





const Droplist = ({ roles , selected, setSelected}: { roles: any[], selected: any , setSelected:any }) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-input opacity-80 py-4 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {
                  selected  ? <span className="ml-3 block truncate">{selected.name}</span> : <span className="ml-3 block truncate">Choose What Your Role</span>
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <UnfoldMoreIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {roles.map((role:any) => (
                  <ListboxOption
                    key={role.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-primary text-white' : '',
                        !focus ? 'text-gray-600' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={role}
                  >
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">

                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {role.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckCircleOutlineIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Droplist;