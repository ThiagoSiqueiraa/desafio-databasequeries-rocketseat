import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("game")
      .where("LOWER(game.title) like :title", {title: `%${param.toLowerCase().trim()}%`})
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // const gameWithUsers:any = await this.repository
    // .createQueryBuilder("game")
    // .innerJoinAndSelect("game.users", "user").where("game.id = :id", {id}).getOne()

    // return gameWithUsers.users

    return this.repository.createQueryBuilder().relation(Game, "users").of(id).loadMany()


  }
}
