/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define role-based navigation
const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Manage Users", href: "/admin/users" },
  { label: "Reports", href: "/admin/reports" },
];
const vendorLinks = [
  { label: "Dashboard", href: "/vendor/dashboard" },
  { label: "My Products", href: "/vendor/products" },
  { label: "Orders", href: "/vendor/orders" },
];
const customerLinks = [
  { label: "Home", href: "/" },
  { label: "My Orders", href: "/customer/orders" },
  { label: "Account Settings", href: "/customer/settings" },
];

export default function Dashboard() {
  const { data: userData } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });

  const userFro = userData?.data;
  const role = userFro?.role; // Dynamic role from backend
  const navigation =
    role === "admin"
      ? adminLinks
      : role === "vendor"
      ? vendorLinks
      : customerLinks;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
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
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
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
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      {/* Add logo or branding */}
                      <h1 className="text-lg font-bold text-gray-700 dark:text-white">
                        Dashboard
                      </h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    "text-gray-700 dark:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-800 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              {/* Add logo or branding */}
              <h1 className="text-lg font-bold text-gray-700 dark:text-white">
                Dashboard
              </h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className={classNames(
                            "text-gray-700 dark:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Welcome, {userFro?.name || "User"}!
              </h2>
            </div>
          </div>
          <main className="py-6 lg:px-8">
            {/* Dynamic Content Based on Role */}
            <div className="px-4 sm:px-6 lg:px-0">
              <p>Your dashboard content goes here.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
