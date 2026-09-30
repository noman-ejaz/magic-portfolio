"use client";

import { Column, Flex, Text } from "@once-ui-system/core";
import type React from "react";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  /** Whether nested items are listed underneath each section */
  subItems: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, subItems }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!structure.length) return null;

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {structure
        .filter((section) => section.display)
        .map((section) => (
          <Column key={section.title} gap="12">
            <Flex
              cursor="interactive"
              className={styles.hover}
              gap="8"
              vertical="center"
              onClick={() => scrollTo(section.title, 80)}
            >
              <Flex height="1" minWidth="16" background="neutral-strong" />
              <Text>{section.title}</Text>
            </Flex>
            {subItems &&
              section.items.map((item) => (
                <Flex
                  key={item}
                  l={{ hide: true }}
                  style={{ cursor: "pointer" }}
                  className={styles.hover}
                  gap="12"
                  paddingLeft="24"
                  vertical="center"
                  onClick={() => scrollTo(item, 80)}
                >
                  <Flex height="1" minWidth="8" background="neutral-strong" />
                  <Text>{item}</Text>
                </Flex>
              ))}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
