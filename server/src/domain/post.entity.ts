import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LikeEntity } from './like.entity';
import { ProfileEntity } from './profile.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author_id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => ProfileEntity)
  @JoinColumn({ name: 'author_id' })
  profile: ProfileEntity;

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];
}
