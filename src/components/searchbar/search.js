'use client';

import React from 'react';
import styles from './SearchInput.module.css'; // Create this CSS module or use global styles if preferred

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.filterInput}
    />
  );
}
