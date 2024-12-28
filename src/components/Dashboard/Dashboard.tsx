/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { PawPrint } from "lucide-react";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import { userLinks, adminLinks, vendorLinks } from "./constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { data } = useGetProfileQuery("", { pollingInterval: 30000 });
  const user = data?.data;
  const role = user?.role;

  // Determine navigation based on role
  const navigation =
    role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 bg-white dark:bg-gray-800">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="flex grow flex-col gap-y-5 px-6 pb-4">
                  <div className="flex h-16 items-center">
                    <PawPrint />
                  </div>
                  <nav className="flex-1">
                    <ul role="list" className="space-y-1">
                      {navigation.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            className={classNames(
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                              "text-gray-700 dark:text-white"
                            )}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-white dark:bg-gray-800">
        <div className="flex grow flex-col gap-y-5 px-6 pb-4">
          <div className="flex h-16 items-center">
            <PawPrint />
          </div>
          <nav className="flex-1">
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={classNames(
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      "text-gray-700 dark:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
          <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Add your main dashboard content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
