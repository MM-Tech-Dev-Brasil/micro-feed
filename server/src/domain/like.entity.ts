import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';
import { ProfileEntity } from './profile.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'user_id' })
  user: ProfileEntity;
}
