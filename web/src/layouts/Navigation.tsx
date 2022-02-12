import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useUser } from "@auth0/nextjs-auth0";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";

export interface NavLinkItem {
  text: React.ReactNode;
  href: string;
}

interface Props {
  navLinkItems: Array<NavLinkItem>;
}

const Navigation: React.FC<Props> = ({ navLinkItems }) => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>DrinkJakt</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation">
          <Nav className="me-auto">
            {navLinkItems.map((item) => {
              return (
                <Link key={item.href} href={item.href} passHref>
                  <Nav.Link active={item.href === router.asPath}>
                    {item.text}
                  </Nav.Link>
                </Link>
              );
            })}
          </Nav>

          <Nav>
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    as={"a"}
                    className="d-block link-dark text-decoration--none"
                  >
                    <Image
                      src={user.picture!}
                      alt={user.name!}
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link href="/profile" passHref>
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link href="/api/auth/logout" passHref>
                      <Dropdown.Item>Logout</Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link href="/api/auth/login" passHref>
                  <Nav.Link>Login</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
