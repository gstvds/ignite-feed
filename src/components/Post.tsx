import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';


import styles from './Post.module.css';

interface PostProps {
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  publishedAt: Date;
  content: Array<{ type: string, content: string }>;
}

interface Comment {
  id: string;
  author: {
    avatarUrl: string;
    name: string;
  };
  content: string;
  commentedAt: Date;
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const formattedDate = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedRelative = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });
  const isCommentEmpty = commentText.length === 0;

  function handleCreateNewComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComments((previousComment) => {
      return [
        ...previousComment,
        {
          id: `${Math.random() * 1000}`,
          author: {
            avatarUrl: 'https://github.com/gstvds.png',
            name: 'Gustavo da Silva'
          },
          content: commentText,
          commentedAt: new Date(),
        }
      ]
    });
    setCommentText('');
  }

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(event.target.value);
  }

  function handleDeleteComment(id: string) {
    const commentsWithoutDeleted = comments.filter((comment) => comment.id !== id);
    setComments(commentsWithoutDeleted);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={formattedDate} dateTime={publishedAt.toISOString()}>
          Publicado {publishedRelative}
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map((item) => {
            if (item.type === 'paragraph') {
              return <p key={item.content}>{item.content}</p>
            } else if (item.type === 'link') {
              return <a key={item.content} href='#'>{item.content}</a>
            }
          })
        }
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>
          Deixe seu feedback
        </strong>
        <textarea
          required
          name="comment"
          placeholder="Deixe um comentário"
          value={commentText}
          onChange={handleCommentChange}
        />

        <footer>
          <button type="submit" disabled={isCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}