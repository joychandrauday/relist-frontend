// Navbar component
import NavbarDesign from "./NavbarDesign";

type UserProps = {
  user?: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    avatar: string;
    role: string;
  } | undefined;
};

const Navbar = ({ user }: { user: UserProps["user"] | undefined }) => {
  const session = user ? { user } : null; // Create session object if user exists

  return <NavbarDesign session={session} />;
};

export default Navbar;
