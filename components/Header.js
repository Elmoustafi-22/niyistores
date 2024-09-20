import { CartContext } from "@/lib/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";


function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const { pathname } = router;
  const {cartProducts} = useContext(CartContext)
  const { data:session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const active = "text-primary transition hover:text-secondary-500 font-bold";
  const inactive = "text-gray-500 transition hover:text-gray-500/75";

  return (
    <>
      <header className="bg-white border-b border-primary border-opacity-40 sticky top-0 z-40">
        <div
          className="mx-auto flex h-16 max-w-screen-2xl items-center gap-8 
        px-4 sm:px-6 text-xl lg:px-8"
        >
          <Link className="flex items-center gap-1 text-primary" href="/">
            <span className="sr-only">Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
            Niyistores
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className={pathname === "/" ? active : inactive}
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className={pathname === "/products" ? active : inactive}
                    href="/products"
                  >
                    {" "}
                    All Products{" "}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {session ? (
                <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
                  <div className="h-9 w-9">
                    <Link
                      href={router.asPath}
                      className={pathname === "/" ? active : inactive}
                      onClick={toggleDropdown}
                    >
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={session.user.image}
                      />
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                          <button
                            onClick={() => signOut()}
                            className="block w-full px-6 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
                  <Link
                    className="text-md font-medium text-text hidden max-md:flex md:hidden"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                </div>
              )}
              <div className="ml-4 flow-root lg:ml-4">
                <Link href="/cart" className="group -m-2 flex items-center p-s">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="ml-2 text-md text-primary font-bold group-hover:text-text">
                    {cartProducts.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>

              <div className="block mr-0 md:hidden">
                <button
                  onClick={toggleMobileNav}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  {isMobileNavOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {isMobileNavOpen && (
                <div className="md:hidden absolute top-24 right-0 bg-white border border-zinc-200 rounded shadow-lg p-6 text-lg">
                  <nav aria-label="Global">
                    <ul className="flex flex-col items-start gap-6 text-md">
                      <li>
                        <Link
                          className={pathname === "/" ? active : inactive}
                          href="/"
                          onClick={toggleMobileNav}
                        >
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={
                            pathname === "/products" ? active : inactive
                          }
                          href="/products"
                          onClick={toggleMobileNav}
                        >
                          All Products
                        </Link>
                      </li>
                      <li>
                        {session && (
                          <button onClick={() => signOut()}>logout</button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="md:hidden w-full flex justify-around items-center my-3 border-b fixed top-12 bg-gray-200 z-50">
        <div className="inline-flex gap-8 p-1">
          <Link href="/" className={pathname === "/" ? active : inactive}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </Link>
          <Link
            href="/products"
            className={pathname === "/products" ? active : inactive}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            Products
          </Link>
          <Link
            href="/cart"
            className={pathname === "/cart" ? active : inactive}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;