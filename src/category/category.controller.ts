import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { handleException } from 'src/exception/handle.exception';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
//Decorador para agrupar endpoints en swagger
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'Category has been created successfully',
        newCategory,
      });
    } catch (error) {
      handleException(error, 'category', response);
    }
  }

  @Get()
  async findAll(@Req() request?: Request, @Res() response?: Response) {
    try {
      const data = await this.categoryService.findAll(request);
      return response.status(HttpStatus.OK).json({
        message: 'All Categories data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoryService.findOne(term);
  }

  @Put(':term')
  async update(
    @Res() response,
    @Param('term') term: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const existingCategory = await this.categoryService.update(
        term,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    const deletedCategory = await this.categoryService.remove(id);
    return response.status(HttpStatus.OK).json({
      message: 'Category deleted successfully',
      deletedCategory,
    });
  }
}
