import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne,
  JoinColumn
} from 'typeorm'

import Orphanage from './orphanges'


@Entity('images')//Associa a classe modelo à tabela de orfanatos
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({name: 'orphanage_id'})
  orphanage: Orphanage;
}