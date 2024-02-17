import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SurveyService } from './survey.service';
import { Survey, SurveyCreate, SurveyUpdate } from './survey.entity';

@ApiTags('survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiResponse({
    status: 201,
    description: 'Create a survey',
    type: Survey,
  })
  @HttpCode(HttpStatus.OK)
  @Post(':departmentId')
  async create(
    @Param('departmentId', ParseUUIDPipe) departmentId: string,
    @Body() survey: SurveyCreate,
  ): Promise<Survey> {
    const newSurvey = await this.surveyService.create(departmentId, survey);
    return newSurvey;
  }

  @ApiResponse({
    status: 200,
    description: 'Get survey by id',
    type: Survey,
  })
  @Get(':surveyId')
  async getSurvey(
    @Param('surveyId', ParseUUIDPipe) surveyId: string,
  ): Promise<Survey> {
    const survey = await this.surveyService.getById(surveyId);
    return survey;
  }

  @ApiResponse({
    status: 200,
    description: 'Get survey departments',
    type: Survey,
    isArray: true,
  })
  @Get('department/:departmentId')
  async getDepartmentSurveys(
    @Param('departmentId', ParseUUIDPipe) departmentId: string,
  ): Promise<Survey[]> {
    const surveys = await this.surveyService.getByDepartmentId(departmentId);
    return surveys;
  }

  @ApiResponse({
    status: 200,
    description: 'Update survey',
    type: Survey,
  })
  @Put(':surveyId')
  async updateSurvey(
    @Param('surveyId', ParseUUIDPipe) surveyId: string,
    @Body() surveyUpdate: SurveyUpdate,
  ): Promise<Survey> {

    console.log(surveyUpdate)
    const updatedSurvey = await this.surveyService.update(
      surveyId,
      surveyUpdate,
    );

    return updatedSurvey;
  }

  @ApiResponse({
    status: 204,
    description: 'Delete survey',
  })
  @Post(':surveyId')
  async deleteSurvey(
    @Param('surveyId', ParseUUIDPipe) surveyId: string,
  ): Promise<void> {
    await this.surveyService.delete(surveyId);
  }
}
