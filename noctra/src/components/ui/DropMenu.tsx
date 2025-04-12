"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface DropMenuProps {
  label: string;
  options: { name: string; onClick: () => void }[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function DropMenu({ label, options, isOpen, onToggle }: DropMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left" show={isOpen}>
      <div>
        <button
          onClick={onToggle}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
        >
          {label}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
      </div>

      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {options.map((option, index) => (
            <div className="px-1 py-1" key={index}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      option.onClick();
                      onToggle();
                    }}
                    className={clsx(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    )}
                  >
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
