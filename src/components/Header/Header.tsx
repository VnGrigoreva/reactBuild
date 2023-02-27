import React from 'react';
import styles from './header.module.scss';

export type HeaderProps = {
  title?: string;
};

const Header = (props: HeaderProps) => {
  const {title = 'Hello word'} = props;
  
  return <h1 className={styles.blue}>{title}</h1>;
};

export default Header;
