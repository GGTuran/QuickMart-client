import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MountainIcon from "@/assets/icons/MountainIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import XIcon from "@/assets/icons/XIIcon";
import MoonIcon from "@/assets/icons/MoonIcon";
import SunIcon from "@/assets/icons/SunIcon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useTheme } from "../ThemeProvider/ThemeProvider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-background text-foreground shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span>QuickMart</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </a>
          <a
            href="/all-products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            All Products
          </a>
          <a
            href="/shops"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            All Shops
          </a>
          <a
            href="/compare"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Compare
          </a>
          <a
            href="/recent-products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Recent Products
          </a>
          <a
            href="/about-us"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </a>
          {token && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.image || undefined} alt={user.name} />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {/* Conditional Links Based on Role */}
                {user.role === "admin" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/user-management">Users</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/category-management">Categories</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/shop-management">Shops</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/all-orders">Orders</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/news-letter">NewsLetter</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/coupon">Coupon</a>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "customer" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/customer/cart">Cart</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/customer/orders">Orders</a>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "vendor" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/manage-products">Products</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/shop">Shop</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/orders">Orders</a>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Sign Up
              </a>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {theme === "dark" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
        </nav>
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          {token && user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="mr-2">
                  <AvatarImage src={user?.image || undefined} alt={user.name} />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {user.role === "admin" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/user-management">Users</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/category-management">Categories</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/shop-management">Shops</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/all-orders">Orders</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/news-letter">NewsLetter</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/admin/coupon">Coupon</a>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "customer" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/customer/cart">Cart</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/customer/orders">Orders</a>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "vendor" && (
                  <>
                    <DropdownMenuItem>
                      <a href="/dashboard">Dashboard</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/get-me">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/manage-products">Products</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/shop">Shop</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/vendor/orders">Orders</a>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex h-16 items-center justify-between px-4">
                <a href="/" className="flex items-center">
                  <MountainIcon className="h-6 w-6 text-primary" />
                  <span className="sr-only">QuickMart</span>
                </a>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <XIcon className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="grid gap-4 px-4 py-6">
                <a
                  href="/all-products"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  All Products
                </a>
                <a
                  href="/shops"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  All Shops
                </a>
                <a
                  href="/compare"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Compare
                </a>
                <a
                  href="/recent-products"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Recent Products
                </a>
                <a
                  href="/about-us"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  About
                </a>
                <button
                  onClick={toggleDarkMode}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {theme === "dark" ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
