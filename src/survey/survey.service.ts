import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey, SurveyCreate, SurveyUpdate } from './survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) { }

  async create(
    departmentId: string,
    surveyCreate: SurveyCreate,
  ): Promise<Survey> {
    const newSurvey = this.surveyRepository.create({
      ...surveyCreate,
      departmentId,
    });
    return await this.surveyRepository.save(newSurvey);
  }

  async getById(surveyId: string): Promise<Survey> {
    const survey = await this.surveyRepository.findOneBy({ id: surveyId });

    if (!survey) {
      throw new NotFoundException(`Survey with id ${surveyId} not found`);
    }

    return survey;
  }

  async getByDepartmentId(departmentId: string): Promise<Survey[]> {
    return await this.surveyRepository.find({ where: { departmentId } });
  }

  async update(
    surveyId: string,
    surveyUpdate: SurveyUpdate,
  ): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
    });

    if (!survey) {
      throw new NotFoundException(
        `Survey with id ${surveyId} not found`,
      );
    }

    
    Object.assign(survey, surveyUpdate);
    return await this.surveyRepository.save(survey);
  }

  async delete(surveyId: string): Promise<void> {
    const survey = await this.surveyRepository.findOneBy({ id: surveyId });

    if (!survey) {
      throw new NotFoundException(`Survey with id ${surveyId} not found`);
    }

    await this.surveyRepository.delete(survey);
  }
}
