import { useState } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src: string;
  hasBorder?: boolean;
}

export function Avatar({ src, hasBorder = true }: AvatarProps) {
  const [a, b] = useState();
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  );
}