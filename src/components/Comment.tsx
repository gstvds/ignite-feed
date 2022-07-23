import { ThumbsUp, Trash } from 'phosphor-react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { useState } from 'react';

interface CommentProps {
  id: string;
  author: {
    avatarUrl: string;
    name: string;
  };
  content: string;
  commentedAt: Date;
  onDelete: (id: string) => void;
}

export function Comment({ id, author, content, commentedAt, onDelete }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);
  const formattedDate = format(commentedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const commentedRelative = formatDistanceToNow(commentedAt, { locale: ptBR });

  function handleDeleteComment() {
    onDelete(id);
  }

  function handleLike() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title={formattedDate} dateTime={commentedAt.toISOString()}>
                Cerca de {commentedRelative} atrás
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>
            {content}
          </p>
        </div>

        <footer>
          <button onClick={handleLike}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}