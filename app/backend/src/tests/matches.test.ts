import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/teams.model';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import { IUserRepository } from '../interfaces/user.interface';
import { before } from 'mocha';
import UserRepository from '../model/repository/user.repositori';

chai.use(chaiHttp); // o chaiHttp usa o request

const { expect } = chai;

describe('GET /matches', () => {
  describe('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', () => {
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.equal(200)
    })
  })
});
